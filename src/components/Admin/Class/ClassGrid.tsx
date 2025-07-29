"use client";
import { GraduationCap, Search } from "lucide-react";
import ClassCard from "./ClassCard";

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

interface ClassGridProps {
    classes: ClassData[];
    isFiltered?: boolean;
    searchTerm?: string;
    onClassClick?: (classId: number) => void;
}

export default function ClassGrid({ classes, isFiltered = false, searchTerm = "", onClassClick }: ClassGridProps) {
    if (classes.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    {isFiltered ? (
                        <Search className="w-12 h-12 text-gray-400" />
                    ) : (
                        <GraduationCap className="w-12 h-12 text-gray-400" />
                    )}
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {isFiltered ? "ไม่พบห้องเรียนที่ค้นหา" : "ไม่มีข้อมูลห้องเรียน"}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    {isFiltered ? (
                        <>
                            ไม่พบห้องเรียนที่ตรงกับเงื่อนไขการค้นหา
                            {searchTerm && (
                                <span className="block mt-1">
                                    คำค้นหา: "<span className="font-medium">{searchTerm}</span>"
                                </span>
                            )}
                        </>
                    ) : (
                        "ยังไม่มีห้องเรียนในระบบ กรุณาเพิ่มข้อมูลห้องเรียนเพื่อเริ่มต้นใช้งาน"
                    )}
                </p>
            </div>
        );
    }

    // Group classes by grade for better organization
    const groupedClasses = classes.reduce((acc, classItem) => {
        const grade = classItem.grade;
        if (!acc[grade]) {
            acc[grade] = [];
        }
        acc[grade].push(classItem);
        return acc;
    }, {} as Record<string, ClassData[]>);

    const sortedGrades = Object.keys(groupedClasses).sort((a, b) => parseInt(a) - parseInt(b));

    return (
        <div className="space-y-8">
            {sortedGrades.map((grade) => (
                <div key={grade} className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-sm">
                            <h2 className="text-lg font-bold">ระดับชั้นมัธยมศึกษาปีที่ {grade}</h2>
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded-full">
                            <span className="text-sm text-gray-600 font-medium">
                                {groupedClasses[grade].length} ห้อง
                            </span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {groupedClasses[grade].map((classItem) => (
                            <ClassCard
                                key={classItem.id}
                                id={classItem.id}
                                grade={classItem.grade}
                                name={classItem.name}
                                advisors={classItem.advisors}
                                studentCount={classItem.studentCount}
                                onClick={() => onClassClick?.(classItem.id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}