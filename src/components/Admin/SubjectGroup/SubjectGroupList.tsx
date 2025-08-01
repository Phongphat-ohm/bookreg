"use client";
import {
    Card,
    CardBody,
    CardHeader,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Chip,
    Avatar,
    Pagination
} from "@heroui/react";
import { useState, useMemo } from "react";
import { BookOpen, Search, Plus, MoreVertical, Edit, Trash2, Users, Eye } from "lucide-react";
import AddSubjectGroupModal from "./AddSubjectGroupModal";
import EditSubjectGroupModal from "./EditSubjectGroupModal";
import AddTeacherToGroupModal from "./AddTeacherToGroupModal";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Teacher {
    id: number;
    name: string;
    username: string;
    role?: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    grade: string;
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
    subjects: Subject[];
}

interface SubjectGroupListProps {
    subjectGroups: SubjectGroup[];
    onUpdate: () => void;
}

export default function SubjectGroupList({ subjectGroups, onUpdate }: SubjectGroupListProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangeHeaderModalOpen, setIsChangeHeaderModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<SubjectGroup | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const rowsPerPage = 10;

    const filteredGroups = useMemo(() => {
        if (!searchTerm) return subjectGroups;

        return subjectGroups.filter(group => {
            const header = group.members.find(member => member.role === 'head');
            return group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (header && header.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()));
        });
    }, [subjectGroups, searchTerm]);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1);
    };

    const paginatedGroups = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredGroups.slice(start, end);
    }, [filteredGroups, page]);

    const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);

    const handleViewGroup = (group: SubjectGroup) => {
        router.push(`/admin/subject_group/${group.id}`);
    };

    const handleEditGroup = (group: SubjectGroup) => {
        setSelectedGroup(group);
        setIsEditModalOpen(true);
    };

    const handleChangeHeader = (group: SubjectGroup) => {
        setSelectedGroup(group);
        setIsChangeHeaderModalOpen(true);
    };

    const handleDeleteGroup = async (group: SubjectGroup) => {
        const header = group.members.find(member => member.role === 'head');
        const headerName = header ? header.teacher.name : 'ไม่มีหัวหน้า';

        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบกลุ่มสาระ<br><strong>"${group.name}"</strong><br>หัวหน้ากลุ่มสาระ: ${headerName} หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'ลบ',
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
            setIsDeleting(group.id);

            Swal.fire({
                title: 'กำลังลบ...',
                text: 'กรุณารอสักครู่',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await axios.delete(`/api/admin/subject-groups/${group.id}`);

            if (response.data.status === 200) {
                await Swal.fire({
                    title: 'สำเร็จ!',
                    text: `ลบกลุ่มสาระ ${group.name} สำเร็จ`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-lg'
                    }
                });
                onUpdate();
            } else {
                await Swal.fire({
                    title: 'ผิดพลาด!',
                    text: response.data.message || "ไม่สามารถลบกลุ่มสาระได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });
            }
        } catch (error: any) {
            console.error("Error deleting subject group:", error);
            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบกลุ่มสาระ",
                icon: 'error',
                confirmButtonText: 'ตกลง',
                customClass: {
                    popup: 'rounded-lg',
                    confirmButton: 'rounded-lg px-4 py-2 font-medium'
                }
            });
        } finally {
            setIsDeleting(null);
        }
    };

    const handleAddSuccess = () => {
        setIsAddModalOpen(false);
        onUpdate();
    };

    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        setSelectedGroup(null);
        onUpdate();
    };

    const handleChangeHeaderSuccess = () => {
        setIsChangeHeaderModalOpen(false);
        setSelectedGroup(null);
        onUpdate();
    };

    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">กลุ่มสาระการเรียนรู้</h2>
                                <p className="text-sm text-gray-600">
                                    ทั้งหมด {subjectGroups.length} กลุ่มสาระ
                                    {searchTerm && ` • พบ ${filteredGroups.length} กลุ่มสาระ`}
                                </p>
                            </div>
                        </div>

                        <Button
                            color="primary"
                            startContent={<Plus className="w-4 h-4" />}
                            onPress={() => setIsAddModalOpen(true)}
                            className="bg-gradient-to-r from-purple-500 to-purple-600"
                        >
                            เพิ่มกลุ่มสาระ
                        </Button>
                    </div>
                </CardHeader>

                <CardBody>
                    {/* Search */}
                    <div className="mb-4">
                        <Input
                            placeholder="ค้นหากลุ่มสาระ (ชื่อกลุ่มสาระ หรือ หัวหน้ากลุ่มสาระ)"
                            value={searchTerm}
                            onValueChange={handleSearchChange}
                            startContent={<Search className="w-4 h-4 text-gray-400" />}
                            classNames={{
                                input: "text-sm",
                                inputWrapper: "border-gray-300"
                            }}
                        />
                    </div>

                    {/* Table */}
                    {filteredGroups.length > 0 ? (
                        <>
                            <Table
                                aria-label="รายการกลุ่มสาระการเรียนรู้"
                                classNames={{
                                    wrapper: "shadow-none border border-gray-200 rounded-lg",
                                    th: "bg-gray-50 text-gray-700 font-semibold",
                                    td: "py-4"
                                }}
                            >
                                <TableHeader>
                                    <TableColumn>กลุ่มสาระการเรียนรู้</TableColumn>
                                    <TableColumn>หัวหน้ากลุ่มสาระ</TableColumn>
                                    <TableColumn>สถิติ</TableColumn>
                                    <TableColumn width={100}>จัดการ</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {paginatedGroups.map((group) => (
                                        <TableRow key={group.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
                                                        <BookOpen className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{group.name}</p>
                                                        <p className="text-xs text-gray-500">ID: {group.id}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const header = group.members.find(member => member.role === 'head');
                                                    if (header) {
                                                        return (
                                                            <div className="flex items-center gap-3">
                                                                <Avatar
                                                                    name={header.teacher.name.charAt(0)}
                                                                    size="sm"
                                                                    className="bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                                                                />
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <p className="font-medium text-gray-800">{header.teacher.name}</p>
                                                                        <Chip
                                                                            size="sm"
                                                                            variant="flat"
                                                                            color="success"
                                                                            className="text-xs"
                                                                        >
                                                                            หัวหน้า
                                                                        </Chip>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500">@{header.teacher.username}</p>
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
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-gray-400" />
                                                        <span className="font-medium text-gray-800">
                                                            {group.subjects.length} วิชา
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            {group.members.length} สมาชิก
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            isIconOnly
                                                            isDisabled={isDeleting === group.id}
                                                        >
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Subject group actions">
                                                        <DropdownItem
                                                            key="view"
                                                            startContent={<Eye className="w-4 h-4" />}
                                                            onPress={() => handleViewGroup(group)}
                                                        >
                                                            ดูรายละเอียด
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="change-header"
                                                            startContent={<Users className="w-4 h-4" />}
                                                            onPress={() => handleChangeHeader(group)}
                                                        >
                                                            เปลี่ยนหัวหน้า
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="edit"
                                                            startContent={<Edit className="w-4 h-4" />}
                                                            onPress={() => handleEditGroup(group)}
                                                        >
                                                            แก้ไขข้อมูล
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="delete"
                                                            className="text-danger"
                                                            color="danger"
                                                            startContent={<Trash2 className="w-4 h-4" />}
                                                            onPress={() => handleDeleteGroup(group)}
                                                        >
                                                            ลบกลุ่มสาระ
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-4">
                                    <Pagination
                                        total={totalPages}
                                        page={page}
                                        onChange={setPage}
                                        showControls
                                        classNames={{
                                            cursor: "bg-purple-500 text-white"
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                {searchTerm ? (
                                    <Search className="w-8 h-8 text-gray-400" />
                                ) : (
                                    <BookOpen className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                {searchTerm ? "ไม่พบกลุ่มสาระที่ค้นหา" : "ยังไม่มีกลุ่มสาระการเรียนรู้"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm ? (
                                    <>ไม่พบกลุ่มสาระที่ตรงกับคำค้นหา "<span className="font-medium">{searchTerm}</span>"</>
                                ) : (
                                    "เริ่มต้นโดยการเพิ่มกลุ่มสาระการเรียนรู้แรก"
                                )}
                            </p>
                            {!searchTerm && (
                                <Button
                                    color="primary"
                                    startContent={<Plus className="w-4 h-4" />}
                                    onPress={() => setIsAddModalOpen(true)}
                                    className="bg-gradient-to-r from-purple-500 to-purple-600"
                                >
                                    เพิ่มกลุ่มสาระแรก
                                </Button>
                            )}
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Modals */}
            <AddSubjectGroupModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddSuccess}
            />

            {selectedGroup && (
                <EditSubjectGroupModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedGroup(null);
                    }}
                    onSuccess={handleEditSuccess}
                    subjectGroup={selectedGroup}
                />
            )}

            {selectedGroup && (
                <AddTeacherToGroupModal
                    isOpen={isChangeHeaderModalOpen}
                    onClose={() => {
                        setIsChangeHeaderModalOpen(false);
                        setSelectedGroup(null);
                    }}
                    onSuccess={handleChangeHeaderSuccess}
                    subjectGroup={selectedGroup}
                />
            )}
        </>
    );
}