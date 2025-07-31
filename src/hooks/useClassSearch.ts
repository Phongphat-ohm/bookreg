import { useMemo } from "react";

interface Teacher {
    id: number;
    name: string;
}

interface ClassData {
    id: number;
    grade: string;
    name: string;
    advisors: Teacher[];
    studentCount: number;
}

interface SearchFilters {
    searchTerm: string;
    gradeFilter: string;
    sortBy: string;
    hasAdvisor: string;
    studentCountRange: string;
}

export function useClassSearch(classes: ClassData[] = [], filters: SearchFilters = {} as SearchFilters) {
    const filteredAndSortedClasses = useMemo(() => {
        if (!classes || !Array.isArray(classes)) {
            return [];
        }
        
        let result = [...classes];

        // Search by term (class name or grade)
        if (filters?.searchTerm?.trim()) {
            const searchTerm = filters.searchTerm.toLowerCase().trim();
            result = result.filter(classItem => {
                if (!classItem) return false;
                
                const className = (classItem.name || '').toLowerCase();
                const gradeText = `ม.${classItem.grade || ''}`;
                const fullName = `${gradeText} ${className}`.toLowerCase();
                const advisorNames = (classItem.advisors || [])
                    .map(advisor => (advisor?.name || '').toLowerCase())
                    .join(' ');
                
                return (
                    className.includes(searchTerm) ||
                    gradeText.toLowerCase().includes(searchTerm) ||
                    fullName.includes(searchTerm) ||
                    advisorNames.includes(searchTerm) ||
                    (classItem.grade || '').includes(searchTerm)
                );
            });
        }

        // Filter by grade
        if (filters?.gradeFilter) {
            result = result.filter(classItem => classItem?.grade === filters.gradeFilter);
        }

        // Filter by advisor status
        if (filters?.hasAdvisor) {
            if (filters.hasAdvisor === "has") {
                result = result.filter(classItem => (classItem?.advisors || []).length > 0);
            } else if (filters.hasAdvisor === "none") {
                result = result.filter(classItem => (classItem?.advisors || []).length === 0);
            }
        }

        // Filter by student count range
        if (filters?.studentCountRange) {
            result = result.filter(classItem => {
                const count = classItem?.studentCount || 0;
                switch (filters.studentCountRange) {
                    case "0-20":
                        return count >= 0 && count <= 20;
                    case "21-30":
                        return count >= 21 && count <= 30;
                    case "31-40":
                        return count >= 31 && count <= 40;
                    case "40+":
                        return count > 40;
                    default:
                        return true;
                }
            });
        }

        // Sort results
        result.sort((a, b) => {
            if (!a || !b) return 0;
            
            switch (filters?.sortBy) {
                case "name":
                    return (a.name || '').localeCompare(b.name || '', 'th');
                case "studentCount":
                    return (b.studentCount || 0) - (a.studentCount || 0); // Descending
                case "advisorCount":
                    return (b.advisors || []).length - (a.advisors || []).length; // Descending
                case "grade":
                default:
                    // Sort by grade first, then by name
                    const gradeCompare = parseInt(a.grade || '0') - parseInt(b.grade || '0');
                    if (gradeCompare !== 0) return gradeCompare;
                    return (a.name || '').localeCompare(b.name || '', 'th');
            }
        });

        return result;
    }, [classes, filters]);

    const isFiltered = useMemo(() => {
        if (!filters) return false;
        
        return (
            (filters.searchTerm || '').trim() !== "" ||
            (filters.gradeFilter || '') !== "" ||
            (filters.hasAdvisor || '') !== "" ||
            (filters.studentCountRange || '') !== "" ||
            (filters.sortBy || 'grade') !== "grade"
        );
    }, [filters]);

    const searchStats = useMemo(() => {
        const totalClasses = classes?.length || 0;
        const filteredCount = filteredAndSortedClasses?.length || 0;
        const totalStudents = filteredAndSortedClasses?.reduce((sum, cls) => sum + (cls?.studentCount || 0), 0) || 0;
        const totalAdvisors = new Set(
            filteredAndSortedClasses?.flatMap(cls => 
                (cls?.advisors || []).map(advisor => advisor?.id)
            ).filter(id => id !== undefined) || []
        ).size;

        return {
            totalClasses,
            filteredCount,
            totalStudents,
            totalAdvisors,
            isFiltered
        };
    }, [classes, filteredAndSortedClasses, isFiltered]);

    return {
        filteredClasses: filteredAndSortedClasses,
        isFiltered,
        searchStats
    };
}