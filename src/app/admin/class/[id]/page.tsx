"use client";
import AdminLayout from "@/components/Admin/Layout";
import { Spinner, addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ClassDetailHeader from "@/components/Admin/Class/ClassDetailHeader";
import ClassDetailInfo from "@/components/Admin/Class/ClassDetailInfo";
import StudentList from "@/components/Admin/Class/StudentList";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface Student {
    id: number;
    name: string;
    stu_code: string;
    create_at: string;
}

interface ClassDetailData {
    id: number;
    grade: string;
    name: string;
    advisors: Teacher[];
    students: Student[];
    studentCount: number;
}

export default function ClassDetailPage() {
    const params = useParams();
    const router = useRouter();
    const classId = parseInt(params.id as string);

    const [classData, setClassData] = useState<ClassDetailData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchClassDetail = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/admin/classes/${classId}`);

            if (response.data.status === 200) {
                setClassData(response.data.data);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถดึงข้อมูลห้องเรียนได้"
                });
                router.push("/admin/class");
            }
        } catch (error) {
            console.error("Error fetching class detail:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เกิดข้อผิดพลาดในการดึงข้อมูลห้องเรียน"
            });
            router.push("/admin/class");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClassUpdate = () => {
        fetchClassDetail(); // Refresh data after update
    };

    const handleStudentUpdate = () => {
        fetchClassDetail(); // Refresh data after student changes
    };

    const handleBack = () => {
        router.push("/admin/class");
    };

    useEffect(() => {
        if (isNaN(classId)) {
            router.push("/admin/class");
            return;
        }
        fetchClassDetail();
    }, [classId]);

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

    if (!classData) {
        return (
            <AdminLayout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <p className="text-gray-600">ไม่พบข้อมูลห้องเรียน</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -m-6 p-6">
                <ClassDetailHeader
                    classData={classData}
                    onBack={handleBack}
                    onUpdate={handleClassUpdate}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <ClassDetailInfo
                            classData={classData}
                            onUpdate={handleClassUpdate}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <StudentList
                            classId={classData.id}
                            students={classData.students}
                            onUpdate={handleStudentUpdate}
                            className={`${classData.grade}/${classData.name}`}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}