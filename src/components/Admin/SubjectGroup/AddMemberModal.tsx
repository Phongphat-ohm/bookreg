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
    Avatar,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { UserPlus, User, Crown } from "lucide-react";
import axios from "axios";

interface Teacher {
    id: number;
    name: string;
    username: string;
    role: string;
}

interface SubjectGroupData {
    id: number;
    name: string;
}

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    subjectGroup: SubjectGroupData;
}

export default function AddMemberModal({
    isOpen,
    onClose,
    onSuccess,
    subjectGroup
}: AddMemberModalProps) {
    const [availableTeachers, setAvailableTeachers] = useState<Teacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedRole, setSelectedRole] = useState("member");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

    // ดึงรายการครูที่ยังไม่เป็นสมาชิกกลุ่มสาระใดๆ
    const fetchAvailableTeachers = async () => {
        try {
            setIsLoadingTeachers(true);
            const response = await axios.get('/api/admin/teachers?availableOnly=true');
            
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
            setSelectedRole("member");
        }
    }, [isOpen]);

    const handleAddMember = async () => {
        if (!selectedTeacherId) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณาเลือกครูที่จะเพิ่มเข้ากลุ่มสาระ"
            });
            return;
        }

        const selectedTeacher = availableTeachers.find(t => t.id.toString() === selectedTeacherId);
        if (!selectedTeacher) return;

        try {
            setIsLoading(true);
            
            const response = await axios.post('/api/admin/subject-group-members', {
                teacher_id: parseInt(selectedTeacherId),
                subject_group_id: subjectGroup.id,
                role: selectedRole
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: response.data.message
                });
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเพิ่มสมาชิกได้"
                });
            }
        } catch (error: any) {
            console.error("Error adding member:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มสมาชิก"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedTeacherId("");
        setSelectedRole("member");
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
                        <h2 className="text-xl font-bold text-gray-800">เพิ่มสมาชิกกลุ่มสาระ</h2>
                        <p className="text-sm text-gray-600">กลุ่มสาระ: {subjectGroup.name}</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-6">
                        {/* Group Info */}
                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-800 mb-3">ข้อมูลกลุ่มสาระ</h3>
                                <div className="flex items-center gap-3">
                                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{subjectGroup.name}</p>
                                        <p className="text-xs text-gray-500">ID: {subjectGroup.id}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Select Teacher */}
                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-800 mb-4">เลือกครูที่จะเพิ่มเข้ากลุ่มสาระ</h3>
                                
                                <div className="space-y-4">
                                    <Select
                                        label="เลือกครู"
                                        placeholder={isLoadingTeachers ? "กำลังโหลด..." : "เลือกครูที่จะเพิ่มเข้ากลุ่มสาระ"}
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

                                    <Select
                                        label="เลือกบทบาท"
                                        placeholder="เลือกบทบาทในกลุ่มสาระ"
                                        selectedKeys={selectedRole ? [selectedRole] : []}
                                        onSelectionChange={(keys) => {
                                            const selectedKey = Array.from(keys)[0] as string;
                                            setSelectedRole(selectedKey || 'member');
                                        }}
                                        startContent={<User className="w-4 h-4 text-gray-400" />}
                                        classNames={{
                                            trigger: "border-gray-300"
                                        }}
                                    >
                                        <SelectItem key="member" textValue="สมาชิก">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-blue-500" />
                                                <span>สมาชิก</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem key="header" textValue="หัวหน้า">
                                            <div className="flex items-center gap-2">
                                                <Crown className="w-4 h-4 text-yellow-500" />
                                                <span>หัวหน้า</span>
                                            </div>
                                        </SelectItem>
                                    </Select>
                                </div>

                                {availableTeachers.length === 0 && !isLoadingTeachers && (
                                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                        <p className="text-sm text-amber-700">
                                            <strong>ไม่มีครูที่ว่าง:</strong> ครูทุกคนเป็นสมาชิกกลุ่มสาระแล้ว
                                        </p>
                                    </div>
                                )}
                            </CardBody>
                        </Card>

                        {/* Info */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-2">ข้อมูลเพิ่มเติม</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                                <p>• <strong>สมาชิก:</strong> เป็นสมาชิกธรรมดาของกลุ่มสาระ</p>
                                <p>• <strong>หัวหน้า:</strong> เป็นหัวหน้ากลุ่มสาระ มีสิทธิ์จัดการกลุ่มสาระ</p>
                                <p>• ครู 1 คน สามารถเป็นสมาชิกได้เพียง 1 กลุ่มสาระเท่านั้น</p>
                                <p>• กลุ่มสาระ 1 กลุ่ม สามารถมีหัวหน้าได้เพียง 1 คนเท่านั้น</p>
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
                        onPress={handleAddMember}
                        isLoading={isLoading}
                        disabled={!selectedTeacherId || isLoading}
                        className="bg-gradient-to-r from-green-500 to-green-600"
                    >
                        เพิ่มสมาชิก
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}