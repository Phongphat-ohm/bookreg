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
import { Plus, BookOpen, User } from "lucide-react";
import axios from "axios";

interface Teacher {
    id: number;
    name: string;
    username: string;
    role: string;
}

interface AddSubjectGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddSubjectGroupModal({ isOpen, onClose, onSuccess }: AddSubjectGroupModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        header_id: ""
    });
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

    // ดึงรายการครูที่ยังไม่เป็นหัวหน้ากลุ่มสาระ
    const fetchTeachers = async () => {
        try {
            setIsLoadingTeachers(true);
            const response = await axios.get('/api/admin/teachers?availableOnly=true');

            if (response.data.status === 200) {
                setTeachers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "ไม่สามารถดึงข้อมูลครูได้"
            });
        } finally {
            setIsLoadingTeachers(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchTeachers();
        }
    }, [isOpen]);

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

        if (!formData.header_id) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณาเลือกหัวหน้ากลุ่มสาระ"
            });
            return;
        }

        // ตรวจสอบว่ามีครูที่เลือกในรายการหรือไม่
        const selectedTeacher = teachers.find(t => t.id.toString() === formData.header_id);
        if (!selectedTeacher) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ถูกต้อง",
                description: "ครูที่เลือกไม่สามารถเป็นหัวหน้ากลุ่มสาระได้"
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('/api/admin/subject-groups', {
                name: formData.name.trim(),
                header_id: parseInt(formData.header_id)
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "เพิ่มกลุ่มสาระสำเร็จ"
                });

                // รีเซ็ตฟอร์ม
                setFormData({
                    name: "",
                    header_id: ""
                });

                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเพิ่มกลุ่มสาระได้"
                });
            }
        } catch (error: any) {
            console.error("Error adding subject group:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มกลุ่มสาระ"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setFormData({
                name: "",
                header_id: ""
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
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">เพิ่มกลุ่มสาระการเรียนรู้</h2>
                        <p className="text-sm text-gray-600">สร้างกลุ่มสาระการเรียนรู้ใหม่</p>
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

                        <Select
                            label="หัวหน้ากลุ่มสาระ"
                            placeholder={teachers.length > 0 ? "เลือกครูที่จะเป็นหัวหน้ากลุ่มสาระ" : "ไม่มีครูที่สามารถเป็นหัวหน้ากลุ่มสาระได้"}
                            selectedKeys={formData.header_id ? [formData.header_id] : []}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as string;
                                handleInputChange('header_id', selectedKey || '');
                            }}
                            startContent={<User className="w-4 h-4 text-gray-400" />}
                            isLoading={isLoadingTeachers}
                            isRequired
                            isDisabled={teachers.length === 0}
                            classNames={{
                                trigger: "border-gray-300"
                            }}
                        >
                            {teachers.map((teacher) => (
                                <SelectItem key={teacher.id.toString()} textValue={teacher.name}>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{teacher.name}</span>
                                        <span className="text-xs text-gray-500">@{teacher.username}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>

                        {!isLoadingTeachers && teachers.length === 0 && (
                            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                <p className="font-medium">ไม่มีครูที่สามารถเป็นหัวหน้ากลุ่มสาระได้</p>
                                <p className="text-xs mt-1">ครูทุกคนเป็นหัวหน้ากลุ่มสาระอื่นแล้ว</p>
                            </div>
                        )}
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
                        disabled={isLoading || teachers.length === 0}
                        className="bg-gradient-to-r from-purple-500 to-purple-600"
                    >
                        {isLoading ? 'กำลังเพิ่ม...' : 'เพิ่มกลุ่มสาระ'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}