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
    Textarea,
    addToast
} from "@heroui/react";
import { useState } from "react";
import { Plus, Book, Hash, GraduationCap, FileText } from "lucide-react";
import axios from "axios";

interface AddSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    subjectGroupId: number;
}

const gradeOptions = [
    { value: "1", label: "มัธยมศึกษาปีที่ 1" },
    { value: "2", label: "มัธยมศึกษาปีที่ 2" },
    { value: "3", label: "มัธยมศึกษาปีที่ 3" },
    { value: "4", label: "มัธยมศึกษาปีที่ 4" },
    { value: "5", label: "มัธยมศึกษาปีที่ 5" },
    { value: "6", label: "มัธยมศึกษาปีที่ 6" }
];

export default function AddSubjectModal({ 
    isOpen, 
    onClose, 
    onSuccess, 
    subjectGroupId 
}: AddSubjectModalProps) {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        grade: "",
        description: ""
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
        if (!formData.code.trim()) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอกรหัสวิชา"
            });
            return;
        }

        if (!formData.name.trim()) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอกชื่อวิชา"
            });
            return;
        }

        if (!formData.grade) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณาเลือกระดับชั้น"
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('/api/admin/subjects', {
                code: formData.code.trim(),
                name: formData.name.trim(),
                grade: formData.grade,
                description: formData.description.trim() || null,
                subject_group_id: subjectGroupId
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "เพิ่มวิชาสำเร็จ"
                });
                
                // รีเซ็ตฟอร์ม
                setFormData({
                    code: "",
                    name: "",
                    grade: "",
                    description: ""
                });
                
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเพิ่มวิชาได้"
                });
            }
        } catch (error: any) {
            console.error("Error adding subject:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มวิชา"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setFormData({
                code: "",
                name: "",
                grade: "",
                description: ""
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
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">เพิ่มวิชาใหม่</h2>
                        <p className="text-sm text-gray-600">เพิ่มวิชาในกลุ่มสาระนี้</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="รหัสวิชา"
                                placeholder="เช่น TH101"
                                value={formData.code}
                                onValueChange={(value) => handleInputChange('code', value)}
                                startContent={<Hash className="w-4 h-4 text-gray-400" />}
                                isRequired
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "border-gray-300"
                                }}
                            />

                            <Select
                                label="ระดับชั้น"
                                placeholder="เลือกระดับชั้น"
                                selectedKeys={formData.grade ? [formData.grade] : []}
                                onSelectionChange={(keys) => {
                                    const selectedKey = Array.from(keys)[0] as string;
                                    handleInputChange('grade', selectedKey || '');
                                }}
                                startContent={<GraduationCap className="w-4 h-4 text-gray-400" />}
                                isRequired
                                classNames={{
                                    trigger: "border-gray-300"
                                }}
                            >
                                {gradeOptions.map((grade) => (
                                    <SelectItem key={grade.value} textValue={grade.label}>
                                        {grade.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <Input
                            label="ชื่อวิชา"
                            placeholder="เช่น ภาษาไทย"
                            value={formData.name}
                            onValueChange={(value) => handleInputChange('name', value)}
                            startContent={<Book className="w-4 h-4 text-gray-400" />}
                            isRequired
                            classNames={{
                                input: "text-sm",
                                inputWrapper: "border-gray-300"
                            }}
                        />

                        <Textarea
                            label="คำอธิบายวิชา (ไม่บังคับ)"
                            placeholder="อธิบายเนื้อหาหรือรายละเอียดของวิชา"
                            value={formData.description}
                            onValueChange={(value) => handleInputChange('description', value)}
                            minRows={3}
                            classNames={{
                                input: "text-sm",
                                inputWrapper: "border-gray-300"
                            }}
                        />
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
                        className="bg-gradient-to-r from-green-500 to-green-600"
                    >
                        {isLoading ? 'กำลังเพิ่ม...' : 'เพิ่มวิชา'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}