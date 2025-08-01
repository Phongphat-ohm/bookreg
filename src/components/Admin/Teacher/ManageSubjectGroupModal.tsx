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
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Users, BookOpen, User, X } from "lucide-react";
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

    // ดึงรายการกลุ่มสาระที่สามารถเข้าร่วมได้
    const fetchAvailableSubjectGroups = async () => {
        try {
            setIsLoadingGroups(true);
            const response = await axios.get('/api/admin/subject-groups');
            
            if (response.data.status === 200) {
                // กรองกลุ่มสาระตาม role ที่เลือก
                const availableGroups = response.data.data.filter((group: any) => {
                    const hasHead = group.members.some((member: any) => member.role === 'head');
                    const isCurrentTeacherHead = group.members.some((member: any) => 
                        member.role === 'head' && member.teacher.id === teacher.id
                    );
                    
                    if (selectedRole === 'head') {
                        // สำหรับหัวหน้า: เฉพาะกลุ่มที่ยังไม่มีหัวหน้า หรือเป็นกลุ่มปัจจุบันของครูคนนี้
                        return !hasHead || isCurrentTeacherHead;
                    } else {
                        // สำหรับสมาชิก: ทุกกลุ่มสาระ
                        return true;
                    }
                });
                setSubjectGroups(availableGroups);
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
            setSelectedGroupId(currentMembership?.subject_group.id.toString() || "");
            setSelectedRole(currentMembership?.role || "member");
        }
    }, [isOpen, currentMembership, teacher.id]);

    useEffect(() => {
        if (isOpen) {
            fetchAvailableSubjectGroups();
        }
    }, [isOpen, selectedRole, teacher.id]);

    const handleAssignToGroup = async () => {
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
            
            // ถ้ามี membership อยู่แล้ว ให้ลบออกก่อน
            if (currentMembership) {
                await axios.delete('/api/admin/subject-group-members', {
                    params: {
                        teacher_id: teacher.id,
                        subject_group_id: currentMembership.subject_group.id
                    }
                });
            }
            
            // เพิ่มเป็นสมาชิกกลุ่มสาระใหม่
            const response = await axios.post('/api/admin/subject-group-members', {
                teacher_id: teacher.id,
                subject_group_id: parseInt(selectedGroupId),
                role: selectedRole
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: `มอบหมายให้ ${teacher.name} เป็น${selectedRole === 'head' ? 'หัวหน้า' : 'สมาชิก'}กลุ่มสาระสำเร็จ`
                });
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || `ไม่สามารถมอบหมาย${selectedRole === 'head' ? 'หัวหน้า' : 'สมาชิก'}กลุ่มสาระได้`
                });
            }
        } catch (error: any) {
            console.error("Error assigning to subject group:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || `เกิดข้อผิดพลาดในการมอบหมาย${selectedRole === 'head' ? 'หัวหน้า' : 'สมาชิก'}กลุ่มสาระ`
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFromGroup = async () => {
        if (!currentMembership) return;

        const result = await Swal.fire({
            title: 'ยืนยันการถอดออก',
            html: `คุณต้องการถอด <strong>${teacher.name}</strong><br>จากตำแหน่ง${currentMembership.role === 'head' ? 'หัวหน้า' : 'สมาชิก'}กลุ่มสาระ <strong>${currentMembership.subject_group.name}</strong> หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'ถอดออก',
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

            // ลบสมาชิกออกจากกลุ่มสาระ
            const response = await axios.delete('/api/admin/subject-group-members', {
                params: {
                    teacher_id: teacher.id,
                    subject_group_id: currentMembership.subject_group.id
                }
            });

            if (response.data.status === 200) {
                await Swal.fire({
                    title: 'สำเร็จ!',
                    text: `ถอด ${teacher.name} จากตำแหน่ง${currentMembership.role === 'head' ? 'หัวหน้า' : 'สมาชิก'}กลุ่มสาระ ${currentMembership.subject_group.name} สำเร็จ`,
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-lg'
                    }
                });
                onSuccess();
            } else {
                await Swal.fire({
                    title: 'ผิดพลาด!',
                    text: response.data.message || "ไม่สามารถถอดออกจากกลุ่มสาระได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });
            }
        } catch (error: any) {
            console.error("Error removing from subject group:", error);
            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการถอดออกจากกลุ่มสาระ",
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
                                    <User className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-800">{teacher.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {currentMembership ? (
                                                <Chip 
                                                    size="sm" 
                                                    variant="flat" 
                                                    color={currentMembership.role === 'head' ? 'success' : 'primary'}
                                                >
                                                    {currentMembership.role === 'head' ? 'หัวหน้า' : 'สมาชิก'}: {currentMembership.subject_group.name}
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

                        {/* Assign to Group */}
                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-800 mb-4">
                                    {currentMembership ? 'เปลี่ยนกลุ่มสาระ' : 'มอบหมายเข้ากลุ่มสาระ'}
                                </h3>
                                
                                <div className="space-y-4">
                                    {/* Role Selection */}
                                    <Select
                                        label="เลือกบทบาท"
                                        placeholder="เลือกบทบาท"
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
                                        <SelectItem key="head" textValue="หัวหน้า">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-green-500" />
                                                <span>หัวหน้า</span>
                                            </div>
                                        </SelectItem>
                                    </Select>

                                    {/* Subject Group Selection */}
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

                                    {subjectGroups.length === 0 && !isLoadingGroups && selectedRole === 'head' && (
                                        <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                            <p className="text-sm text-amber-700">
                                                <strong>ไม่มีกลุ่มสาระที่ว่าง:</strong> กลุ่มสาระทั้งหมดมีหัวหน้าแล้ว
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Warning */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-2">ข้อมูลเพิ่มเติม</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                                <p>• ครู 1 คน สามารถเป็นสมาชิกได้เพียง 1 กลุ่มสาระเท่านั้น</p>
                                <p>• กลุ่มสาระ 1 กลุ่ม ต้องมีหัวหน้า 1 คนเท่านั้น แต่สามารถมีสมาชิกได้หลายคน</p>
                                <p>• การเปลี่ยนแปลงจะมีผลทันที</p>
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
                                onPress={handleRemoveFromGroup}
                                disabled={isLoading}
                            >
                                ถอดออก
                            </Button>
                        )}
                        
                        <Button
                            color="primary"
                            startContent={<Users className="w-4 h-4" />}
                            onPress={handleAssignToGroup}
                            isLoading={isLoading}
                            disabled={!selectedGroupId || isLoading || (selectedGroupId === currentMembership?.subject_group.id.toString() && selectedRole === currentMembership?.role)}
                            className="bg-gradient-to-r from-purple-500 to-purple-600"
                        >
                            {currentMembership ? 'เปลี่ยนกลุ่มสาระ' : 'มอบหมาย'}
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}