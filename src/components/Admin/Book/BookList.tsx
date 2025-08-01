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
    Select,
    SelectItem,
    Chip,
    Pagination,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Tooltip,
    Spinner,
    addToast
} from "@heroui/react";
import { useState, useMemo } from "react";
import {
    BookOpen,
    Search,
    Plus,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Users,
    Calendar,
    SortAsc,
    SortDesc,
    X,
    Camera
} from "lucide-react";
import AddBookModal from "./AddBookModal";
import BookRegistrationsModal from "./BookRegistrationsModal";
import BarcodeScanner from "@/components/Common/BarcodeScanner";

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

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
}

interface BookListProps {
    books: Book[];
    pagination: PaginationData;
    subjects: Subject[];
    academicYears: AcademicYear[];
    isLoading: boolean;
    onSearch: (filters: any) => void;
    onPageChange: (page: number) => void;
    onUpdate: () => void;
}

interface SubjectGroupOption {
    id: number;
    name: string;
}

export default function BookList({
    books,
    pagination,
    subjects,
    academicYears,
    isLoading,
    onSearch,
    onPageChange,
    onUpdate
}: BookListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [subjectGroupFilter, setSubjectGroupFilter] = useState("");
    const [academicYearFilter, setAcademicYearFilter] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRegistrationsModalOpen, setIsRegistrationsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        onSearch({
            search: value,
            subjectId: subjectFilter,
            subjectGroupId: subjectGroupFilter,
            academicYearId: academicYearFilter,
            sortBy,
            sortOrder
        });
    };

    const handleSubjectFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string || "";
        setSubjectFilter(selectedKey);
        onSearch({
            search: searchTerm,
            subjectId: selectedKey,
            subjectGroupId: subjectGroupFilter,
            academicYearId: academicYearFilter,
            sortBy,
            sortOrder
        });
    };

    const handleSubjectGroupFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string || "";
        setSubjectGroupFilter(selectedKey);
        onSearch({
            search: searchTerm,
            subjectId: subjectFilter,
            subjectGroupId: selectedKey,
            academicYearId: academicYearFilter,
            sortBy,
            sortOrder
        });
    };

    const handleAcademicYearFilterChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string || "";
        setAcademicYearFilter(selectedKey);
        onSearch({
            search: searchTerm,
            subjectId: subjectFilter,
            subjectGroupId: subjectGroupFilter,
            academicYearId: selectedKey,
            sortBy,
            sortOrder
        });
    };

    const handleSortChange = (newSortBy: string) => {
        const newSortOrder = sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
        onSearch({
            search: searchTerm,
            subjectId: subjectFilter,
            subjectGroupId: subjectGroupFilter,
            academicYearId: academicYearFilter,
            sortBy: newSortBy,
            sortOrder: newSortOrder
        });
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSubjectFilter("");
        setSubjectGroupFilter("");
        setAcademicYearFilter("");
        setSortBy("name");
        setSortOrder("asc");
        onSearch({
            search: "",
            subjectId: "",
            subjectGroupId: "",
            academicYearId: "",
            sortBy: "name",
            sortOrder: "asc"
        });
    };

    const hasFilters = searchTerm || subjectFilter || subjectGroupFilter || academicYearFilter;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getRegistrationStatusColor = (count: number) => {
        if (count === 0) return 'default';
        if (count < 5) return 'warning';
        return 'success';
    };

    const handleAddSuccess = () => {
        setIsAddModalOpen(false);
        onUpdate();
    };

    const handleBarcodeScanned = (barcode: string) => {
        setSearchTerm(barcode);
        setIsScannerOpen(false);
        onSearch({
            search: barcode,
            subjectId: subjectFilter,
            subjectGroupId: subjectGroupFilter,
            academicYearId: academicYearFilter,
            sortBy,
            sortOrder
        });
        addToast({
            color: "success",
            title: "สแกนสำเร็จ",
            description: `ค้นหาด้วยรหัส: ${barcode}`
        });
    };

    const handleViewRegistrations = (book: Book) => {
        setSelectedBook(book);
        setIsRegistrationsModalOpen(true);
    };

    const handleRegistrationsModalClose = () => {
        setIsRegistrationsModalOpen(false);
        setSelectedBook(null);
    };

    const handleRegistrationUpdate = () => {
        onUpdate();
    };

    // สร้างรายการกลุ่มสาระจาก subjects
    const subjectGroups = useMemo(() => {
        const groupMap = new Map<number, SubjectGroupOption>();
        subjects.forEach(subject => {
            if (subject.SubjectGroup) {
                groupMap.set(subject.SubjectGroup.id, {
                    id: subject.SubjectGroup.id,
                    name: subject.SubjectGroup.name
                });
            }
        });
        return Array.from(groupMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [subjects]);

    const SortIcon = ({ column }: { column: string }) => {
        if (sortBy !== column) return null;
        return sortOrder === "asc" ?
            <SortAsc className="w-3 h-3 ml-1" /> :
            <SortDesc className="w-3 h-3 ml-1" />;
    };

    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">หนังสือเรียน</h2>
                                <p className="text-sm text-gray-600">
                                    ทั้งหมด {pagination.totalCount} เล่ม
                                    {hasFilters && ` • พบ ${books.length} เล่ม`}
                                </p>
                            </div>
                        </div>

                        <Button
                            color="primary"
                            startContent={<Plus className="w-4 h-4" />}
                            onPress={() => setIsAddModalOpen(true)}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600"
                        >
                            เพิ่มหนังสือ
                        </Button>
                    </div>
                </CardHeader>

                <CardBody>
                    {/* Filters */}
                    <div className="space-y-4 mb-4">
                        {/* Search Bar */}
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="ค้นหาหนังสือ (ชื่อ, รหัส, คำอธิบาย)"
                                    value={searchTerm}
                                    onValueChange={handleSearchChange}
                                    startContent={<Search className="w-4 h-4 text-gray-400" />}
                                    classNames={{
                                        input: "text-sm",
                                        inputWrapper: "border-gray-300"
                                    }}
                                    className="flex-1"
                                />
                                <Button
                                    isIconOnly
                                    variant="bordered"
                                    onPress={() => setIsScannerOpen(true)}
                                    className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                                    title="สแกนบาร์โค้ดเพื่อค้นหา"
                                >
                                    <Camera className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>พิมพ์เพื่อค้นหา</span>
                                <span>•</span>
                                <span className="text-emerald-600">คลิกกล้องเพื่อสแกนบาร์โค้ด</span>
                            </div>
                        </div>

                        {/* Filter Options */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                            <Select
                                placeholder="กลุ่มสาระ"
                                selectedKeys={subjectGroupFilter ? [subjectGroupFilter] : []}
                                onSelectionChange={handleSubjectGroupFilterChange}
                                classNames={{
                                    trigger: "border-gray-300"
                                }}
                            >
                                {subjectGroups.map((group) => (
                                    <SelectItem key={group.id.toString()} textValue={group.name}>
                                        {group.name}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                placeholder="วิชา"
                                selectedKeys={subjectFilter ? [subjectFilter] : []}
                                onSelectionChange={handleSubjectFilterChange}
                                classNames={{
                                    trigger: "border-gray-300"
                                }}
                            >
                                {subjects.map((subject) => (
                                    <SelectItem key={subject.id.toString()} textValue={`${subject.code} - ${subject.name}`}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{subject.code} - {subject.name}</span>
                                            <span className="text-xs text-gray-500">ม.{subject.grade}</span>
                                        </div>
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
                                {academicYears.map((year) => (
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
                    </div>

                    {/* Table */}
                    {books.length > 0 ? (
                        <>
                            <div className="relative">
                                {isLoading && (
                                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                                        <Spinner size="lg" />
                                    </div>
                                )}

                                <Table
                                    aria-label="รายการหนังสือ"
                                    classNames={{
                                        wrapper: "shadow-none border border-gray-200 rounded-lg",
                                        th: "bg-gray-50 text-gray-700 font-semibold",
                                        td: "py-4"
                                    }}
                                >
                                    <TableHeader>
                                        <TableColumn>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                onPress={() => handleSortChange('barcode')}
                                                className="p-0 h-auto font-semibold text-gray-700 justify-start"
                                            >
                                                รหัสหนังสือ
                                                <SortIcon column="barcode" />
                                            </Button>
                                        </TableColumn>
                                        <TableColumn>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                onPress={() => handleSortChange('name')}
                                                className="p-0 h-auto font-semibold text-gray-700 justify-start"
                                            >
                                                ชื่อหนังสือ
                                                <SortIcon column="name" />
                                            </Button>
                                        </TableColumn>
                                        <TableColumn>วิชา</TableColumn>
                                        <TableColumn>กลุ่มสาระ</TableColumn>
                                        <TableColumn>ปีการศึกษา</TableColumn>
                                        <TableColumn>สถานะการลงทะเบียน</TableColumn>
                                        <TableColumn>วันที่เพิ่ม</TableColumn>
                                        <TableColumn width={100}>จัดการ</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {books.map((book) => (
                                            <TableRow key={book.id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-mono font-medium text-gray-800">{book.barcode}</p>
                                                        <p className="text-xs text-gray-500">ID: {book.id}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{book.name}</p>
                                                        {book.description && (
                                                            <p className="text-xs text-gray-500 line-clamp-2">
                                                                {book.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {book.subject.code} - {book.subject.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            มัธยมศึกษาปีที่ {book.subject.grade}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {book.subject.SubjectGroup ? (
                                                        <Chip
                                                            variant="flat"
                                                            color="secondary"
                                                            size="sm"
                                                        >
                                                            {book.subject.SubjectGroup.name}
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
                                                        {book.AcademicYear.year}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Chip
                                                            variant="flat"
                                                            color={getRegistrationStatusColor(book.registrationCount)}
                                                            size="sm"
                                                            startContent={<Users className="w-3 h-3" />}
                                                        >
                                                            {book.registrationCount} คน
                                                        </Chip>
                                                        {book.registrationCount > 0 && (
                                                            <Button
                                                                size="sm"
                                                                variant="light"
                                                                onPress={() => handleViewRegistrations(book)}
                                                                className="min-w-0 px-2 h-6 text-xs"
                                                            >
                                                                ดูรายละเอียด
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(book.create_at)}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                variant="light"
                                                                size="sm"
                                                                isIconOnly
                                                            >
                                                                <MoreVertical className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label="Book actions">
                                                            <DropdownItem
                                                                key="edit"
                                                                startContent={<Edit className="w-4 h-4" />}
                                                            >
                                                                แก้ไขข้อมูล
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                key="delete"
                                                                className="text-danger"
                                                                color="danger"
                                                                startContent={<Trash2 className="w-4 h-4" />}
                                                            >
                                                                ลบหนังสือ
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-center mt-4">
                                    <Pagination
                                        total={pagination.totalPages}
                                        page={pagination.currentPage}
                                        onChange={onPageChange}
                                        showControls
                                        classNames={{
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                {hasFilters ? (
                                    <Search className="w-8 h-8 text-gray-400" />
                                ) : (
                                    <BookOpen className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                {hasFilters ? "ไม่พบหนังสือที่ค้นหา" : "ยังไม่มีหนังสือในระบบ"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {hasFilters ? (
                                    "ลองปรับเปลี่ยนเงื่อนไขการค้นหา"
                                ) : (
                                    "เริ่มต้นโดยการเพิ่มหนังสือเล่มแรก"
                                )}
                            </p>
                            {hasFilters ? (
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
                                    className="bg-gradient-to-r from-emerald-500 to-emerald-600"
                                >
                                    เพิ่มหนังสือเล่มแรก
                                </Button>
                            )}
                        </div>
                    )}
                </CardBody>
            </Card>

            <AddBookModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddSuccess}
                subjects={subjects}
                academicYears={academicYears}
            />

            {selectedBook && (
                <BookRegistrationsModal
                    isOpen={isRegistrationsModalOpen}
                    onClose={handleRegistrationsModalClose}
                    onUpdate={handleRegistrationUpdate}
                    book={selectedBook}
                />
            )}

            <BarcodeScanner
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleBarcodeScanned}
                title="สแกนบาร์โค้ดเพื่อค้นหา"
            />
        </>
    );
}