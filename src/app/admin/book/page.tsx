"use client";
import AdminLayout from "@/components/Admin/Layout";
import { Spinner, addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "@/components/Admin/Book/BookList";

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

export default function BookPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10,
        hasNext: false,
        hasPrev: false
    });
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchFilters, setSearchFilters] = useState({
        search: "",
        subjectId: "",
        subjectGroupId: "",
        academicYearId: "",
        sortBy: "name",
        sortOrder: "asc"
    });

    const fetchBooks = async (page: number = 1) => {
        try {
            setIsLoading(true);
            const params = new URLSearchParams({
                page: page.toString(),
                limit: pagination.limit.toString(),
                ...searchFilters
            });

            const response = await axios.get(`/api/admin/books?${params}`);

            if (response.data.status === 200) {
                setBooks(response.data.data.books);
                setPagination(response.data.data.pagination);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถดึงข้อมูลหนังสือได้"
                });
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('/api/admin/subjects');
            if (response.data.status === 200) {
                setSubjects(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const fetchAcademicYears = async () => {
        try {
            const response = await axios.get('/api/admin/academic-years');
            if (response.data.status === 200) {
                setAcademicYears(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching academic years:", error);
        }
    };

    const handleSearch = (filters: typeof searchFilters) => {
        setSearchFilters(filters);
        fetchBooks(1); // Reset to first page when searching
    };

    const handlePageChange = (page: number) => {
        fetchBooks(page);
    };

    const handleUpdate = () => {
        fetchBooks(pagination.currentPage);
    };

    useEffect(() => {
        fetchBooks();
        fetchSubjects();
        fetchAcademicYears();
    }, []);

    useEffect(() => {
        fetchBooks(1);
    }, [searchFilters]);

    if (isLoading && books.length === 0) {
        return (
            <AdminLayout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <Spinner variant="wave" size="lg" />
                    <label className="font-bold mt-4 text-gray-600">กำลังโหลดข้อมูลหนังสือ...</label>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -m-6 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">จัดการหนังสือ</h1>
                    <p className="text-gray-600">จัดการข้อมูลหนังสือเรียนและการลงทะเบียน</p>
                </div>

                <BookList
                    books={books}
                    pagination={pagination}
                    subjects={subjects}
                    academicYears={academicYears}
                    isLoading={isLoading}
                    onSearch={handleSearch}
                    onPageChange={handlePageChange}
                    onUpdate={handleUpdate}
                />
            </div>
        </AdminLayout>
    );
}