import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from "@heroui/react";
import InfoModal from "./InfoModal";
import { useMemo, useState } from "react";

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

    return (
        <div className="space-y-4">
            <Table isStriped aria-label="History Table">
                <TableHeader>
                    <TableColumn>รหัส</TableColumn>
                    <TableColumn>หนังสือ</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={isLoading}
                    emptyContent="ไม่พบข้อมูลการลงทะเบียน"
                    items={paginatedBooks}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-xs">{item.register_code}</TableCell>
                            <TableCell className="text-xs">{item.book.name}</TableCell>
                            <TableCell>
                                <InfoModal book={item} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {totalPages > 1 && (
                <div className="flex justify-end">
                    <Pagination
                        showControls
                        total={totalPages}
                        page={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
}
