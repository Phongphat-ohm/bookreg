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
import { Users, BookOpen, User, X, UserPlus, Crown } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

interface Teacher {
    id: number;
    name: string;
    username: string;
    role: string;
}

interface SubjectGroup {
    id: number;
    name: string;
}

interface SubjectGroupMembership {
    id: number;
    role: string;
    joined_at: string;
    subject_group: {
        id: number;
        name: string;
    };
}

interface ManageSubjectGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    teacher: Teacher;
    currentMembership?: SubjectGroupMembership;
}

export default function ManageSubjectGroupModal({
    isOpen,
    onClose,
    onSuccess,
    teacher,
    currentMembership
}: ManageSubjectGroupModalProps) {
    const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState("");
    const [selectedRole, setSelectedRole] = useState("member");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGroups, setIsLoadingGroups] = useState(false);

    // ดึงรายการกลุ่มสาระที่ว่าง
    const fetchAvailableSubjectGroups = async () => {
        try {
            setIsLoadingGroups(true);
            const response = await axios.get('/api/admin/subject-groups');
            
            if (response.data.status === 200) {
                setSubjectGroups(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching subject groups:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "ไม่สามารถดึงข้อมูลกลุ่มสาระได้"
            });
        } finally {
            setIsLoadingGroups(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchAvailableSubjectGroups();
            if (currentMembership) {
                setSelectedGroupId(currentMembership.subject_group.id.toString());
                setSelectedRole(currentMembership.role);
            } else {
                setSelectedGroupId("");
                setSelectedRole("member");
            }
        }
    }, [isOpen, currentMembership]);

    const handleJoinOrUpdateGroup = async () => {
        if (!selectedGroupId) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณาเลือกกลุ่มสาระ"
            });
            return;
        }

        try {
            setIsLoading(true);
            
            let response;
            
            if (currentMembership) {
                // อัปเดตบทบาทหรือเปลี่ยนกลุ่มสาระ
                if (currentMembership.subject_group.id.toString() === selectedGroupId) {
                    // เปลี่ยนบทบาทในกลุ่มเดิม
                    response = await axios.put('/api/admin/subject-group-members', {
                        teacher_id: teacher.id,
                        subject_group_id: parseInt(selectedGroupId),
                        role: selectedRole
                    });
                } else {
                    // ลบจากกลุ่มเดิมและเพิ่มเข้ากลุ่มใหม่
                    await axios.delete(`/api/admin/subject-group-members?teacher_id=${teacher.id}&subject_group_id=${currentMembership.subject_group.id}`);
                    
                    response = await axios.post('/api/admin/subject-group-members', {
                        teacher_id: teacher.id,
                        subject_group_id: parseInt(selectedGroupId),
                        role: selectedRole
                    });
                }
            } else {
                // เพิ่มเข้ากลุ่มสาระใหม่
                response = await axios.post('/api/admin/subject-group-members', {
                    teacher_id: teacher.id,
                    subject_group_id: parseInt(selectedGroupId),
                    role: selectedRole
                });
            }

            if (response.data.status === 200 || response.data.status === 201) {
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
                    description: response.data.message || "ไม่สามารถดำเนินการได้"
                });
            }
        } catch (error: any) {
            console.error("Error managing subject group membership:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการจัดการกลุ่มสาระ"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeaveGroup = async () => {
        if (!currentMembership) return;

        const result = await Swal.fire({
            title: 'ยืนยันการออกจากกลุ่มสาระ',
            html: `คุณต้องการให้ <strong>${teacher.name}</strong><br>ออกจากกลุ่มสาระ <strong>${currentMembership.subject_group.name}</strong> หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'ออกจากกลุ่มสาระ',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-lg',
                title: 'text-lg font-semibold',
                htmlContainer: 'text-sm',
                confirmButton: 'rounded-lg px-4 py-2 font-medium',
                cancelButton: 'rounded-lg px-4 py-2 font-medium'
            }
        });

        if (!result.isConfirmed) return;

        try {
            setIsLoading(true);
            
            Swal.fire({
                title: 'กำลังดำเนินการ...',
                text: 'กรุณารอสักครู่',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await axios.delete(`/api/admin/subject-group-members?teacher_id=${teacher.id}&subject_group_id=${currentMembership.subject_group.id}`);

            if (response.data.status === 200) {
                await Swal.fire({
                    title: 'สำเร็จ!',
                    text: response.data.message,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-lg'
                    }
                });
                onSuccess();
            } else {
                await Swal.fire({
                    title: 'ผิดพลาด!',
                    text: response.data.message || "ไม่สามารถออกจากกลุ่มสาระได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });
            }
        } catch (error: any) {
            console.error("Error leaving subject group:", error);
            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการออกจากกลุ่มสาระ",
                icon: 'error',
                confirmButtonText: 'ตกลง',
                customClass: {
                    popup: 'rounded-lg',
                    confirmButton: 'rounded-lg px-4 py-2 font-medium'
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedGroupId("");
        setSelectedRole("member");
        onClose();
    };

    const getRoleColor = (role: string) => {
        return role === 'header' ? 'success' : 'primary';
    };

    const getRoleIcon = (role: string) => {
        return role === 'header' ? <Crown className="w-3 h-3" /> : <User className="w-3 h-3" />;
    };

    const getRoleLabel = (role: string) => {
        return role === 'header' ? 'หัวหน้า' : 'สมาชิก';
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
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">จัดการกลุ่มสาระ</h2>
                        <p className="text-sm text-gray-600">ครู: {teacher.name}</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-6">
                        {/* Current Status */}
                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-800 mb-3">สถานะปัจจุบัน</h3>
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        name={teacher.name.charAt(0)}
                                        size="sm"
                                        className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">{teacher.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {currentMembership ? (
                                                <Chip 
                                                    size="sm" 
                                                    variant="flat" 
                                                    color={getRoleColor(currentMembership.role)}
                                                    startContent={getRoleIcon(currentMembership.role)}
                                                >
                                                    {getRoleLabel(currentMembership.role)}: {currentMembership.subject_group.name}
                                                </Chip>
                                            ) : (
                                                <Chip size="sm" variant="flat" color="default">
                                                    ไม่ได้เป็นสมาชิกกลุ่มสาระ
                                                </Chip>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Manage Group */}
                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-800 mb-4">
                                    {currentMembership ? 'เปลี่ยนกลุ่มสาระหรือบทบาท' : 'เข้าร่วมกลุ่มสาระ'}
                                </h3>
                                
                                <div className="space-y-4">
                                    <Select
                                        label="เลือกกลุ่มสาระ"
                                        placeholder={isLoadingGroups ? "กำลังโหลด..." : "เลือกกลุ่มสาระ"}
                                        selectedKeys={selectedGroupId ? [selectedGroupId] : []}
                                        onSelectionChange={(keys) => {
                                            const selectedKey = Array.from(keys)[0] as string;
                                            setSelectedGroupId(selectedKey || '');
                                        }}
                                        startContent={<BookOpen className="w-4 h-4 text-gray-400" />}
                                        isLoading={isLoadingGroups}
                                        isDisabled={isLoadingGroups}
                                        classNames={{
                                            trigger: "border-gray-300"
                                        }}
                                    >
                                        {subjectGroups.map((group) => (
                                            <SelectItem key={group.id.toString()} textValue={group.name}>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{group.name}</span>
                                                    {currentMembership?.subject_group.id === group.id && (
                                                        <Chip size="sm" variant="flat" color="primary">
                                                            ปัจจุบัน
                                                        </Chip>
                                                    )}
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

                    <div className="flex gap-2">
                        {currentMembership && (
                            <Button
                                color="danger"
                                variant="bordered"
                                startContent={<X className="w-4 h-4" />}
                                onPress={handleLeaveGroup}
                                disabled={isLoading}
                            >
                                ออกจากกลุ่มสาระ
                            </Button>
                        )}
                        
                        <Button
                            color="primary"
                            startContent={<UserPlus className="w-4 h-4" />}
                            onPress={handleJoinOrUpdateGroup}
                            isLoading={isLoading}
                            disabled={!selectedGroupId || isLoading}
                            className="bg-gradient-to-r from-purple-500 to-purple-600"
                        >
                            {currentMembership ? 'อัปเดต' : 'เข้าร่วม'}
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}