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
import { useState } from "react";
import { Plus, User, Key, Shield, UserCheck } from "lucide-react";
import axios from "axios";

interface AddTeacherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddTeacherModal({ isOpen, onClose, onSuccess }: AddTeacherModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "teacher"
    });
    const [isLoading, setIsLoading] = useState(false);

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
                description: "กรุณากรอกชื่อ-นามสกุล"
            });
            return;
        }

        if (!formData.username.trim()) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอก Username"
            });
            return;
        }

        if (!formData.password.trim()) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอกรหัสผ่าน"
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            addToast({
                color: "danger",
                title: "รหัสผ่านไม่ตรงกัน",
                description: "กรุณาตรวจสอบรหัสผ่านให้ตรงกัน"
            });
            return;
        }

        if (formData.password.length < 6) {
            addToast({
                color: "danger",
                title: "รหัสผ่านสั้นเกินไป",
                description: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('/api/admin/teachers', {
                name: formData.name.trim(),
                username: formData.username.trim(),
                password: formData.password.trim(),
                role: formData.role
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "เพิ่มบุคลากรสำเร็จ"
                });
                
                // รีเซ็ตฟอร์ม
                setFormData({
                    name: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    role: "teacher"
                });
                
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเพิ่มบุคลากรได้"
                });
            }
        } catch (error: any) {
            console.error("Error adding teacher:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มบุคลากร"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setFormData({
                name: "",
                username: "",
                password: "",
                confirmPassword: "",
                role: "teacher"
            });
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
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-2 rounded-lg">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">เพิ่มบุคลากรใหม่</h2>
                        <p className="text-sm text-gray-600">สร้างบัญชีบุคลากรใหม่</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-4">
                        <Input
                            label="ชื่อ-นามสกุล"
                            placeholder="เช่น นายสมชาย ใจดี"
                            value={formData.name}
                            onValueChange={(value) => handleInputChange('name', value)}
                            startContent={<User className="w-4 h-4 text-gray-400" />}
                            isRequired
                            classNames={{
                                input: "text-sm",
                                inputWrapper: "border-gray-300"
                            }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Username"
                                placeholder="เช่น teacher01"
                                value={formData.username}
                                onValueChange={(value) => handleInputChange('username', value)}
                                startContent={<UserCheck className="w-4 h-4 text-gray-400" />}
                                isRequired
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "border-gray-300"
                                }}
                            />

                            <Select
                                label="ตำแหน่ง"
                                placeholder="เลือกตำแหน่ง"
                                selectedKeys={formData.role ? [formData.role] : []}
                                onSelectionChange={(keys) => {
                                    const selectedKey = Array.from(keys)[0] as string;
                                    handleInputChange('role', selectedKey || 'teacher');
                                }}
                                startContent={<Shield className="w-4 h-4 text-gray-400" />}
                                isRequired
                                classNames={{
                                    trigger: "border-gray-300"
                                }}
                            >
                                <SelectItem key="teacher" textValue="ครู">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-blue-500" />
                                        <span>ครู</span>
                                    </div>
                                </SelectItem>
                                <SelectItem key="admin" textValue="ผู้ดูแลระบบ">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-red-500" />
                                        <span>ผู้ดูแลระบบ</span>
                                    </div>
                                </SelectItem>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="รหัสผ่าน"
                                placeholder="อย่างน้อย 6 ตัวอักษร"
                                type="password"
                                value={formData.password}
                                onValueChange={(value) => handleInputChange('password', value)}
                                startContent={<Key className="w-4 h-4 text-gray-400" />}
                                isRequired
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "border-gray-300"
                                }}
                            />

                            <Input
                                label="ยืนยันรหัสผ่าน"
                                placeholder="กรอกรหัสผ่านอีกครั้ง"
                                type="password"
                                value={formData.confirmPassword}
                                onValueChange={(value) => handleInputChange('confirmPassword', value)}
                                startContent={<Key className="w-4 h-4 text-gray-400" />}
                                isRequired
                                color={formData.confirmPassword && formData.password !== formData.confirmPassword ? "danger" : "default"}
                                errorMessage={formData.confirmPassword && formData.password !== formData.confirmPassword ? "รหัสผ่านไม่ตรงกัน" : ""}
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "border-gray-300"
                                }}
                            />
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-2">ข้อมูลเพิ่มเติม</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                                <p>• <strong>ครู:</strong> สามารถเข้าใช้งานระบบครูได้</p>
                                <p>• <strong>ผู้ดูแลระบบ:</strong> สามารถเข้าใช้งานระบบ Admin ได้</p>
                                <p>• <strong>กลุ่มสาระ:</strong> ไม่จำเป็นต้องระบุตอนสร้าง สามารถเพิ่มทีหลังได้</p>
                                <p>• Username ต้องไม่ซ้ำกับที่มีอยู่แล้ว</p>
                                <p>• รหัสผ่านควรมีความปลอดภัยสูง</p>
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
                        startContent={!isLoading && <Plus className="w-4 h-4" />}
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600"
                    >
                        {isLoading ? 'กำลังเพิ่ม...' : 'เพิ่มบุคลากร'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}