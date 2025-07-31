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
    Checkbox,
    addToast
} from "@heroui/react";
import { useState, useMemo } from "react";
import { Users, Search, Plus, MoreVertical, Edit, Trash2, UserPlus, Upload, Download } from "lucide-react";
import EditStudentModal from "./EditStudentModal";
import AddStudentModal from "./AddStudentModal";
import ImportStudentsModal from "./ImportStudentsModal";
import ExportStudentsModal from "./ExportStudentsModal";
import axios from "axios";
import Swal from "sweetalert2";

interface Student {
    id: number;
    name: string;
    stu_code: string;
    create_at: string;
}

interface StudentListProps {
    classId: number;
    students: Student[];
    onUpdate: () => void;
    className?: string;
}

export default function StudentList({ classId, students, onUpdate, className }: StudentListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [selectedStudents, setSelectedStudents] = useState<Set<number>>(new Set());
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [exportType, setExportType] = useState<'all' | 'selected'>('all');

    const rowsPerPage = 10;

    const filteredStudents = useMemo(() => {
        if (!searchTerm) return students;

        return students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.stu_code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [students, searchTerm]);

    // Clear selection when search changes
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setSelectedStudents(new Set());
        setPage(1);
    };

    // Clear selection when page changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setSelectedStudents(new Set());
    };

    const paginatedStudents = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredStudents.slice(start, end);
    }, [filteredStudents, page]);

    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

    const handleEditStudent = (student: Student) => {
        setSelectedStudent(student);
        setIsEditModalOpen(true);
    };

    const handleDeleteStudent = async (student: Student) => {
        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบนักเรียน<br><strong>"${student.name}"</strong><br>รหัส: ${student.stu_code} หรือไม่?`,
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
            setIsDeleting(student.id);

            // Show loading
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

            const response = await axios.delete(`/api/admin/students/${student.id}`);

            if (response.data.status === 200) {
                await Swal.fire({
                    title: 'สำเร็จ!',
                    text: `ลบนักเรียน ${student.name} สำเร็จ`,
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
                    text: response.data.message || "ไม่สามารถลบนักเรียนได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });
            }
        } catch (error: any) {
            console.error("Error deleting student:", error);
            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบนักเรียน",
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

    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        setSelectedStudent(null);
        setSelectedStudents(new Set());
        onUpdate();
    };

    const handleAddSuccess = () => {
        setIsAddModalOpen(false);
        setSelectedStudents(new Set());
        onUpdate();
    };

    const handleImportSuccess = () => {
        setIsImportModalOpen(false);
        setSelectedStudents(new Set());
        onUpdate();
    };

    const handleSelectStudent = (studentId: number, isSelected: boolean) => {
        const newSelected = new Set(selectedStudents);
        if (isSelected) {
            newSelected.add(studentId);
        } else {
            newSelected.delete(studentId);
        }
        setSelectedStudents(newSelected);
    };

    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            const allIds = new Set(paginatedStudents.map(student => student.id));
            setSelectedStudents(allIds);
        } else {
            setSelectedStudents(new Set());
        }
    };

    const handleBulkDelete = async () => {
        if (selectedStudents.size === 0) return;

        const selectedStudentsList = paginatedStudents.filter(student => selectedStudents.has(student.id));
        const studentNames = selectedStudentsList.map(student => student.name).join(', ');

        const confirmAlert = await Swal.fire({
            title: "ยืนยันการลบ",
            html: `คุณต้องการลบนักเรียน ${selectedStudents.size} คนหรือไม่?<br><br><strong>รายชื่อ:</strong><br>${studentNames}`,
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "ลบทั้งหมด",
            cancelButtonText: "ยกเลิก",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            customClass: {
                popup: 'rounded-lg',
                title: 'text-lg font-semibold',
                htmlContainer: 'text-sm',
                confirmButton: 'rounded-lg px-4 py-2 font-medium',
                cancelButton: 'rounded-lg px-4 py-2 font-medium'
            }
        });

        if (!confirmAlert.isConfirmed) {
            return;
        }

        // Show loading alert
        Swal.fire({
            title: 'กำลังลบนักเรียน...',
            html: `กำลังดำเนินการลบ ${selectedStudents.size} คน<br>กรุณารอสักครู่`,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setIsBulkDeleting(true);

        try {
            const studentIds = Array.from(selectedStudents);
            const response = await axios.delete('/api/admin/students/bulk-delete', {
                data: { studentIds }
            });

            if (response.data.status === 200) {
                const result = response.data.data;

                // Close loading alert
                Swal.close();

                if (result.failed > 0) {
                    // Show detailed results if there are failures
                    const errorList = result.errors.map((error: any) =>
                        `• ${error.name}: ${error.error}`
                    ).join('<br>');

                    await Swal.fire({
                        title: 'ผลการลบนักเรียน',
                        html: `
                            <div class="text-left">
                                <p><strong>สำเร็จ:</strong> ${result.success} คน</p>
                                <p><strong>ล้มเหลว:</strong> ${result.failed} คน</p>
                                ${result.failed > 0 ? `<br><strong>รายละเอียดข้อผิดพลาด:</strong><br>${errorList}` : ''}
                            </div>
                        `,
                        icon: result.success > 0 ? 'warning' : 'error',
                        confirmButtonText: 'ตกลง',
                        customClass: {
                            popup: 'rounded-lg',
                            confirmButton: 'rounded-lg px-4 py-2 font-medium'
                        }
                    });
                } else {
                    // Show success message
                    await Swal.fire({
                        title: 'สำเร็จ!',
                        text: `ลบนักเรียนสำเร็จทั้งหมด ${result.success} คน`,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'rounded-lg'
                        }
                    });
                }

                if (result.success > 0) {
                    addToast({
                        color: "success",
                        title: "สำเร็จ",
                        description: `ลบนักเรียนสำเร็จ ${result.success} คน${result.failed > 0 ? ` (ล้มเหลว ${result.failed} คน)` : ''}`
                    });
                    onUpdate();
                }
            } else {
                Swal.close();
                await Swal.fire({
                    title: 'ผิดพลาด!',
                    text: response.data.message || "ไม่สามารถลบนักเรียนได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });
            }
        } catch (error: any) {
            console.error("Error bulk deleting students:", error);
            Swal.close();
            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบนักเรียน",
                icon: 'error',
                confirmButtonText: 'ตกลง',
                customClass: {
                    popup: 'rounded-lg',
                    confirmButton: 'rounded-lg px-4 py-2 font-medium'
                }
            });
        } finally {
            setIsBulkDeleting(false);
            setSelectedStudents(new Set());
        }
    };

    const handleExportAll = () => {
        if (filteredStudents.length === 0) {
            addToast({
                color: "warning",
                title: "ไม่มีข้อมูล",
                description: "ไม่มีข้อมูลนักเรียนสำหรับการ export"
            });
            return;
        }

        setExportType('all');
        setIsExportModalOpen(true);
    };

    const handleExportSelected = () => {
        if (selectedStudents.size === 0) {
            addToast({
                color: "warning",
                title: "ไม่ได้เลือกข้อมูล",
                description: "กรุณาเลือกนักเรียนที่ต้องการ export"
            });
            return;
        }

        setExportType('selected');
        setIsExportModalOpen(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">รายชื่อนักเรียน</h2>
                                <p className="text-sm text-gray-600">
                                    ทั้งหมด {students.length} คน
                                    {searchTerm && ` • พบ ${filteredStudents.length} คน`}
                                    {selectedStudents.size > 0 && (
                                        <span className="text-blue-600 font-medium">
                                            {' • เลือกแล้ว '}{selectedStudents.size} คน
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {selectedStudents.size > 0 && (
                                <>
                                    <Button
                                        variant="bordered"
                                        startContent={<Download className="w-4 h-4" />}
                                        onPress={handleExportSelected}
                                        disabled={isBulkDeleting}
                                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                    >
                                        Export ที่เลือก ({selectedStudents.size})
                                    </Button>
                                    <Button
                                        color="danger"
                                        variant="bordered"
                                        startContent={!isBulkDeleting && <Trash2 className="w-4 h-4" />}
                                        onPress={handleBulkDelete}
                                        isLoading={isBulkDeleting}
                                        disabled={isBulkDeleting}
                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                        {isBulkDeleting ? 'กำลังลบ...' : `ลบที่เลือก (${selectedStudents.size})`}
                                    </Button>
                                </>
                            )}
                            <Button
                                variant="bordered"
                                startContent={<Download className="w-4 h-4" />}
                                onPress={handleExportAll}
                                disabled={isBulkDeleting || filteredStudents.length === 0}
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                                Export Excel
                            </Button>
                            <Button
                                variant="bordered"
                                startContent={<Upload className="w-4 h-4" />}
                                onPress={() => setIsImportModalOpen(true)}
                                disabled={isBulkDeleting}
                                className="border-green-300 text-green-600 hover:bg-green-50"
                            >
                                นำเข้า CSV
                            </Button>
                            <Button
                                color="primary"
                                startContent={<Plus className="w-4 h-4" />}
                                onPress={() => setIsAddModalOpen(true)}
                                disabled={isBulkDeleting}
                                className="bg-gradient-to-r from-green-500 to-green-600"
                            >
                                เพิ่มนักเรียน
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardBody>
                    {/* Search */}
                    <div className="mb-4">
                        <Input
                            placeholder="ค้นหานักเรียน (ชื่อ หรือ รหัสนักเรียน)"
                            value={searchTerm}
                            onValueChange={handleSearchChange}
                            startContent={<Search className="w-4 h-4 text-gray-400" />}
                            disabled={isBulkDeleting}
                            classNames={{
                                input: "text-sm",
                                inputWrapper: "border-gray-300"
                            }}
                        />
                    </div>

                    {/* Table */}
                    {filteredStudents.length > 0 ? (
                        <>
                            <Table
                                aria-label="รายชื่อนักเรียน"
                                classNames={{
                                    wrapper: "shadow-none border border-gray-200 rounded-lg",
                                    th: "bg-gray-50 text-gray-700 font-semibold",
                                    td: "py-4"
                                }}
                            >
                                <TableHeader>
                                    <TableColumn width={50}>
                                        <Checkbox
                                            isSelected={paginatedStudents.length > 0 && paginatedStudents.every(student => selectedStudents.has(student.id))}
                                            isIndeterminate={paginatedStudents.some(student => selectedStudents.has(student.id)) && !paginatedStudents.every(student => selectedStudents.has(student.id))}
                                            onValueChange={handleSelectAll}
                                            disabled={isBulkDeleting}
                                            aria-label="เลือกทั้งหมด"
                                        />
                                    </TableColumn>
                                    <TableColumn>นักเรียน</TableColumn>
                                    <TableColumn>รหัสนักเรียน</TableColumn>
                                    <TableColumn>วันที่เพิ่ม</TableColumn>
                                    <TableColumn width={100}>จัดการ</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {paginatedStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <Checkbox
                                                    isSelected={selectedStudents.has(student.id)}
                                                    onValueChange={(isSelected) => handleSelectStudent(student.id, isSelected)}
                                                    disabled={isBulkDeleting}
                                                    aria-label={`เลือก ${student.name}`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        name={student.name.charAt(0)}
                                                        size="sm"
                                                        className="bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-800">{student.name}</p>
                                                        <p className="text-xs text-gray-500">ID: {student.id}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="flat"
                                                    color="primary"
                                                    size="sm"
                                                    className="font-mono"
                                                >
                                                    {student.stu_code}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-sm text-gray-600">
                                                    {formatDate(student.create_at)}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            isIconOnly
                                                            isDisabled={isDeleting === student.id || isBulkDeleting}
                                                        >
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Student actions">
                                                        <DropdownItem
                                                            key="edit"
                                                            startContent={<Edit className="w-4 h-4" />}
                                                            onPress={() => handleEditStudent(student)}
                                                        >
                                                            แก้ไขข้อมูล
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="delete"
                                                            className="text-danger"
                                                            color="danger"
                                                            startContent={<Trash2 className="w-4 h-4" />}
                                                            onPress={() => handleDeleteStudent(student)}
                                                        >
                                                            ลบนักเรียน
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
                                        onChange={handlePageChange}
                                        showControls
                                        isDisabled={isBulkDeleting}
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
                                {searchTerm ? (
                                    <Search className="w-8 h-8 text-gray-400" />
                                ) : (
                                    <UserPlus className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                {searchTerm ? "ไม่พบนักเรียนที่ค้นหา" : "ยังไม่มีนักเรียนในห้องนี้"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm ? (
                                    <>ไม่พบนักเรียนที่ตรงกับคำค้นหา "<span className="font-medium">{searchTerm}</span>"</>
                                ) : (
                                    "เริ่มต้นโดยการเพิ่มนักเรียนคนแรกในห้องเรียนนี้"
                                )}
                            </p>
                            {!searchTerm && (
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        variant="bordered"
                                        startContent={<Upload className="w-4 h-4" />}
                                        onPress={() => setIsImportModalOpen(true)}
                                        disabled={isBulkDeleting}
                                        className="border-green-300 text-green-600 hover:bg-green-50"
                                    >
                                        นำเข้าจาก CSV
                                    </Button>
                                    <Button
                                        color="primary"
                                        startContent={<Plus className="w-4 h-4" />}
                                        onPress={() => setIsAddModalOpen(true)}
                                        disabled={isBulkDeleting}
                                        className="bg-gradient-to-r from-green-500 to-green-600"
                                    >
                                        เพิ่มนักเรียนคนแรก
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Modals */}
            {selectedStudent && (
                <EditStudentModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedStudent(null);
                    }}
                    onSuccess={handleEditSuccess}
                    student={selectedStudent}
                />
            )}

            <AddStudentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddSuccess}
                classId={classId}
            />

            <ImportStudentsModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onSuccess={handleImportSuccess}
                classId={classId}
            />

            <ExportStudentsModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                students={filteredStudents}
                selectedStudents={exportType === 'selected' ? selectedStudents : undefined}
                className={className}
            />
        </>
    );
}