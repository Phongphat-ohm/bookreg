"use client";
import AdminLayout from "@/components/Admin/Layout";
import { Spinner, addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ClassHeader from "@/components/Admin/Class/ClassHeader";
import ClassStats from "@/components/Admin/Class/ClassStats";
import ClassGrid from "@/components/Admin/Class/ClassGrid";
import ClassSearchBar from "@/components/Admin/Class/ClassSearchBar";
import AddClassModal from "@/components/Admin/Class/AddClassModal";
import { useClassSearch } from "@/hooks/useClassSearch";
import { useRouter } from "next/navigation";

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

export default function ClassPage() {
    const router = useRouter();
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({
        searchTerm: "",
        gradeFilter: "",
        sortBy: "grade",
        hasAdvisor: "",
        studentCountRange: ""
    });

    const { filteredClasses, isFiltered, searchStats } = useClassSearch(classes, searchFilters);

    const fetchClasses = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/api/admin/classes");
            
            if (response.data.status === 200) {
                setClasses(response.data.data);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถดึงข้อมูลห้องเรียนได้"
                });
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เกิดข้อผิดพลาดในการดึงข้อมูลห้องเรียน"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (filters: SearchFilters) => {
        setSearchFilters(filters);
    };

    const handleClearFilters = () => {
        setSearchFilters({
            searchTerm: "",
            gradeFilter: "",
            sortBy: "grade",
            hasAdvisor: "",
            studentCountRange: ""
        });
    };

    const handleAddClass = () => {
        setIsAddModalOpen(true);
    };

    const handleAddSuccess = () => {
        fetchClasses(); // Refresh the class list
        setIsAddModalOpen(false);
    };

    const handleClassClick = (classId: number) => {
        router.push(`/admin/class/${classId}`);
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <Spinner variant="wave" size="lg" />
                    <label className="font-bold mt-4 text-gray-600">กำลังโหลดข้อมูลห้องเรียน...</label>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -m-6 p-6">
                <ClassHeader 
                    onRefresh={fetchClasses} 
                    onAddClass={handleAddClass}
                    isLoading={isLoading} 
                />
                
                <ClassSearchBar
                    onSearch={handleSearch}
                    totalResults={searchStats.filteredCount}
                    isFiltered={isFiltered}
                    onClearFilters={handleClearFilters}
                />
                
                <ClassStats classes={filteredClasses} isFiltered={isFiltered} />
                
                <ClassGrid 
                    classes={filteredClasses} 
                    isFiltered={isFiltered}
                    searchTerm={searchFilters.searchTerm}
                    onClassClick={handleClassClick}
                />

                <AddClassModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={handleAddSuccess}
                />
            </div>
        </AdminLayout>
    );
}