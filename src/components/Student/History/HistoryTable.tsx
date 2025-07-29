import {
    Pagination,
    Chip,
    Card,
    CardBody,
    Skeleton,
} from "@heroui/react";
import InfoModal from "./InfoModal";
import { useMemo, useState } from "react";
import { FaBook, FaBarcode, FaCalendar, FaGraduationCap } from "react-icons/fa6";

interface Root {
    isLoading: boolean;
    books: RegisterBook[];
    searchText: string;
}

export interface RegisterBook {
    id: number
    student_id: number
    book_id: number
    subject_id: number
    register_code: string
    registered_at: string
    book: Book
    subject: Subject
}

export interface Book {
    id: number
    barcode: string
    name: string
    description: any
    subject_id: number
    academic_year_id: number
    create_at: string
    update_at: string
}

export interface Subject {
    id: number
    code: string
    grade: string
    name: string
    description: any
    create_at: string
    update_at: string
}

const ITEMS_PER_PAGE = 5;

export default function HistoryTable({ isLoading, books, searchText }: Root) {
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBooks = useMemo(() => {
        const lower = searchText.toLowerCase();
        return books.filter((book) =>
            book.book.name.toLowerCase().includes(lower) ||
            book.book.barcode.toLowerCase().includes(lower) ||
            book.subject.name.toLowerCase().includes(lower)
        );
    }, [books, searchText]);

    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

    const paginatedBooks = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBooks.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredBooks, currentPage]);

    // Loading skeleton cards
    const LoadingCards = () => (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="shadow-md border-0">
                    <CardBody className="p-4">
                        <div className="space-y-3">
                            <div className="flex justify-between items-start">
                                <Skeleton className="h-4 w-3/4 rounded" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-12 rounded-full" />
                                <Skeleton className="h-5 w-8 rounded-full" />
                            </div>
                            <Skeleton className="h-3 w-1/2 rounded" />
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );

    return (
        <div className="space-y-4">
            {isLoading ? (
                <LoadingCards />
            ) : filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                    <FaBook className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">ไม่พบข้อมูลการลงทะเบียน</p>
                    <p className="text-sm text-gray-400 mt-1">
                        {searchText ? "ลองค้นหาด้วยคำอื่น" : "คุณยังไม่ได้ลงทะเบียนหนังสือเล่มใด"}
                    </p>
                </div>
            ) : (
                <>
                    {/* Mobile Card Layout */}
                    <div className="space-y-3">
                        {paginatedBooks.map((item) => (
                            <Card key={item.id} className="shadow-md border-0 hover:shadow-lg transition-shadow">
                                <CardBody className="p-4">
                                    <div className="space-y-3">
                                        {/* Header with Registration Code */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">
                                                    {item.book.name}
                                                </h3>
                                                <p className="text-xs text-gray-600">
                                                    {item.subject.name}
                                                </p>
                                            </div>
                                            <Chip
                                                color="primary"
                                                variant="flat"
                                                size="sm"
                                                className="font-mono ml-2 flex-shrink-0"
                                                startContent={<FaBarcode className="text-xs" />}
                                            >
                                                {item.register_code}
                                            </Chip>
                                        </div>

                                        {/* Subject Info */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Chip
                                                color="secondary"
                                                variant="flat"
                                                size="sm"
                                                className="text-xs"
                                            >
                                                {item.subject.code}
                                            </Chip>
                                            <Chip
                                                color="warning"
                                                variant="flat"
                                                size="sm"
                                                className="text-xs"
                                                startContent={<FaGraduationCap className="text-xs" />}
                                            >
                                                ม.{item.subject.grade}
                                            </Chip>
                                        </div>

                                        {/* Date and Action */}
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <FaCalendar className="text-xs" />
                                                <div>
                                                    <span className="block">
                                                        {new Date(item.registered_at).toLocaleDateString('th-TH', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="text-gray-400">
                                                        {new Date(item.registered_at).toLocaleTimeString('th-TH', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            <InfoModal book={item} />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center pt-4">
                            <Pagination
                                showControls
                                total={totalPages}
                                page={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                color="primary"
                                variant="bordered"
                                size="sm"
                                className="gap-2"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
