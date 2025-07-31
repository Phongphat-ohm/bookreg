"use client";
import AdminLayout from "@/components/Admin/Layout";
import { Spinner, addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SubjectGroupList } from "@/components/Admin/SubjectGroup";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    grade: string;
}

interface SubjectGroup {
    id: number;
    name: string;
    Teacher: Teacher;
    Subject: Subject[];
}

export default function SubjectGroupPage() {
    const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSubjectGroups = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/admin/subject-groups');

            if (response.data.status === 200) {
                setSubjectGroups(response.data.data);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถดึงข้อมูลกลุ่มสาระได้"
                });
            }
        } catch (error) {
            console.error("Error fetching subject groups:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เกิดข้อผิดพลาดในการดึงข้อมูลกลุ่มสาระ"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = () => {
        fetchSubjectGroups();
    };

    useEffect(() => {
        fetchSubjectGroups();
    }, []);

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <Spinner variant="wave" size="lg" />
                    <label className="font-bold mt-4 text-gray-600">กำลังโหลดข้อมูลกลุ่มสาระ...</label>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -m-6 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">จัดการกลุ่มสาระการเรียนรู้</h1>
                    <p className="text-gray-600">จัดการกลุ่มสาระการเรียนรู้และหัวหน้ากลุ่มสาระ</p>
                </div>

                <SubjectGroupList 
                    subjectGroups={subjectGroups}
                    onUpdate={handleUpdate}
                />
            </div>
        </AdminLayout>
    );
}