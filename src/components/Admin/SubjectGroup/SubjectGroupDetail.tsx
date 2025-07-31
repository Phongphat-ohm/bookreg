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
    Pagination,
    addToast
} from "@heroui/react";
import { useState, useMemo } from "react";
import { Book, Search, Plus, MoreVertical, Edit, Trash2, User, Hash, Users } from "lucide-react";
import AddSubjectModal from "./AddSubjectModal";
import EditSubjectModal from "./EditSubjectModal";
import TeachersInGroup from "./TeachersInGroup";
import AddMemberModal from "./AddMemberModal";
import axios from "axios";
import Swal from "sweetalert2";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface Class {
    id: number;
    grade: string;
    name: string;
}

interface TeachingAssignment {
    id: number;
    teacher: {
        id: number;
        name: string;
        username: string;
    };
    class: Class;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    grade: string;
    description?: string;
    teachingAssignments: TeachingAssignment[];
}

interface SubjectGroupMember {
    id: number;
    role: string;
    joined_at: string;
    teacher: Teacher;
}

interface SubjectGroupData {
    id: number;
    name: string;
    members: SubjectGroupMember[];
    subjects: Subject[];
}

interface SubjectGroupDetailProps {
    subjectGroupData: SubjectGroupData;
    onUpdate: () => void;
}

export default function SubjectGroupDetail({ subjectGroupData, onUpdate }: SubjectGroupDetailProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const rowsPerPage = 10;

    const filteredSubjects = useMemo(() => {
        if (!searchTerm) return subjectGroupData.subjects;

        return subjectGroupData.subjects.filter(subject =>
            subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.grade.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [subjectGroupData.subjects, searchTerm]);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1);
    };

    const paginatedSubjects = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredSubjects.slice(start, end);
    }, [filteredSubjects, page]);

    const totalPages = Math.ceil(filteredSubjects.length / rowsPerPage);

    const handleEditSubject = (subject: Subject) => {
        setSelectedSubject(subject);
        setIsEditModalOpen(true);
    };

    const handleDeleteSubject = async (subject: Subject) => {
        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบวิชา<br><strong>"${subject.name}"</strong><br>รหัสวิชา: ${subject.code} หรือไม่?`,
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
            setIsDeleting(subject.id);

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

            const response = await axios.delete(`/api/admin/subjects/${subject.id}`);

            if (response.data.status === 200) {
                await Swal.fire({
                    title: 'สำเร็จ!',
                    text: `ลบวิชา ${subject.name} สำเร็จ`,
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
                    text: response.data.message || "ไม่สามารถลบวิชาได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });
            }
        } catch (error: any) {
            console.error("Error deleting subject:", error);
            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบวิชา",
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
        setSelectedSubject(null);
        onUpdate();
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('ป.')) return 'primary';
        if (grade.startsWith('ม.')) return 'secondary';
        return 'default';
    };

    return (
        <>
            <div className="space-y-6">
                {/* Teachers in Group */}
                <TeachersInGroup
                    subjectGroupData={subjectGroupData}
                    onUpdate={onUpdate}
                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Group Info Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                                        <Book className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">ข้อมูลกลุ่มสาระ</h3>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">ชื่อกลุ่มสาระ</p>
                                        <p className="font-medium text-gray-800">{subjectGroupData.name}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">หัวหน้ากลุ่มสาระ</p>
                                        {(() => {
                                            const header = subjectGroupData.members.find(member => member.role === 'header');
                                            if (header) {
                                                return (
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        <div>
                                                            <p className="font-medium text-gray-800">{header.teacher.name}</p>
                                                            <p className="text-xs text-gray-500">@{header.teacher.username}</p>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        <div>
                                                            <p className="font-medium text-gray-600">ไม่มีหัวหน้า</p>
                                                            <p className="text-xs text-gray-500">ต้องมอบหมายหัวหน้า</p>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })()}
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">จำนวนวิชา</p>
                                        <div className="flex items-center gap-2">
                                            <Book className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-800">{subjectGroupData.subjects.length} วิชา</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm text-gray-600">จำนวนสมาชิก</p>
                                            <Button
                                                size="sm"
                                                color="primary"
                                                variant="flat"
                                                startContent={<Plus className="w-3 h-3" />}
                                                onPress={() => setIsAddMemberModalOpen(true)}
                                                className="text-xs"
                                            >
                                                เพิ่มสมาชิก
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-800">{subjectGroupData.members.length} คน</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">จำนวนครูที่สอน</p>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-800">
                                                {(() => {
                                                    const teacherIds = new Set<number>();
                                                    // เพิ่มสมาชิกกลุ่มสาระ
                                                    subjectGroupData.members.forEach(member => {
                                                        teacherIds.add(member.teacher.id);
                                                    });
                                                    // เพิ่มครูที่สอนวิชาในกลุ่มสาระ
                                                    subjectGroupData.subjects.forEach(subject => {
                                                        (subject.teachingAssignments || []).forEach(assignment => {
                                                            teacherIds.add(assignment.teacher.id);
                                                        });
                                                    });
                                                    return teacherIds.size;
                                                })()} คน
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Subjects List */}
                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                                            <Book className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">รายการวิชา</h3>
                                            <p className="text-sm text-gray-600">
                                                ทั้งหมด {subjectGroupData.subjects.length} วิชา
                                                {searchTerm && ` • พบ ${filteredSubjects.length} วิชา`}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        color="primary"
                                        startContent={<Plus className="w-4 h-4" />}
                                        onPress={() => setIsAddModalOpen(true)}
                                        className="bg-gradient-to-r from-green-500 to-green-600"
                                    >
                                        เพิ่มวิชา
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardBody>
                                {/* Search */}
                                <div className="mb-4">
                                    <Input
                                        placeholder="ค้นหาวิชา (ชื่อวิชา รหัสวิชา หรือ ระดับชั้น)"
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
                                {filteredSubjects.length > 0 ? (
                                    <>
                                        <Table
                                            aria-label="รายการวิชา"
                                            classNames={{
                                                wrapper: "shadow-none border border-gray-200 rounded-lg",
                                                th: "bg-gray-50 text-gray-700 font-semibold",
                                                td: "py-4"
                                            }}
                                        >
                                            <TableHeader>
                                                <TableColumn>วิชา</TableColumn>
                                                <TableColumn>รหัสวิชา</TableColumn>
                                                <TableColumn>ระดับชั้น</TableColumn>
                                                <TableColumn width={100}>จัดการ</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {paginatedSubjects.map((subject) => (
                                                    <TableRow key={subject.id}>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <div className="bg-gradient-to-r from-blue-400 to-green-400 p-2 rounded-lg">
                                                                    <Book className="w-4 h-4 text-white" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-800">{subject.name}</p>
                                                                    {subject.description && (
                                                                        <p className="text-xs text-gray-500 line-clamp-1">
                                                                            {subject.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Hash className="w-3 h-3 text-gray-400" />
                                                                <Chip
                                                                    variant="flat"
                                                                    color="default"
                                                                    size="sm"
                                                                    className="font-mono"
                                                                >
                                                                    {subject.code}
                                                                </Chip>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                variant="flat"
                                                                color={getGradeColor(subject.grade)}
                                                                size="sm"
                                                            >
                                                                มัธยมศึกษาปีที่ {subject.grade}
                                                            </Chip>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Dropdown>
                                                                <DropdownTrigger>
                                                                    <Button
                                                                        variant="light"
                                                                        size="sm"
                                                                        isIconOnly
                                                                        isDisabled={isDeleting === subject.id}
                                                                    >
                                                                        <MoreVertical className="w-4 h-4" />
                                                                    </Button>
                                                                </DropdownTrigger>
                                                                <DropdownMenu aria-label="Subject actions">
                                                                    <DropdownItem
                                                                        key="edit"
                                                                        startContent={<Edit className="w-4 h-4" />}
                                                                        onPress={() => handleEditSubject(subject)}
                                                                    >
                                                                        แก้ไขข้อมูล
                                                                    </DropdownItem>
                                                                    <DropdownItem
                                                                        key="delete"
                                                                        className="text-danger"
                                                                        color="danger"
                                                                        startContent={<Trash2 className="w-4 h-4" />}
                                                                        onPress={() => handleDeleteSubject(subject)}
                                                                    >
                                                                        ลบวิชา
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
                                                        cursor: "bg-green-500 text-white"
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
                                                <Book className="w-8 h-8 text-gray-400" />
                                            )}
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                                            {searchTerm ? "ไม่พบวิชาที่ค้นหา" : "ยังไม่มีวิชาในกลุ่มสาระนี้"}
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            {searchTerm ? (
                                                <>ไม่พบวิชาที่ตรงกับคำค้นหา "<span className="font-medium">{searchTerm}</span>"</>
                                            ) : (
                                                "เริ่มต้นโดยการเพิ่มวิชาแรกในกลุ่มสาระนี้"
                                            )}
                                        </p>
                                        {!searchTerm && (
                                            <Button
                                                color="primary"
                                                startContent={<Plus className="w-4 h-4" />}
                                                onPress={() => setIsAddModalOpen(true)}
                                                className="bg-gradient-to-r from-green-500 to-green-600"
                                            >
                                                เพิ่มวิชาแรก
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddSubjectModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddSuccess}
                subjectGroupId={subjectGroupData.id}
            />

            {selectedSubject && (
                <EditSubjectModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedSubject(null);
                    }}
                    onSuccess={handleEditSuccess}
                    subject={selectedSubject}
                    subjectGroupId={subjectGroupData.id}
                />
            )}

            <AddMemberModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                onSuccess={() => {
                    setIsAddMemberModalOpen(false);
                    onUpdate();
                }}
                subjectGroup={{
                    id: subjectGroupData.id,
                    name: subjectGroupData.name
                }}
            />
        </>
    );
}