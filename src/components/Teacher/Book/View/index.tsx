"use client";
import { addToast, Button, Table, Input, Spinner, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBook, FaPencil, FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import Barcode from "react-barcode";
import DeleteBook from "@/functions/books/DeleteBook";

export interface Data {
    id: number;
    code: string;
    grade: string;
    name: string;
    description: any;
    create_at: string;
    update_at: string;
    subject_group_id: number;
    books: Book[];
}

export interface Book {
    id: number;
    barcode: string;
    name: string;
    description: any;
    subject_id: number;
    academic_year_id: number;
    create_at: string;
    update_at: string;
    AcademicYear: AcademicYear;
}

export interface AcademicYear {
    id: number;
    year: string;
    is_now: boolean;
    create_at: string;
    update_at: string;
}

export default function GetBookView() {
    const { subject_id } = useParams();
    const [data, setData] = useState<Data>();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const get_book_in_subject = async () => {
        setLoading(true);
        setData(undefined);
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/api/book/subject?subject_id=${subject_id}`,
                headers: {}
            };

            const req_data = await axios(config);
            const resData = req_data.data;

            if (resData.status !== 200) {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: resData.message,
                });
                return;
            }

            setData(resData.data);
        } catch (error) {
            console.log(error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "ดูข้อมูลผิดพลาดที่หน้าควบคุม",
                timeout: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get_book_in_subject();
    }, []);

    const filteredBooks = data?.books?.filter(book =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.AcademicYear.year.toLowerCase().includes(search.toLowerCase()) ||
        book.barcode.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="flex w-full justify-center">
                <div className="p-5 rounded-xl shadow-lg w-1/3 bg-white">
                    <div className="flex font-bold justify-center text-blue-500 gap-2 items-center">
                        <FaBook />
                        <label>ข้อมูลวิชา</label>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center mt-3 p-3">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 text-gray-700 gap-3 mt-3 p-3">
                            <label>รหัสวิชา: {data?.code}</label>
                            <label>ชื่อวิชา: {data?.name}</label>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-5">
                <div className="w-full flex items-end gap-6">
                    <Button color="primary" isIconOnly onPress={get_book_in_subject}>
                        <FaSpinner className={`${loading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button color="success" startContent={<FaPlus />}>
                        เพิ่มหนังสือ
                    </Button>
                    <Input
                        label="ค้นหาหนังสือ"
                        type="search"
                        color="default"
                        placeholder="ค้นหาด้วย ชื่อ หรือรหัสหนังสือ"
                        variant="faded"
                        labelPlacement="outside"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <Table aria-label="ตารางแสดงหนังสือของวิชา">
                        <TableHeader>
                            <TableColumn width={20}>#</TableColumn>
                            <TableColumn>รหัสหนังสือ</TableColumn>
                            <TableColumn>ชื่อหนังสือ</TableColumn>
                            <TableColumn>รายละเอียดหนังสือ</TableColumn>
                            <TableColumn>ปีการศึกษา</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableHeader>
                        <TableBody
                            isLoading={loading}
                            loadingContent={<Spinner />}
                            emptyContent="ไม่มีหนังสือในวิชานี้"
                        >
                            {(filteredBooks ?? []).map((book, index) => (
                                <TableRow key={book.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Barcode value={book.barcode} height={25} fontSize={15} />
                                    </TableCell>
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.description || "-"}</TableCell>
                                    <TableCell>{book.AcademicYear.year}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 items-center">
                                            <Button onPress={() => {
                                                DeleteBook(book.id).then(r => {
                                                    if (r === true) {
                                                        get_book_in_subject();
                                                        return;
                                                    } else {
                                                        return;
                                                    }
                                                })
                                            }} size="sm" isIconOnly color="danger">
                                                <FaTrash />
                                            </Button>
                                            <Button size="sm" isIconOnly color="warning">
                                                <FaPencil />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
