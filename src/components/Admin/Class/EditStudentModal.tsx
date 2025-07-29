"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Edit, User, Hash, Lock } from "lucide-react";
import axios from "axios";

interface Student {
    id: number;
    name: string;
    stu_code: string;
    create_at: string;
}

interface EditStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    student: Student;
}

export default function EditStudentModal({ isOpen, onClose, onSuccess, student }: EditStudentModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        stu_code: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.stu_code.trim()) {
            addToast({
                color: "warning",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอกชื่อและรหัสนักเรียน"
            });
            return;
        }

        try {
            setIsLoading(true);
            const updateData: any = {
                name: formData.name.trim(),
                stu_code: formData.stu_code.trim()
            };

            // Only include password if it's provided
            if (formData.password.trim()) {
                updateData.password = formData.password.trim();
            }

            const response = await axios.put(`/api/admin/students/${student.id}`, updateData);

            if (response.data.status === 200) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "อัปเดตข้อมูลนักเรียนสำเร็จ"
                });
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถอัปเดตข้อมูลนักเรียนได้"
                });
            }
        } catch (error: any) {
            console.error("Error updating student:", error);
            const errorMessage = error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตนักเรียน";
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        // Reset form data to original values
        setFormData({
            name: student.name,
            stu_code: student.stu_code,
            password: ""
        });
        onClose();
    };

    // Initialize form data when modal opens or student changes
    useEffect(() => {
        if (isOpen && student) {
            setFormData({
                name: student.name,
                stu_code: student.stu_code,
                password: ""
            });
        }
    }, [isOpen, student]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="lg"
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
                        <h2 className="text-xl font-bold text-gray-800">แก้ไขข้อมูลนักเรียน</h2>
                        <p className="text-sm text-gray-600">แก้ไขข้อมูลของ {student.name}</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-4">
                        {/* Current Info */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">ข้อมูลปัจจุบัน:</p>
                            <p className="font-medium text-gray-800">{student.name}</p>
                            <p className="text-sm text-gray-600">รหัส: {student.stu_code}</p>
                        </div>

                        <Input
                            label="ชื่อ-นามสกุล"
                            placeholder="กรอกชื่อและนามสกุลนักเรียน"
                            value={formData.name}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                            isRequired
                            startContent={<User className="w-4 h-4 text-gray-400" />}
                        />

                        <Input
                            label="รหัสนักเรียน"
                            placeholder="กรอกรหัสนักเรียน"
                            value={formData.stu_code}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, stu_code: value }))}
                            isRequired
                            startContent={<Hash className="w-4 h-4 text-gray-400" />}
                            description="รหัสนักเรียนต้องไม่ซ้ำกับที่มีอยู่ในระบบ"
                        />

                        <Input
                            label="รหัสผ่านใหม่ (ไม่บังคับ)"
                            placeholder="กรอกรหัสผ่านใหม่หากต้องการเปลี่ยน"
                            type="password"
                            value={formData.password}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                            startContent={<Lock className="w-4 h-4 text-gray-400" />}
                            description="เว้นว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน"
                        />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={handleClose}
                        isDisabled={isLoading}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        startContent={!isLoading && <Edit className="w-4 h-4" />}
                        className="bg-gradient-to-r from-orange-500 to-orange-600"
                    >
                        {isLoading ? "กำลังอัปเดต..." : "อัปเดตข้อมูล"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}