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
    Avatar,
    Tooltip,
    Input,
    Select,
    SelectItem,
    Pagination,
    addToast
} from "@heroui/react";
import { useState, useMemo, useEffect } from "react";
import { Users, Trash2, Calendar, User, GraduationCap, Search, X } from "lucide-react";
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

interface Registration {
    id: number;
    register_code: string;
    registered_at: string;
    student: Student;
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
    registrations: Registration[];
    registrationCount: number;
    isRegistered: boolean;
    create_at: string;
    update_at: string;
}

interface BookRegistrationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
    book: Book;
}

export default function BookRegistrationsModal({
    isOpen,
    onClose,
    onUpdate,
    book
}: BookRegistrationsModalProps) {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("");
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const handleDeleteRegistration = async (registration: Registration) => {
        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบการลงทะเบียนหนังสือ<br><strong>"${book.name}"</strong><br>ของ <strong>${registration.student.name}</strong> หรือไม่?`,
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
                onUpdate();
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

    // สร้างรายการห้องเรียนจากการลงทะเบียน
    const availableClasses = useMemo(() => {
        const classMap = new Map<string, { grade: string; name: string; fullName: string }>();
        book.registrations.forEach(reg => {
            const key = `${reg.student.class.grade}-${reg.student.class.name}`;
            const fullName = `ม.${reg.student.class.grade}/${reg.student.class.name}`;
            classMap.set(key, {
                grade: reg.student.class.grade,
                name: reg.student.class.name,
                fullName
            });
        });
        return Array.from(classMap.values()).sort((a, b) => {
            if (a.grade !== b.grade) {
                return parseInt(a.grade) - parseInt(b.grade);
            }
            return a.name.localeCompare(b.name);
        });
    }, [book.registrations]);

    // กรองข้อมูลการลงทะเบียน
    const filteredRegistrations = useMemo(() => {
        let filtered = book.registrations;

        // กรองตามคำค้นหา
        if (searchTerm) {
            filtered = filtered.filter(reg =>
                reg.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reg.student.stu_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reg.register_code.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // กรองตามห้องเรียน
        if (classFilter) {
            const [grade, name] = classFilter.split('-');
            filtered = filtered.filter(reg =>
                reg.student.class.grade === grade && reg.student.class.name === name
            );
        }

        return filtered;
    }, [book.registrations, searchTerm, classFilter]);

    // แบ่งหน้า
    const paginatedRegistrations = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredRegistrations.slice(start, end);
    }, [filteredRegistrations, page]);

    const totalPages = Math.ceil(filteredRegistrations.length / rowsPerPage);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1); // Reset to first page when searching
    };

    const handleClassFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string || "";
        setClassFilter(selectedKey);
        setPage(1); // Reset to first page when filtering
    };

    const clearFilters = () => {
        setSearchTerm("");
        setClassFilter("");
        setPage(1);
    };

    const hasFilters = searchTerm || classFilter;

    // Reset filters when modal opens
    useEffect(() => {
        if (isOpen) {
            setSearchTerm("");
            setClassFilter("");
            setPage(1);
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="4xl"
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
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">การลงทะเบียนหนังสือ</h2>
                            <p className="text-sm text-gray-600">{book.name}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">จำนวนการลงทะเบียน</p>
                        <p className="text-2xl font-bold text-blue-600">{book.registrationCount}</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-6">
                        {/* Book Info */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">รหัสหนังสือ</p>
                                    <p className="font-mono font-medium">{book.barcode}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">ชื่อหนังสือ</p>
                                    <p className="font-medium">{book.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">วิชา</p>
                                    <p className="font-medium">{book.subject.code} - {book.subject.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">กลุ่มสาระ</p>
                                    <p className="font-medium">
                                        {book.subject.SubjectGroup?.name || 'ไม่ระบุ'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">ปีการศึกษา</p>
                                    <p className="font-medium">{book.AcademicYear.year}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">จำนวนห้องเรียน</p>
                                    <p className="font-medium text-green-600">{availableClasses.length} ห้อง</p>
                                </div>
                            </div>
                        </div>

                        {/* Registrations Table */}
                        {book.registrations.length > 0 ? (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        รายชื่อนักเรียนที่ลงทะเบียน
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        ทั้งหมด {book.registrations.length} คน
                                        {hasFilters && ` • พบ ${filteredRegistrations.length} คน`}
                                    </p>
                                </div>

                                {/* Filters */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <Input
                                        placeholder="ค้นหา (ชื่อ, รหัสนักเรียน, รหัสการลงทะเบียน)"
                                        value={searchTerm}
                                        onValueChange={handleSearchChange}
                                        startContent={<Search className="w-4 h-4 text-gray-400" />}
                                        classNames={{
                                            input: "text-sm",
                                            inputWrapper: "border-gray-300"
                                        }}
                                    />

                                    <Select
                                        placeholder="ห้องเรียน"
                                        selectedKeys={classFilter ? [classFilter] : []}
                                        onSelectionChange={handleClassFilterChange}
                                        classNames={{
                                            trigger: "border-gray-300"
                                        }}
                                    >
                                        {availableClasses.map((cls) => (
                                            <SelectItem 
                                                key={`${cls.grade}-${cls.name}`} 
                                                textValue={cls.fullName}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="w-4 h-4 text-gray-400" />
                                                    <span>{cls.fullName}</span>
                                                </div>
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
                                    aria-label="รายการการลงทะเบียน"
                                    classNames={{
                                        wrapper: "shadow-none border border-gray-200 rounded-lg",
                                        th: "bg-gray-50 text-gray-700 font-semibold",
                                        td: "py-4"
                                    }}
                                >
                                    <TableHeader>
                                        <TableColumn>นักเรียน</TableColumn>
                                        <TableColumn>ห้องเรียน</TableColumn>
                                        <TableColumn>รหัสการลงทะเบียน</TableColumn>
                                        <TableColumn>วันที่ลงทะเบียน</TableColumn>
                                        <TableColumn width={100}>จัดการ</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedRegistrations.map((registration) => (
                                            <TableRow key={registration.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar
                                                            name={registration.student.name.charAt(0)}
                                                            size="sm"
                                                            className="bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-gray-800">
                                                                {registration.student.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {registration.student.stu_code}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        variant="flat"
                                                        color={getGradeColor(registration.student.class.grade)}
                                                        size="sm"
                                                        startContent={<GraduationCap className="w-3 h-3" />}
                                                    >
                                                        ม.{registration.student.class.grade}/{registration.student.class.name}
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
                                                        cursor: "bg-blue-500 text-white"
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
                            <div className="text-center py-8">
                                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <User className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-600 mb-2">
                                    ยังไม่มีการลงทะเบียน
                                </h3>
                                <p className="text-gray-500">
                                    ยังไม่มีนักเรียนลงทะเบียนหนังสือเล่มนี้
                                </p>
                            </div>
                        )}
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={onClose}
                    >
                        ปิด
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}