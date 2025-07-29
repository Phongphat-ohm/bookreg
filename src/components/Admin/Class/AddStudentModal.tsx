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
import { useState } from "react";
import { Plus, User, Hash, Lock } from "lucide-react";
import axios from "axios";

interface AddStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    classId: number;
}

export default function AddStudentModal({ isOpen, onClose, onSuccess, classId }: AddStudentModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        stu_code: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.stu_code.trim() || !formData.password.trim()) {
            addToast({
                color: "warning",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอกข้อมูลให้ครบทุกช่อง"
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`/api/admin/classes/${classId}/students`, {
                name: formData.name.trim(),
                stu_code: formData.stu_code.trim(),
                password: formData.password.trim()
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "เพิ่มนักเรียนสำเร็จ"
                });
                handleClose();
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเพิ่มนักเรียนได้"
                });
            }
        } catch (error: any) {
            console.error("Error creating student:", error);
            const errorMessage = error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มนักเรียน";
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
        setFormData({
            name: "",
            stu_code: "",
            password: ""
        });
        onClose();
    };

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
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">เพิ่มนักเรียนใหม่</h2>
                        <p className="text-sm text-gray-600">เพิ่มนักเรียนเข้าสู่ห้องเรียนนี้</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-4">
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
                            label="รหัสผ่าน"
                            placeholder="กรอกรหัสผ่านสำหรับเข้าสู่ระบบ"
                            type="password"
                            value={formData.password}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                            isRequired
                            startContent={<Lock className="w-4 h-4 text-gray-400" />}
                            description="รหัสผ่านที่นักเรียนจะใช้เข้าสู่ระบบ"
                        />

                        {/* Preview */}
                        {formData.name && formData.stu_code && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm text-green-600 mb-1">ตัวอย่างข้อมูลนักเรียน:</p>
                                <p className="font-medium text-green-800">{formData.name}</p>
                                <p className="text-sm text-green-600">รหัส: {formData.stu_code}</p>
                            </div>
                        )}
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
                        startContent={!isLoading && <Plus className="w-4 h-4" />}
                        className="bg-gradient-to-r from-green-500 to-green-600"
                    >
                        {isLoading ? "กำลังเพิ่ม..." : "เพิ่มนักเรียน"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}