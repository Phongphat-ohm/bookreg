"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Select,
    SelectItem,
    Card,
    CardBody,
    Chip,
    Avatar,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Users, User, BookOpen, UserPlus } from "lucide-react";
import axios from "axios";

interface Teacher {
    id: number;
    name: string;
    username: string;
    role?: string;
}

interface SubjectGroupMember {
    id: number;
    role: string;
    joined_at: string;
    teacher: Teacher;
}

interface SubjectGroup {
    id: number;
    name: string;
    members: SubjectGroupMember[];
}

interface AddTeacherToGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    subjectGroup: SubjectGroup;
}

export default function AddTeacherToGroupModal({
    isOpen,
    onClose,
    onSuccess,
    subjectGroup
}: AddTeacherToGroupModalProps) {
    const [availableTeachers, setAvailableTeachers] = useState<Teacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

    // ดึงรายการครูที่ยังไม่เป็นหัวหน้ากลุ่มสาระ
    const fetchAvailableTeachers = async () => {
        try {
            setIsLoadingTeachers(true);
            const response = await axios.get('/api/admin/teachers?availableOnly=true&excludeGroupId=' + subjectGroup.id);

            if (response.data.status === 200) {
                setAvailableTeachers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching available teachers:", error);
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
            fetchAvailableTeachers();
            setSelectedTeacherId("");
        }
    }, [isOpen, subjectGroup.id]);

    const handleChangeHeader = async () => {
        if (!selectedTeacherId) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณาเลือกครูที่จะเป็นหัวหน้ากลุ่มสาระใหม่"
            });
            return;
        }

        const selectedTeacher = availableTeachers.find(t => t.id.toString() === selectedTeacherId);
        if (!selectedTeacher) return;

        try {
            setIsLoading(true);

            // ลบหัวหน้าเดิม (ถ้ามี)
            const currentHeader = subjectGroup.members.find(member => member.role === 'head');
            if (currentHeader) {
                await axios.delete(`/api/admin/subject-group-members?teacher_id=${currentHeader.teacher.id}&subject_group_id=${subjectGroup.id}`);
            }

            // เพิ่มหัวหน้าใหม่
            const response = await axios.post('/api/admin/subject-group-members', {
                teacher_id: parseInt(selectedTeacherId),
                subject_group_id: subjectGroup.id,
                role: 'head'
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: `เปลี่ยนหัวหน้ากลุ่มสาระ ${subjectGroup.name} เป็น ${selectedTeacher.name} สำเร็จ`
                });
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเปลี่ยนหัวหน้ากลุ่มสาระได้"
                });
            }
        } catch (error: any) {
            console.error("Error changing group header:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการเปลี่ยนหัวหน้ากลุ่มสาระ"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedTeacherId("");
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
            classNames={{
                base: "bg-white",
                header: "border-b border-gray-200",
                footer: "border-t border-gray-200"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                        <UserPlus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">เปลี่ยนหัวหน้ากลุ่มสาระ</h2>
                        <p className="text-sm text-gray-600">กลุ่มสาระ: {subjectGroup.name}</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-6">
                        {/* Current Header */}
                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-800 mb-3">หัวหน้ากลุ่มสาระปัจจุบัน</h3>
                                {(() => {
                                    const currentHeader = subjectGroup.members.find(member => member.role === 'head');
                                    if (currentHeader) {
                                        return (
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    name={currentHeader.teacher.name.charAt(0)}
                                                    size="sm"
                                                    className="bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800">{currentHeader.teacher.name}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Chip size="sm" variant="flat" color="success">
                                                            หัวหน้าปัจจุบัน
                                                        </Chip>
                                                        <span className="text-xs text-gray-500">@{currentHeader.teacher.username}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    name="?"
                                                    size="sm"
                                                    className="bg-gray-400 text-white"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-600">ไม่มีหัวหน้า</p>
                                                    <p className="text-xs text-gray-500">ต้องมอบหมายหัวหน้า</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                })()}
                            </CardBody>
                        </Card>

                        {/* Select New Header */}
                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-800 mb-4">เลือกหัวหน้ากลุ่มสาระใหม่</h3>

                                <Select
                                    label="เลือกครู"
                                    placeholder={isLoadingTeachers ? "กำลังโหลด..." : "เลือกครูที่จะเป็นหัวหน้าใหม่"}
                                    selectedKeys={selectedTeacherId ? [selectedTeacherId] : []}
                                    onSelectionChange={(keys) => {
                                        const selectedKey = Array.from(keys)[0] as string;
                                        setSelectedTeacherId(selectedKey || '');
                                    }}
                                    startContent={<User className="w-4 h-4 text-gray-400" />}
                                    isLoading={isLoadingTeachers}
                                    isDisabled={isLoadingTeachers}
                                    classNames={{
                                        trigger: "border-gray-300"
                                    }}
                                >
                                    {availableTeachers.map((teacher) => (
                                        <SelectItem key={teacher.id.toString()} textValue={teacher.name}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    name={teacher.name.charAt(0)}
                                                    size="sm"
                                                    className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white"
                                                />
                                                <div>
                                                    <p className="font-medium">{teacher.name}</p>
                                                    <p className="text-xs text-gray-500">@{teacher.username}</p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </Select>

                                {availableTeachers.length === 0 && !isLoadingTeachers && (
                                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                        <p className="text-sm text-amber-700">
                                            <strong>ไม่มีครูที่ว่าง:</strong> ครูทุกคนเป็นหัวหน้ากลุ่มสาระแล้ว
                                        </p>
                                    </div>
                                )}
                            </CardBody>
                        </Card>

                        {/* Warning */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-2">ข้อมูลเพิ่มเติม</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                                <p>• ครู 1 คน สามารถเป็นหัวหน้าได้เพียง 1 กลุ่มสาระเท่านั้น</p>
                                <p>• กลุ่มสาระ 1 กลุ่ม ต้องมีหัวหน้า 1 คนเท่านั้น</p>
                                <p>• การเปลี่ยนแปลงจะมีผลทันที</p>
                                <p>• หัวหน้าเดิมจะไม่เป็นหัวหน้ากลุ่มสาระใดๆ</p>
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
                        startContent={<UserPlus className="w-4 h-4" />}
                        onPress={handleChangeHeader}
                        isLoading={isLoading}
                        disabled={!selectedTeacherId || isLoading}
                        className="bg-gradient-to-r from-green-500 to-green-600"
                    >
                        เปลี่ยนหัวหน้า
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}