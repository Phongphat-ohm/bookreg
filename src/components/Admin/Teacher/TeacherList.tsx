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
    Pagination,
    Select,
    SelectItem,
    addToast
} from "@heroui/react";
import { useState, useMemo } from "react";
import { Users, Search, Plus, MoreVertical, Edit, Trash2, UserCheck, Shield, User, BookOpen } from "lucide-react";
import AddTeacherModal from "./AddTeacherModal";
import EditTeacherModal from "./EditTeacherModal";
import ManageSubjectGroupModal from "./ManageSubjectGroupModalNew";
import axios from "axios";
import Swal from "sweetalert2";

interface SubjectGroupMembership {
    id: number;
    role: string;
    joined_at: string;
    subject_group: {
        id: number;
        name: string;
    };
}

interface AdvisingClass {
    id: number;
    grade: string;
    name: string;
}

interface TeachingAssignment {
    id: number;
    subject: {
        id: number;
        name: string;
        code: string;
    };
}

interface Teacher {
    id: number;
    name: string;
    username: string;
    role: string;
    create_at: string;
    update_at: string;
    subjectMembership?: SubjectGroupMembership;
    advisingClasses?: AdvisingClass[];
    teachingAssignments?: TeachingAssignment[];
}

interface TeacherListProps {
    teachers: Teacher[];
    onUpdate: () => void;
}

export default function TeacherList({ teachers, onUpdate }: TeacherListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [page, setPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSubjectGroupModalOpen, setIsSubjectGroupModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const rowsPerPage = 10;

    const filteredTeachers = useMemo(() => {
        let filtered = teachers;

        if (searchTerm) {
            filtered = filtered.filter(teacher =>
                teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (roleFilter) {
            filtered = filtered.filter(teacher => teacher.role === roleFilter);
        }

        return filtered;
    }, [teachers, searchTerm, roleFilter]);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleRoleFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string;
        setRoleFilter(selectedKey || '');
        setPage(1);
    };

    const paginatedTeachers = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredTeachers.slice(start, end);
    }, [filteredTeachers, page]);

    const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);

    const handleEditTeacher = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsEditModalOpen(true);
    };

    const handleManageSubjectGroup = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsSubjectGroupModalOpen(true);
    };

    const handleDeleteTeacher = async (teacher: Teacher) => {
        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบครู<br><strong>"${teacher.name}"</strong><br>Username: ${teacher.username} หรือไม่?`,
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
            setIsDeleting(teacher.id);

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

            const response = await axios.delete(`/api/admin/teachers/${teacher.id}`);

            if (response.data.status === 200) {
                await Swal.fire({
                    title: 'สำเร็จ!',
                    text: `ลบครู ${teacher.name} สำเร็จ`,
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
                    text: response.data.message || "ไม่สามารถลบครูได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });
            }
        } catch (error: any) {
            console.error("Error deleting teacher:", error);
            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบครู",
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
        setSelectedTeacher(null);
        onUpdate();
    };

    const handleSubjectGroupSuccess = () => {
        setIsSubjectGroupModalOpen(false);
        setSelectedTeacher(null);
        onUpdate();
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'danger';
            case 'teacher': return 'primary';
            default: return 'default';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin': return <Shield className="w-3 h-3" />;
            case 'teacher': return <User className="w-3 h-3" />;
            default: return <User className="w-3 h-3" />;
        }
    };

    const getRoleLabel = (role: string) => {
        switch (role) {
            case 'admin': return 'ผู้ดูแลระบบ';
            case 'teacher': return 'ครู';
            default: return role;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const clearFilters = () => {
        setSearchTerm("");
        setRoleFilter("");
        setPage(1);
    };

    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-2 rounded-lg">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">บุคลากร</h2>
                                <p className="text-sm text-gray-600">
                                    ทั้งหมด {teachers.length} คน
                                    {(searchTerm || roleFilter) && ` • พบ ${filteredTeachers.length} คน`}
                                </p>
                            </div>
                        </div>

                        <Button
                            color="primary"
                            startContent={<Plus className="w-4 h-4" />}
                            onPress={() => setIsAddModalOpen(true)}
                            className="bg-gradient-to-r from-indigo-500 to-indigo-600"
                        >
                            เพิ่มบุคลากร
                        </Button>
                    </div>
                </CardHeader>

                <CardBody>
                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Input
                            placeholder="ค้นหาบุคลากร (ชื่อ หรือ Username)"
                            value={searchTerm}
                            onValueChange={handleSearchChange}
                            startContent={<Search className="w-4 h-4 text-gray-400" />}
                            classNames={{
                                input: "text-sm",
                                inputWrapper: "border-gray-300"
                            }}
                        />

                        <Select
                            placeholder="ตำแหน่ง"
                            selectedKeys={roleFilter ? [roleFilter] : []}
                            onSelectionChange={handleRoleFilterChange}
                            classNames={{
                                trigger: "border-gray-300"
                            }}
                        >
                            <SelectItem key="admin" textValue="ผู้ดูแลระบบ">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-red-500" />
                                    <span>ผู้ดูแลระบบ</span>
                                </div>
                            </SelectItem>
                            <SelectItem key="teacher" textValue="ครู">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-500" />
                                    <span>ครู</span>
                                </div>
                            </SelectItem>
                        </Select>

                        <Button
                            variant="bordered"
                            onPress={clearFilters}
                            disabled={!searchTerm && !roleFilter}
                            className="border-gray-300"
                        >
                            ล้างตัวกรอง
                        </Button>
                    </div>

                    {/* Table */}
                    {filteredTeachers.length > 0 ? (
                        <>
                            <Table
                                aria-label="รายการบุคลากร"
                                classNames={{
                                    wrapper: "shadow-none border border-gray-200 rounded-lg",
                                    th: "bg-gray-50 text-gray-700 font-semibold",
                                    td: "py-4"
                                }}
                            >
                                <TableHeader>
                                    <TableColumn>บุคลากร</TableColumn>
                                    <TableColumn>Username</TableColumn>
                                    <TableColumn>ตำแหน่ง</TableColumn>
                                    <TableColumn>สถานะ</TableColumn>
                                    <TableColumn>วันที่เพิ่ม</TableColumn>
                                    <TableColumn width={100}>จัดการ</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {paginatedTeachers.map((teacher) => (
                                        <TableRow key={teacher.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        name={teacher.name.charAt(0)}
                                                        size="sm"
                                                        className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-800">{teacher.name}</p>
                                                        <p className="text-xs text-gray-500">ID: {teacher.id}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="flat"
                                                    color="default"
                                                    size="sm"
                                                    className="font-mono"
                                                >
                                                    {teacher.username}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="flat"
                                                    color={getRoleColor(teacher.role)}
                                                    size="sm"
                                                    startContent={getRoleIcon(teacher.role)}
                                                >
                                                    {getRoleLabel(teacher.role)}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    {/* กลุ่มสาระ */}
                                                    {teacher.subjectMembership ? (
                                                        <Chip 
                                                            size="sm" 
                                                            variant="flat" 
                                                            color={teacher.subjectMembership.role === 'header' ? 'success' : 'primary'}
                                                            startContent={<BookOpen className="w-3 h-3" />}
                                                        >
                                                            {teacher.subjectMembership.role === 'header' ? 'หัวหน้า' : 'สมาชิก'}: {teacher.subjectMembership.subject_group.name}
                                                        </Chip>
                                                    ) : (
                                                        <Chip 
                                                            size="sm" 
                                                            variant="flat" 
                                                            color="default"
                                                            startContent={<BookOpen className="w-3 h-3" />}
                                                        >
                                                            ไม่ได้เป็นสมาชิกกลุ่มสาระ
                                                        </Chip>
                                                    )}
                                                    
                                                    {/* สถานะอื่นๆ */}
                                                    <div className="flex flex-wrap gap-1">
                                                        {teacher.advisingClasses && teacher.advisingClasses.length > 0 && (
                                                            <Chip size="sm" variant="flat" color="primary">
                                                                ครูที่ปรึกษา {teacher.advisingClasses.length} ห้อง
                                                            </Chip>
                                                        )}
                                                        {teacher.teachingAssignments && teacher.teachingAssignments.length > 0 && (
                                                            <Chip size="sm" variant="flat" color="secondary">
                                                                สอน {teacher.teachingAssignments.length} วิชา
                                                            </Chip>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-sm text-gray-600">
                                                    {formatDate(teacher.create_at)}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            isIconOnly
                                                            isDisabled={isDeleting === teacher.id}
                                                        >
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Teacher actions">
                                                        <DropdownItem
                                                            key="manage-group"
                                                            startContent={<BookOpen className="w-4 h-4" />}
                                                            onPress={() => handleManageSubjectGroup(teacher)}
                                                        >
                                                            จัดการกลุ่มสาระ
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="edit"
                                                            startContent={<Edit className="w-4 h-4" />}
                                                            onPress={() => handleEditTeacher(teacher)}
                                                        >
                                                            แก้ไขข้อมูล
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="delete"
                                                            className="text-danger"
                                                            color="danger"
                                                            startContent={<Trash2 className="w-4 h-4" />}
                                                            onPress={() => handleDeleteTeacher(teacher)}
                                                        >
                                                            ลบบุคลากร
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
                                            cursor: "bg-indigo-500 text-white"
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                {searchTerm || roleFilter ? (
                                    <Search className="w-8 h-8 text-gray-400" />
                                ) : (
                                    <Users className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                {searchTerm || roleFilter ? "ไม่พบบุคลากรที่ค้นหา" : "ยังไม่มีบุคลากรในระบบ"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || roleFilter ? (
                                    "ลองปรับเปลี่ยนเงื่อนไขการค้นหา"
                                ) : (
                                    "เริ่มต้นโดยการเพิ่มบุคลากรคนแรก"
                                )}
                            </p>
                            {(searchTerm || roleFilter) ? (
                                <Button
                                    variant="bordered"
                                    onPress={clearFilters}
                                    className="border-gray-300"
                                >
                                    ล้างตัวกรอง
                                </Button>
                            ) : (
                                <Button
                                    color="primary"
                                    startContent={<Plus className="w-4 h-4" />}
                                    onPress={() => setIsAddModalOpen(true)}
                                    className="bg-gradient-to-r from-indigo-500 to-indigo-600"
                                >
                                    เพิ่มบุคลากรคนแรก
                                </Button>
                            )}
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Modals */}
            <AddTeacherModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddSuccess}
            />

            {selectedTeacher && (
                <EditTeacherModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedTeacher(null);
                    }}
                    onSuccess={handleEditSuccess}
                    teacher={selectedTeacher}
                />
            )}

            {selectedTeacher && (
                <ManageSubjectGroupModal
                    isOpen={isSubjectGroupModalOpen}
                    onClose={() => {
                        setIsSubjectGroupModalOpen(false);
                        setSelectedTeacher(null);
                    }}
                    onSuccess={handleSubjectGroupSuccess}
                    teacher={selectedTeacher}
                    currentMembership={selectedTeacher.subjectMembership}
                />
            )}
        </>
    );
}