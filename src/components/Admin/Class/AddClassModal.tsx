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
    Chip,
    Avatar,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Plus, Users, UserCheck } from "lucide-react";
import axios from "axios";

interface Teacher {
    id: number;
    name: string;
    username: string;
    advisingClasses: {
        id: number;
        grade: string;
        name: string;
    }[];
}

interface AddClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddClassModal({ isOpen, onClose, onSuccess }: AddClassModalProps) {
    const [formData, setFormData] = useState({
        grade: "",
        name: "",
        advisorIds: [] as number[]
    });
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

    const gradeOptions = [
        { key: "1", label: "มัธยมศึกษาปีที่ 1" },
        { key: "2", label: "มัธยมศึกษาปีที่ 2" },
        { key: "3", label: "มัธยมศึกษาปีที่ 3" },
        { key: "4", label: "มัธยมศึกษาปีที่ 4" },
        { key: "5", label: "มัธยมศึกษาปีที่ 5" },
        { key: "6", label: "มัธยมศึกษาปีที่ 6" }
    ];

    const fetchTeachers = async () => {
        try {
            setIsLoadingTeachers(true);
            const response = await axios.get("/api/admin/teachers");
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

    const handleSubmit = async () => {
        if (!formData.grade || !formData.name.trim()) {
            addToast({
                color: "warning",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอกระดับชั้นและชื่อห้องเรียน"
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post("/api/admin/classes", {
                grade: formData.grade,
                name: formData.name.trim(),
                advisorIds: formData.advisorIds
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "เพิ่มห้องเรียนสำเร็จ"
                });
                handleClose();
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเพิ่มห้องเรียนได้"
                });
            }
        } catch (error: any) {
            console.error("Error creating class:", error);
            const errorMessage = error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มห้องเรียน";
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
            grade: "",
            name: "",
            advisorIds: []
        });
        onClose();
    };

    const handleAdvisorSelect = (keys: any) => {
        const selectedIds = Array.from(keys).map(id => parseInt(id as string));
        setFormData(prev => ({ ...prev, advisorIds: selectedIds }));
    };

    const removeAdvisor = (advisorId: number) => {
        setFormData(prev => ({
            ...prev,
            advisorIds: prev.advisorIds.filter(id => id !== advisorId)
        }));
    };

    const getSelectedTeachers = () => {
        return teachers.filter(teacher => formData.advisorIds.includes(teacher.id));
    };

    useEffect(() => {
        if (isOpen) {
            fetchTeachers();
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
            scrollBehavior="inside"
            classNames={{
                base: "bg-white",
                header: "border-b border-gray-200",
                footer: "border-t border-gray-200"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">เพิ่มห้องเรียนใหม่</h2>
                        <p className="text-sm text-gray-600">กรอกข้อมูลห้องเรียนและเลือกครูที่ปรึกษา</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-6">
                        {/* Grade Selection */}
                        <div>
                            <Select
                                label="ระดับชั้น"
                                placeholder="เลือกระดับชั้น"
                                selectedKeys={formData.grade ? [formData.grade] : []}
                                onSelectionChange={(keys) => {
                                    const grade = Array.from(keys)[0] as string || "";
                                    setFormData(prev => ({ ...prev, grade }));
                                }}
                                isRequired
                                startContent={<Users className="w-4 h-4 text-gray-400" />}
                            >
                                {gradeOptions.map((option) => (
                                    <SelectItem key={option.key} textValue={option.label}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* Class Name */}
                        <div>
                            <Input
                                label="ชื่อห้องเรียน"
                                placeholder="เช่น 1, 2, 3, A, B, C"
                                value={formData.name}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                                isRequired
                                description="ชื่อห้องเรียน เช่น 1, 2, 3 หรือ A, B, C"
                            />
                        </div>

                        {/* Preview */}
                        {formData.grade && formData.name && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-600 mb-1">ตัวอย่างชื่อห้องเรียน:</p>
                                <p className="text-lg font-bold text-blue-800">
                                    ม.{formData.grade}/{formData.name}
                                </p>
                            </div>
                        )}

                        {/* Advisor Selection */}
                        <div>
                            <Select
                                label="ครูที่ปรึกษา (ไม่บังคับ)"
                                placeholder="เลือกครูที่ปรึกษา"
                                selectionMode="multiple"
                                selectedKeys={formData.advisorIds.map(id => id.toString())}
                                onSelectionChange={handleAdvisorSelect}
                                isLoading={isLoadingTeachers}
                                startContent={<UserCheck className="w-4 h-4 text-gray-400" />}
                                description="สามารถเลือกครูที่ปรึกษาได้หลายคน หรือเว้นไว้เพื่อเพิ่มทีหลัง"
                            >
                                {teachers.map((teacher) => {
                                    const hasAdvisingClass = teacher.advisingClasses.length > 0;
                                    return (
                                        <SelectItem
                                            key={teacher.id.toString()}
                                            textValue={teacher.name}
                                            isDisabled={hasAdvisingClass}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    name={teacher.name.charAt(0)}
                                                    size="sm"
                                                    className={`${hasAdvisingClass ? 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'}`}
                                                />
                                                <div>
                                                    <p className={`font-medium ${hasAdvisingClass ? 'text-gray-400' : ''}`}>
                                                        {teacher.name}
                                                    </p>
                                                    {hasAdvisingClass ? (
                                                        <p className="text-xs text-red-500">
                                                            มีห้องที่ปรึกษาแล้ว: {teacher.advisingClasses.map(cls => `ม.${cls.grade}/${cls.name}`).join(', ')}
                                                        </p>
                                                    ) : (
                                                        <p className="text-xs text-green-600">ว่าง - สามารถเลือกได้</p>
                                                    )}
                                                </div>
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </Select>
                        </div>

                        {/* Selected Advisors */}
                        {getSelectedTeachers().length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">ครูที่ปรึกษาที่เลือก:</p>
                                <div className="flex flex-wrap gap-2">
                                    {getSelectedTeachers().map((teacher) => (
                                        <Chip
                                            key={teacher.id}
                                            onClose={() => removeAdvisor(teacher.id)}
                                            variant="flat"
                                            color="primary"
                                            avatar={
                                                <Avatar
                                                    name={teacher.name.charAt(0)}
                                                    size="sm"
                                                    className="bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                                                />
                                            }
                                        >
                                            {teacher.name}
                                        </Chip>
                                    ))}
                                </div>
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
                        className="bg-gradient-to-r from-blue-500 to-blue-600"
                    >
                        {isLoading ? "กำลังเพิ่ม..." : "เพิ่มห้องเรียน"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}