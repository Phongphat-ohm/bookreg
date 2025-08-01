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
    Select,
    SelectItem,
    addToast
} from "@heroui/react";
import { useState, useMemo } from "react";
import { Book, Search, MoreVertical, Edit, Trash2, Hash, Users } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface SubjectGroup {
    id: number;
    name: string;
    Teacher: Teacher;
}

interface Subject {
    id: number;
    code: string;
    name: string;
    grade: string;
    description?: string;
    SubjectGroup: SubjectGroup;
}

interface SubjectListProps {
    subjects: Subject[];
    onUpdate: () => void;
}

export default function SubjectList({ subjects, onUpdate }: SubjectListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [gradeFilter, setGradeFilter] = useState("");
    const [groupFilter, setGroupFilter] = useState("");
    const [page, setPage] = useState(1);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const rowsPerPage = 15;

    // Get unique values for filters
    const uniqueGrades = useMemo(() => {
        const grades = [...new Set(subjects.map(subject => subject.grade))];
        return grades.sort();
    }, [subjects]);

    const uniqueGroups = useMemo(() => {
        const groups = [...new Set(subjects.map(subject => subject.SubjectGroup.name))];
        return groups.sort();
    }, [subjects]);

    const filteredSubjects = useMemo(() => {
        let filtered = subjects;

        if (searchTerm) {
            filtered = filtered.filter(subject =>
                subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                subject.SubjectGroup.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (gradeFilter) {
            filtered = filtered.filter(subject => subject.grade === gradeFilter);
        }

        if (groupFilter) {
            filtered = filtered.filter(subject => subject.SubjectGroup.name === groupFilter);
        }

        return filtered;
    }, [subjects, searchTerm, gradeFilter, groupFilter]);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleGradeFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string;
        setGradeFilter(selectedKey || '');
        setPage(1);
    };

    const handleGroupFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string;
        setGroupFilter(selectedKey || '');
        setPage(1);
    };

    const paginatedSubjects = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredSubjects.slice(start, end);
    }, [filteredSubjects, page]);

    const totalPages = Math.ceil(filteredSubjects.length / rowsPerPage);

    const handleDeleteSubject = async (subject: Subject) => {
        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบวิชา<br><strong>"${subject.name}"</strong><br>รหัสวิชา: ${subject.code}<br>กลุ่มสาระ: ${subject.SubjectGroup.name} หรือไม่?`,
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

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('ป.')) return 'primary';
        if (grade.startsWith('ม.')) return 'secondary';
        return 'default';
    };

    const clearFilters = () => {
        setSearchTerm("");
        setGradeFilter("");
        setGroupFilter("");
        setPage(1);
    };

    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                            <Book className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">รายการวิชาทั้งหมด</h2>
                            <p className="text-sm text-gray-600">
                                ทั้งหมด {subjects.length} วิชา
                                {(searchTerm || gradeFilter || groupFilter) && ` • พบ ${filteredSubjects.length} วิชา`}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardBody>
                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <Input
                            placeholder="ค้นหาวิชา (ชื่อวิชา รหัสวิชา หรือ กลุ่มสาระ)"
                            value={searchTerm}
                            onValueChange={handleSearchChange}
                            startContent={<Search className="w-4 h-4 text-gray-400" />}
                            classNames={{
                                input: "text-sm",
                                inputWrapper: "border-gray-300"
                            }}
                        />

                        <Select
                            placeholder="ระดับชั้น"
                            selectedKeys={gradeFilter ? [gradeFilter] : []}
                            onSelectionChange={handleGradeFilterChange}
                            classNames={{
                                trigger: "border-gray-300"
                            }}
                        >
                            {uniqueGrades.map((grade) => (
                                <SelectItem key={grade} textValue={grade}>
                                    {grade}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            placeholder="กลุ่มสาระ"
                            selectedKeys={groupFilter ? [groupFilter] : []}
                            onSelectionChange={handleGroupFilterChange}
                            classNames={{
                                trigger: "border-gray-300"
                            }}
                        >
                            {uniqueGroups.map((group) => (
                                <SelectItem key={group} textValue={group}>
                                    {group}
                                </SelectItem>
                            ))}
                        </Select>

                        <Button
                            variant="bordered"
                            onPress={clearFilters}
                            disabled={!searchTerm && !gradeFilter && !groupFilter}
                            className="border-gray-300"
                        >
                            ล้างตัวกรอง
                        </Button>
                    </div>

                    {/* Table */}
                    {filteredSubjects.length > 0 ? (
                        <>
                            <Table
                                aria-label="รายการวิชาทั้งหมด"
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
                                    <TableColumn>กลุ่มสาระ</TableColumn>
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
                                                    {subject.grade}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-3 h-3 text-gray-400" />
                                                    <div>
                                                        <p className="font-medium text-gray-800 text-sm">{subject.SubjectGroup.name}</p>
                                                        <p className="text-xs text-gray-500">หัวหน้า: {subject.SubjectGroup.members?.[0]?.teacher?.name || 'ไม่มีหัวหน้า'}</p>
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
                                                            isDisabled={isDeleting === subject.id}
                                                        >
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Subject actions">
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
                                            cursor: "bg-blue-500 text-white"
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                {searchTerm || gradeFilter || groupFilter ? (
                                    <Search className="w-8 h-8 text-gray-400" />
                                ) : (
                                    <Book className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                {searchTerm || gradeFilter || groupFilter ? "ไม่พบวิชาที่ค้นหา" : "ยังไม่มีวิชาในระบบ"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || gradeFilter || groupFilter ? (
                                    "ลองปรับเปลี่ยนเงื่อนไขการค้นหา"
                                ) : (
                                    "เพิ่มวิชาผ่านหน้ากลุ่มสาระการเรียนรู้"
                                )}
                            </p>
                            {(searchTerm || gradeFilter || groupFilter) && (
                                <Button
                                    variant="bordered"
                                    onPress={clearFilters}
                                    className="border-gray-300"
                                >
                                    ล้างตัวกรอง
                                </Button>
                            )}
                        </div>
                    )}
                </CardBody>
            </Card>
        </>
    );
}