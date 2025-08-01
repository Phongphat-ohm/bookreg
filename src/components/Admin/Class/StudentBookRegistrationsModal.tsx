"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Input,
    Select,
    SelectItem,
    Pagination,
    Tooltip,
    Spinner,
    addToast
} from "@heroui/react";
import { useState, useEffect, useMemo } from "react";
import { BookOpen, Search, X, Calendar, Trash2, GraduationCap, Users } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

interface Class {
    id: number;
    grade: string;
    name: string;
}

interface Student {
    id: number;
    name: string;
    stu_code: string;
    class: Class;
}

interface SubjectGroup {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    grade: string;
    SubjectGroup?: SubjectGroup;
}

interface AcademicYear {
    id: number;
    year: string;
}

interface Book {
    id: number;
    barcode: string;
    name: string;
    description: string | null;
    subject: Subject;
    AcademicYear: AcademicYear;
}

interface BookRegistration {
    id: number;
    register_code: string;
    registered_at: string;
    book: Book;
}

interface StudentBookRegistrationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
    studentId: number;
    studentName: string;
}

export default function StudentBookRegistrationsModal({
    isOpen,
    onClose,
    onUpdate,
    studentId,
    studentName
}: StudentBookRegistrationsModalProps) {
    const [student, setStudent] = useState<Student | null>(null);
    const [registrations, setRegistrations] = useState<BookRegistration[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    
    // Filters and pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [subjectGroupFilter, setSubjectGroupFilter] = useState("");
    const [academicYearFilter, setAcademicYearFilter] = useState("");
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const fetchStudentRegistrations = async () => {
        if (!studentId) return;

        try {
            setIsLoading(true);
            const response = await axios.get(`/api/admin/students/${studentId}/book-registrations`);

            if (response.data.status === 200) {
                setStudent(response.data.data.student);
                setRegistrations(response.data.data.registrations);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถดึงข้อมูลการลงทะเบียนได้"
                });
            }
        } catch (error) {
            console.error("Error fetching student registrations:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เกิดข้อผิดพลาดในการดึงข้อมูลการลงทะเบียน"
            });
        } finally {
            setIsLoading(false);
        }
    };

    // สร้างรายการกลุ่มสาระและปีการศึกษาจากการลงทะเบียน
    const availableSubjectGroups = useMemo(() => {
        const groupMap = new Map<number, SubjectGroup>();
        registrations.forEach(reg => {
            if (reg.book.subject.SubjectGroup) {
                groupMap.set(reg.book.subject.SubjectGroup.id, reg.book.subject.SubjectGroup);
            }
        });
        return Array.from(groupMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [registrations]);

    const availableAcademicYears = useMemo(() => {
        const yearMap = new Map<number, AcademicYear>();
        registrations.forEach(reg => {
            yearMap.set(reg.book.AcademicYear.id, reg.book.AcademicYear);
        });
        return Array.from(yearMap.values()).sort((a, b) => b.year.localeCompare(a.year));
    }, [registrations]);

    // กรองข้อมูลการลงทะเบียน
    const filteredRegistrations = useMemo(() => {
        let filtered = registrations;

        // กรองตามคำค้นหา
        if (searchTerm) {
            filtered = filtered.filter(reg =>
                reg.book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reg.book.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reg.book.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reg.book.subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reg.register_code.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // กรองตามกลุ่มสาระ
        if (subjectGroupFilter) {
            filtered = filtered.filter(reg =>
                reg.book.subject.SubjectGroup?.id.toString() === subjectGroupFilter
            );
        }

        // กรองตามปีการศึกษา
        if (academicYearFilter) {
            filtered = filtered.filter(reg =>
                reg.book.AcademicYear.id.toString() === academicYearFilter
            );
        }

        return filtered;
    }, [registrations, searchTerm, subjectGroupFilter, academicYearFilter]);

    // แบ่งหน้า
    const paginatedRegistrations = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredRegistrations.slice(start, end);
    }, [filteredRegistrations, page]);

    const totalPages = Math.ceil(filteredRegistrations.length / rowsPerPage);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleSubjectGroupFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string || "";
        setSubjectGroupFilter(selectedKey);
        setPage(1);
    };

    const handleAcademicYearFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string || "";
        setAcademicYearFilter(selectedKey);
        setPage(1);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSubjectGroupFilter("");
        setAcademicYearFilter("");
        setPage(1);
    };

    const hasFilters = searchTerm || subjectGroupFilter || academicYearFilter;

    const handleDeleteRegistration = async (registration: BookRegistration) => {
        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบการลงทะเบียนหนังสือ<br><strong>"${registration.book.name}"</strong><br>ของ <strong>${studentName}</strong> หรือไม่?`,
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
            setIsDeleting(registration.id);

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

            const response = await axios.delete(`/api/admin/book-registrations?registrationId=${registration.id}`);

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
                fetchStudentRegistrations(); // Refresh data
                onUpdate(); // Update parent component
            } else {
                await Swal.fire({
                    title: 'ผิดพลาด!',
                    text: response.data.message || "ไม่สามารถลบการลงทะเบียนได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });
            }
        } catch (error: any) {
            console.error("Error deleting registration:", error);
            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบการลงทะเบียน",
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getGradeColor = (grade: string) => {
        const gradeNum = parseInt(grade);
        if (gradeNum <= 3) return 'primary';
        return 'secondary';
    };

    // Reset filters when modal opens
    useEffect(() => {
        if (isOpen) {
            setSearchTerm("");
            setSubjectGroupFilter("");
            setAcademicYearFilter("");
            setPage(1);
            fetchStudentRegistrations();
        }
    }, [isOpen, studentId]);

    const handleClose = () => {
        setStudent(null);
        setRegistrations([]);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="5xl"
            scrollBehavior="inside"
            classNames={{
                base: "bg-white",
                header: "border-b border-gray-200",
                footer: "border-t border-gray-200"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">การลงทะเบียนหนังสือ</h2>
                            <p className="text-sm text-gray-600">{studentName}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">จำนวนการลงทะเบียน</p>
                        <p className="text-2xl font-bold text-emerald-600">{registrations.length}</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Spinner size="lg" />
                            <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Student Info */}
                            {student && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">ชื่อนักเรียน</p>
                                            <p className="font-medium">{student.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">รหัสนักเรียน</p>
                                            <p className="font-mono font-medium">{student.stu_code}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">ห้องเรียน</p>
                                            <p className="font-medium">ม.{student.class.grade}/{student.class.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">จำนวนหนังสือ</p>
                                            <p className="font-medium text-emerald-600">{registrations.length} เล่ม</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {registrations.length > 0 ? (
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            รายการหนังสือที่ลงทะเบียน
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            ทั้งหมด {registrations.length} เล่ม
                                            {hasFilters && ` • พบ ${filteredRegistrations.length} เล่ม`}
                                        </p>
                                    </div>

                                    {/* Filters */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        <Input
                                            placeholder="ค้นหา (ชื่อหนังสือ, รหัส, วิชา)"
                                            value={searchTerm}
                                            onValueChange={handleSearchChange}
                                            startContent={<Search className="w-4 h-4 text-gray-400" />}
                                            classNames={{
                                                input: "text-sm",
                                                inputWrapper: "border-gray-300"
                                            }}
                                        />

                                        <Select
                                            placeholder="กลุ่มสาระ"
                                            selectedKeys={subjectGroupFilter ? [subjectGroupFilter] : []}
                                            onSelectionChange={handleSubjectGroupFilterChange}
                                            classNames={{
                                                trigger: "border-gray-300"
                                            }}
                                        >
                                            {availableSubjectGroups.map((group) => (
                                                <SelectItem key={group.id.toString()} textValue={group.name}>
                                                    {group.name}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            placeholder="ปีการศึกษา"
                                            selectedKeys={academicYearFilter ? [academicYearFilter] : []}
                                            onSelectionChange={handleAcademicYearFilterChange}
                                            classNames={{
                                                trigger: "border-gray-300"
                                            }}
                                        >
                                            {availableAcademicYears.map((year) => (
                                                <SelectItem key={year.id.toString()} textValue={year.year}>
                                                    {year.year}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Button
                                            variant="bordered"
                                            onPress={clearFilters}
                                            disabled={!hasFilters}
                                            startContent={<X className="w-4 h-4" />}
                                            className="border-gray-300"
                                        >
                                            ล้างตัวกรอง
                                        </Button>
                                    </div>

                                    {filteredRegistrations.length > 0 ? (
                                        <>
                                            <Table
                                                aria-label="รายการการลงทะเบียนหนังสือ"
                                                classNames={{
                                                    wrapper: "shadow-none border border-gray-200 rounded-lg",
                                                    th: "bg-gray-50 text-gray-700 font-semibold",
                                                    td: "py-4"
                                                }}
                                            >
                                                <TableHeader>
                                                    <TableColumn>หนังสือ</TableColumn>
                                                    <TableColumn>วิชา</TableColumn>
                                                    <TableColumn>กลุ่มสาระ</TableColumn>
                                                    <TableColumn>ปีการศึกษา</TableColumn>
                                                    <TableColumn>รหัสการลงทะเบียน</TableColumn>
                                                    <TableColumn>วันที่ลงทะเบียน</TableColumn>
                                                    <TableColumn width={100}>จัดการ</TableColumn>
                                                </TableHeader>
                                                <TableBody>
                                                    {paginatedRegistrations.map((registration) => (
                                                        <TableRow key={registration.id}>
                                                            <TableCell>
                                                                <div>
                                                                    <p className="font-medium text-gray-800">
                                                                        {registration.book.name}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 font-mono">
                                                                        {registration.book.barcode}
                                                                    </p>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div>
                                                                    <p className="font-medium text-gray-800">
                                                                        {registration.book.subject.code}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {registration.book.subject.name}
                                                                    </p>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {registration.book.subject.SubjectGroup ? (
                                                                    <Chip
                                                                        variant="flat"
                                                                        color="secondary"
                                                                        size="sm"
                                                                    >
                                                                        {registration.book.subject.SubjectGroup.name}
                                                                    </Chip>
                                                                ) : (
                                                                    <span className="text-gray-400 text-sm">ไม่ระบุ</span>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Chip
                                                                    variant="flat"
                                                                    color="primary"
                                                                    size="sm"
                                                                    startContent={<Calendar className="w-3 h-3" />}
                                                                >
                                                                    {registration.book.AcademicYear.year}
                                                                </Chip>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                                    {registration.register_code}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                                    <span className="text-sm text-gray-600">
                                                                        {formatDate(registration.registered_at)}
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Tooltip content="ลบการลงทะเบียน">
                                                                    <Button
                                                                        isIconOnly
                                                                        size="sm"
                                                                        color="danger"
                                                                        variant="light"
                                                                        onPress={() => handleDeleteRegistration(registration)}
                                                                        isLoading={isDeleting === registration.id}
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </Tooltip>
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
                                                            cursor: "bg-emerald-500 text-white"
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                                <Search className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                                ไม่พบข้อมูลที่ค้นหา
                                            </h3>
                                            <p className="text-gray-500 mb-4">
                                                ลองปรับเปลี่ยนเงื่อนไขการค้นหา
                                            </p>
                                            <Button
                                                variant="bordered"
                                                onPress={clearFilters}
                                                className="border-gray-300"
                                            >
                                                ล้างตัวกรอง
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <BookOpen className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                                        ยังไม่มีการลงทะเบียนหนังสือ
                                    </h3>
                                    <p className="text-gray-500">
                                        นักเรียนคนนี้ยังไม่ได้ลงทะเบียนหนังสือเล่มใด
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={handleClose}
                    >
                        ปิด
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}