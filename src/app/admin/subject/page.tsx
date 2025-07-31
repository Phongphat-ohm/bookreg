"use client";
import AdminLayout from "@/components/Admin/Layout";
import { Spinner, addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SubjectList } from "@/components/Admin/Subject";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface SubjectGroup {
    id: number;
    name: string;
    Teacher: Teacher;
}

interface Subject {
    id: number;
    code: string;
    name: string;
    grade: string;
    description?: string;
    SubjectGroup: SubjectGroup;
}

export default function SubjectPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSubjects = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/admin/subjects');

            if (response.data.status === 200) {
                setSubjects(response.data.data);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถดึงข้อมูลวิชาได้"
                });
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เกิดข้อผิดพลาดในการดึงข้อมูลวิชา"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = () => {
        fetchSubjects();
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <Spinner variant="wave" size="lg" />
                    <label className="font-bold mt-4 text-gray-600">กำลังโหลดข้อมูลวิชา...</label>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -m-6 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">จัดการวิชา</h1>
                    <p className="text-gray-600">จัดการวิชาทั้งหมดในระบบ</p>
                </div>

                <SubjectList 
                    subjects={subjects}
                    onUpdate={handleUpdate}
                />
            </div>
        </AdminLayout>
    );
}