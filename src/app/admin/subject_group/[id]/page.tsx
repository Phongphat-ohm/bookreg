"use client";
import AdminLayout from "@/components/Admin/Layout";
import { Spinner, addToast, Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { SubjectGroupDetail } from "@/components/Admin/SubjectGroup";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface TeachingAssignment {
    id: number;
    teacher: {
        id: number;
        name: string;
        username: string;
    };
    class: {
        id: number;
        grade: string;
        name: string;
    };
}

interface Subject {
    id: number;
    name: string;
    code: string;
    grade: string;
    description?: string;
    teachingAssignments: TeachingAssignment[];
}

interface SubjectGroupMember {
    id: number;
    role: string;
    joined_at: string;
    teacher: Teacher;
}

interface SubjectGroupData {
    id: number;
    name: string;
    members: SubjectGroupMember[];
    subjects: Subject[];
}

export default function SubjectGroupDetailPage() {
    const params = useParams();
    const router = useRouter();
    const groupId = parseInt(params.id as string);

    const [subjectGroupData, setSubjectGroupData] = useState<SubjectGroupData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSubjectGroupDetail = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/admin/subject-groups/${groupId}`);

            if (response.data.status === 200) {
                setSubjectGroupData(response.data.data);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถดึงข้อมูลกลุ่มสาระได้"
                });
                router.push("/admin/subject_group");
            }
        } catch (error) {
            console.error("Error fetching subject group detail:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เกิดข้อผิดพลาดในการดึงข้อมูลกลุ่มสาระ"
            });
            router.push("/admin/subject_group");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = () => {
        fetchSubjectGroupDetail();
    };

    const handleBack = () => {
        router.push("/admin/subject_group");
    };

    useEffect(() => {
        if (isNaN(groupId)) {
            router.push("/admin/subject_group");
            return;
        }
        fetchSubjectGroupDetail();
    }, [groupId]);

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

    if (!subjectGroupData) {
        return (
            <AdminLayout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <p className="text-gray-600">ไม่พบข้อมูลกลุ่มสาระ</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -m-6 p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Button
                            variant="bordered"
                            startContent={<ArrowLeft className="w-4 h-4" />}
                            onPress={handleBack}
                            className="border-gray-300"
                        >
                            กลับ
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{subjectGroupData.name}</h1>
                            <p className="text-gray-600">
                                {(() => {
                                    const header = subjectGroupData.members.find(member => member.role === 'head');
                                    return `หัวหน้ากลุ่มสาระ: ${header ? header.teacher.name : 'ไม่มีหัวหน้า'} • จำนวนวิชา: ${subjectGroupData.subjects.length} วิชา • สมาชิก: ${subjectGroupData.members.length} คน`;
                                })()}
                            </p>
                        </div>
                    </div>
                </div>

                <SubjectGroupDetail
                    subjectGroupData={subjectGroupData}
                    onUpdate={handleUpdate}
                />
            </div>
        </AdminLayout>
    );
}