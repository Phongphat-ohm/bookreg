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
    Checkbox,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Edit, User, Key, Shield, UserCheck } from "lucide-react";
import axios from "axios";

interface Teacher {
    id: number;
    name: string;
    username: string;
    role: string;
}

interface EditTeacherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    teacher: Teacher;
}

export default function EditTeacherModal({ 
    isOpen, 
    onClose, 
    onSuccess, 
    teacher 
}: EditTeacherModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "teacher"
    });
    const [changePassword, setChangePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ตั้งค่าข้อมูลเริ่มต้น
    useEffect(() => {
        if (teacher) {
            setFormData({
                name: teacher.name,
                username: teacher.username,
                password: "",
                confirmPassword: "",
                role: teacher.role
            });
            setChangePassword(false);
        }
    }, [teacher]);

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

        // ตรวจสอบรหัสผ่านถ้าต้องการเปลี่ยน
        if (changePassword) {
            if (!formData.password.trim()) {
                addToast({
                    color: "danger",
                    title: "ข้อมูลไม่ครบ",
                    description: "กรุณากรอกรหัสผ่านใหม่"
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
        }

        try {
            setIsLoading(true);
            
            const updateData: any = {
                name: formData.name.trim(),
                username: formData.username.trim(),
                role: formData.role
            };

            // เพิ่มรหัสผ่านถ้าต้องการเปลี่ยน
            if (changePassword && formData.password.trim()) {
                updateData.password = formData.password.trim();
            }

            const response = await axios.put(`/api/admin/teachers/${teacher.id}`, updateData);

            if (response.data.status === 200) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "แก้ไขบุคลากรสำเร็จ"
                });
                
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถแก้ไขบุคลากรได้"
                });
            }
        } catch (error: any) {
            console.error("Error updating teacher:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขบุคลากร"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setChangePassword(false);
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
                        <h2 className="text-xl font-bold text-gray-800">แก้ไขบุคลากร</h2>
                        <p className="text-sm text-gray-600">แก้ไขข้อมูล: {teacher.name}</p>
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

                        <div className="border-t pt-4">
                            <Checkbox
                                isSelected={changePassword}
                                onValueChange={setChangePassword}
                                className="mb-4"
                            >
                                เปลี่ยนรหัสผ่าน
                            </Checkbox>

                            {changePassword && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="รหัสผ่านใหม่"
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
                                        label="ยืนยันรหัสผ่านใหม่"
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
                            )}
                        </div>

                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                            <h4 className="font-medium text-amber-800 mb-2">คำเตือน</h4>
                            <div className="text-sm text-amber-700 space-y-1">
                                <p>• การเปลี่ยน Username อาจส่งผลต่อการเข้าสู่ระบบ</p>
                                <p>• การเปลี่ยนตำแหน่งจะส่งผลต่อสิทธิ์การเข้าถึง</p>
                                <p>• หากเปลี่ยนรหัสผ่าน ผู้ใช้จะต้องใช้รหัสผ่านใหม่</p>
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