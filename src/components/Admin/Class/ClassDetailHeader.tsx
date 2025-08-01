"use client";
import { Button, Chip } from "@heroui/react";
import { ArrowLeft, Edit, Trash2, Users } from "lucide-react";
import { useState } from "react";
import EditClassModal from "./EditClassModal";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface ClassDetailData {
    id: number;
    grade: string;
    name: string;
    advisors: Teacher[];
    students: any[];
    studentCount: number;
}

interface ClassDetailHeaderProps {
    classData: ClassDetailData;
    onBack: () => void;
    onUpdate: () => void;
}

export default function ClassDetailHeader({ classData, onBack, onUpdate }: ClassDetailHeaderProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    const getGradeColor = (grade: string) => {
        const gradeNum = parseInt(grade);
        if (gradeNum <= 3) return "primary";
        if (gradeNum <= 6) return "success";
        return "warning";
    };

    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        onUpdate();
    };

    const confirmAndDeleteClass = async () => {
        const result = await Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "คุณต้องการลบห้องเรียนนี้ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก'
        });

        if (result.isConfirmed) {
            deleteClassById(); // เรียกฟังก์ชันลบ
        }
    };

    const deleteClassById = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`/api/admin/classes/${classData.id}`);
            const res_data = response.data;

            if (res_data.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    text: res_data.message || 'ลบห้องเรียนเรียบร้อยแล้ว',
                });
                router.push("/admin/class");
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'ข้อผิดพลาด',
                    text: res_data.message || 'ไม่สามารถลบห้องเรียนได้',
                });
                router.push("/admin/class");
            }
        } catch (error: any) {
            let message = 'เกิดข้อผิดพลาดในการลบห้องเรียน';
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || error.message;
            }

            await Swal.fire({
                icon: 'error',
                title: 'ข้อผิดพลาด',
                text: message,
            });
            router.push("/admin/class");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="light"
                            startContent={<ArrowLeft className="w-4 h-4" />}
                            onPress={onBack}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            กลับ
                        </Button>

                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl shadow-lg">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Chip
                                        color={getGradeColor(classData.grade)}
                                        variant="solid"
                                        size="md"
                                        className="font-semibold"
                                    >
                                        ม.{classData.grade}
                                    </Chip>
                                    <h1 className="text-3xl font-bold text-gray-800">ห้อง {classData.name}</h1>
                                </div>
                                <p className="text-gray-600">
                                    {classData.studentCount} นักเรียน • {classData.advisors.length} ครูที่ปรึกษา
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            color="primary"
                            variant="bordered"
                            startContent={<Edit className="w-4 h-4" />}
                            onPress={() => setIsEditModalOpen(true)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                            แก้ไขห้องเรียน
                        </Button>

                        <Button
                            color="danger"
                            variant="bordered"
                            isLoading={isDeleting}
                            onPress={confirmAndDeleteClass}
                            startContent={<Trash2 className="w-4 h-4" />}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                            ลบห้องเรียน
                        </Button>
                    </div>
                </div>
            </div>

            <EditClassModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditSuccess}
                classData={classData}
            />
        </>
    );
}