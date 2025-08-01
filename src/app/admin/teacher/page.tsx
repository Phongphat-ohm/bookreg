"use client";
import AdminLayout from "@/components/Admin/Layout";
import { Spinner, addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { TeacherList } from "@/components/Admin/Teacher";

interface SubjectGroupMembership {
    id: number;
    role: string;
    joined_at: string;
    subject_group: {
        id: number;
        name: string;
    };
}

interface AdvisingClass {
    id: number;
    grade: string;
    name: string;
}

interface TeachingAssignment {
    id: number;
    subject: {
        id: number;
        name: string;
        code: string;
    };
}

interface Teacher {
    id: number;
    name: string;
    username: string;
    role: string;
    create_at: string;
    update_at: string;
    subjectMembership?: SubjectGroupMembership;
    advisingClasses?: AdvisingClass[];
    teachingAssignments?: TeachingAssignment[];
}

export default function TeacherPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTeachers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/admin/teachers?includeStats=true');

            if (response.data.status === 200) {
                setTeachers(response.data.data);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถดึงข้อมูลบุคลากรได้"
                });
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เกิดข้อผิดพลาดในการดึงข้อมูลบุคลากร"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = () => {
        fetchTeachers();
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <Spinner variant="wave" size="lg" />
                    <label className="font-bold mt-4 text-gray-600">กำลังโหลดข้อมูลบุคลากร...</label>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -m-6 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">จัดการบุคลากร</h1>
                    <p className="text-gray-600">จัดการข้อมูลครูและผู้ดูแลระบบ</p>
                </div>

                <TeacherList
                    teachers={teachers}
                    onUpdate={handleUpdate}
                />
            </div>
        </AdminLayout>
    );
}