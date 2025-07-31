"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Edit, BookOpen } from "lucide-react";
import axios from "axios";



interface SubjectGroupMember {
    id: number;
    role: string;
    joined_at: string;
    teacher: {
        id: number;
        name: string;
        username: string;
    };
}

interface SubjectGroup {
    id: number;
    name: string;
    members: SubjectGroupMember[];
}

interface EditSubjectGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    subjectGroup: SubjectGroup;
}

export default function EditSubjectGroupModal({
    isOpen,
    onClose,
    onSuccess,
    subjectGroup
}: EditSubjectGroupModalProps) {
    const [formData, setFormData] = useState({
        name: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    // ตั้งค่าข้อมูลเริ่มต้น
    useEffect(() => {
        if (subjectGroup) {
            setFormData({
                name: subjectGroup.name
            });
        }
    }, [subjectGroup]);

    // ไม่ต้องดึงรายการครูแล้ว เพราะแก้ไขเฉพาะชื่อกลุ่มสาระ

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        // ตรวจสอบข้อมูล
        if (!formData.name.trim()) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอกชื่อกลุ่มสาระ"
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.put(`/api/admin/subject-groups/${subjectGroup.id}`, {
                name: formData.name.trim()
            });

            if (response.data.status === 200) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "แก้ไขกลุ่มสาระสำเร็จ"
                });

                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถแก้ไขกลุ่มสาระได้"
                });
            }
        } catch (error: any) {
            console.error("Error updating subject group:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขกลุ่มสาระ"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
            isDismissable={!isLoading}
            classNames={{
                base: "bg-white",
                header: "border-b border-gray-200",
                footer: "border-t border-gray-200"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                        <Edit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">แก้ไขกลุ่มสาระการเรียนรู้</h2>
                        <p className="text-sm text-gray-600">แก้ไขข้อมูลกลุ่มสาระ: {subjectGroup.name}</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-4">
                        <Input
                            label="ชื่อกลุ่มสาระการเรียนรู้"
                            placeholder="เช่น กลุ่มสาระการเรียนรู้ภาษาไทย"
                            value={formData.name}
                            onValueChange={(value) => handleInputChange('name', value)}
                            startContent={<BookOpen className="w-4 h-4 text-gray-400" />}
                            isRequired
                            classNames={{
                                input: "text-sm",
                                inputWrapper: "border-gray-300"
                            }}
                        />

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-2">ข้อมูลเพิ่มเติม</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                                <p>• การแก้ไขนี้จะเปลี่ยนเฉพาะชื่อกลุ่มสาระเท่านั้น</p>
                                <p>• หากต้องการเปลี่ยนหัวหน้าหรือสมาชิก ให้ใช้ฟังก์ชัน "เปลี่ยนหัวหน้า" หรือ "จัดการกลุ่มสาระ"</p>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="flex justify-between">
                    <Button
                        variant="bordered"
                        onPress={handleClose}
                        disabled={isLoading}
                    >
                        ยกเลิก
                    </Button>

                    <Button
                        color="primary"
                        startContent={!isLoading && <Edit className="w-4 h-4" />}
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-orange-500 to-orange-600"
                    >
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}