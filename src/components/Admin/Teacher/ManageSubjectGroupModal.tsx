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

    // ดึงรายการกลุ่มสาระที่ยังไม่มีหัวหน้า
    const fetchAvailableSubjectGroups = async () => {
        try {
            setIsLoadingGroups(true);
            const response = await axios.get('/api/admin/subject-groups');
            
            if (response.data.status === 200) {
                // กรองเฉพาะกลุ่มสาระที่ยังไม่มีหัวหน้า หรือเป็นกลุ่มสาระปัจจุบันของครูคนนี้
                const availableGroups = response.data.data.filter((group: any) => 
                    !group.Teacher || group.Teacher.id === teacher.id
                );
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
            fetchAvailableSubjectGroups();
            setSelectedGroupId(currentSubjectGroup?.id.toString() || "");
        }
    }, [isOpen, currentSubjectGroup, teacher.id]);

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
            
            // อัปเดตกลุ่มสาระให้มีหัวหน้าใหม่
            const response = await axios.put(`/api/admin/subject-groups/${selectedGroupId}`, {
                name: subjectGroups.find(g => g.id.toString() === selectedGroupId)?.name,
                header_id: teacher.id
            });

            if (response.data.status === 200) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: `มอบหมายให้ ${teacher.name} เป็นหัวหน้ากลุ่มสาระสำเร็จ`
                });
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถมอบหมายหัวหน้ากลุ่มสาระได้"
                });
            }
        } catch (error: any) {
            console.error("Error assigning to subject group:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการมอบหมายหัวหน้ากลุ่มสาระ"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFromGroup = async () => {
        if (!currentSubjectGroup) return;

        const result = await Swal.fire({
            title: 'ยืนยันการถอดออก',
            html: `คุณต้องการถอด <strong>${teacher.name}</strong><br>จากตำแหน่งหัวหน้ากลุ่มสาระ <strong>${currentSubjectGroup.name}</strong> หรือไม่?<br><br><span class="text-red-600 text-sm">⚠️ หมายเหตุ: กลุ่มสาระจะถูกลบออกจากระบบ เนื่องจากไม่สามารถมีกลุ่มสาระที่ไม่มีหัวหน้าได้</span>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'ถอดออกและลบกลุ่มสาระ',
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

            // ลบกลุ่มสาระ (เนื่องจากไม่สามารถมีกลุ่มสาระที่ไม่มีหัวหน้าได้)
            const response = await axios.delete(`/api/admin/subject-groups/${currentSubjectGroup.id}`);

            if (response.data.status === 200) {
                await Swal.fire({
                    title: 'สำเร็จ!',
                    text: `ถอด ${teacher.name} จากตำแหน่งหัวหน้ากลุ่มสาระและลบกลุ่มสาระ ${currentSubjectGroup.name} สำเร็จ`,
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
                                            {currentSubjectGroup ? (
                                                <Chip size="sm" variant="flat" color="success">
                                                    หัวหน้า: {currentSubjectGroup.name}
                                                </Chip>
                                            ) : (
                                                <Chip size="sm" variant="flat" color="default">
                                                    ไม่ได้เป็นหัวหน้ากลุ่มสาระ
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
                                    {currentSubjectGroup ? 'เปลี่ยนกลุ่มสาระ' : 'มอบหมายเป็นหัวหน้ากลุ่มสาระ'}
                                </h3>
                                
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
                                                {currentSubjectGroup?.id === group.id && (
                                                    <Chip size="sm" variant="flat" color="primary">
                                                        ปัจจุบัน
                                                    </Chip>
                                                )}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </Select>

                                {subjectGroups.length === 0 && !isLoadingGroups && (
                                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                        <p className="text-sm text-amber-700">
                                            <strong>ไม่มีกลุ่มสาระที่ว่าง:</strong> กลุ่มสาระทั้งหมดมีหัวหน้าแล้ว
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
                        {currentSubjectGroup && (
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
                            disabled={!selectedGroupId || isLoading || selectedGroupId === currentSubjectGroup?.id.toString()}
                            className="bg-gradient-to-r from-purple-500 to-purple-600"
                        >
                            {currentSubjectGroup ? 'เปลี่ยนกลุ่มสาระ' : 'มอบหมาย'}
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}