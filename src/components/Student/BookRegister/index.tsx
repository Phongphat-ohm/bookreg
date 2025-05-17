"use client"
import { addToast, Button, Image, Input, Spinner, Textarea } from "@heroui/react";
import BtmNavbar from "../Navigation/BtmNavbar";
import { FaBarcode, FaChevronLeft, FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";
import BarcodeScanner from "./BarcodeScanner";
import { useBarcode } from "@/context/Student/ScanDataContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export interface BookProp {
    id: number
    barcode: string
    name: string
    description: any
    subject_id: number
    create_at: string
    update_at: string
    subject: Subject
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


export default function BookRegisterPage() {
    const { barcode, setBarcode, scanned, setScanned } = useBarcode();
    const [book, setBook] = useState<BookProp | null>();
    const router = useRouter();

    const handleSearch = async () => {
        setBook(null);

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/api/book/search?code=' + barcode,
        };

        try {
            const check_book_data = await axios(config);

            if (check_book_data.data.status === 200) {
                setBook(check_book_data.data.book)
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: check_book_data.data.message,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true
                })
                return;
            } else {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: check_book_data.data.message + " รหัสหนังสือ: " + barcode,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true
                })
                setScanned(false);
                return;
            }
        } catch (error) {
            console.log(error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เซิฟเวอร์ทำงานผิดพลาด",
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
            return;
        }
    }

    const handleRegister = () => {
        router.push("/student/register/" + barcode);
    }

    useEffect(() => {
        if (scanned) {
            handleSearch();
        }
    }, [scanned])

    return (
        <div className="h-screen bg-gray-100">
            <BtmNavbar />
            <div className="w-full flex gap-2 items-center justify-between p-4 bg-gray-50 shadow sticky top-0 left-0">
                <div className="flex gap-3 items-center">
                    <Link href={"/student/home"}>
                        <Button isIconOnly size="sm" radius="full" variant="shadow">
                            <FaChevronLeft />
                        </Button>
                    </Link>
                    <h1 className="text-lg text-blue-500">
                        ลงทะเบียนหนังสือใหม่
                    </h1>
                </div>
                <img src={"/images/logo.png"} className="w-20" />
            </div>
            <div className="p-5">
                <div className="flex gap-4 items-end">
                    <Input value={barcode !== null ? barcode : ""} onChange={ev => setBarcode(ev.target.value)} placeholder="พิมพ์หรือแสกนรหัสหลังหนังสือ" startContent={<FaBarcode className="text-gray-500" />} label="รหัสหนังสือ" variant="underlined" color="primary" labelPlacement="outside" />
                    <div className="flex gap-2">
                        <Button type="button" onPress={() => { handleSearch(); setScanned(true); }} isIconOnly color="secondary">
                            <FaMagnifyingGlass />
                        </Button>
                        <BarcodeScanner />
                    </div>
                </div>
                {scanned && (
                    <div className="mt-3 p-2 bg-white shadow rounded-lg">
                        {book == null ? (
                            <div className="h-48 flex items-center justify-center w-full">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <div className="w-full rounded bg-green-200 p-3 flex items-center gap-2 text-green-500 text-xs">
                                    <FaCheckCircle /> ค้นหาหนังสือสำเร็จ
                                </div>
                                <div className="p-3">
                                    <div className="grid grid-cols-4 gap-2">
                                        <Input labelPlacement="outside" label="ID" value={book.subject.id.toString()} className="col-span-2" variant="bordered" size="sm" isReadOnly />
                                        <Input labelPlacement="outside" label="รหัสวิชา" value={book.subject.code} className="col-span-2" variant="bordered" size="sm" isReadOnly />
                                        <Input labelPlacement="outside" label="ชื่อวิชา" value={book.subject.name} className="col-span-4" variant="bordered" size="sm" isReadOnly />
                                        <Textarea className="col-span-4" label="รายละเอียดวิชา" placeholder="ไม่พบรายละเอียดวิชา" labelPlacement="outside" size="sm" variant="bordered" isReadOnly />
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                        <Input labelPlacement="outside" label="ชื่อหนังสือ" value={book.name} className="col-span-4" variant="bordered" size="sm" isReadOnly />
                                        <Textarea className="col-span-4" label="รายละเอียดหนังสือ" placeholder="ไม่พบรายละเอียดหนังสือ" labelPlacement="outside" size="sm" variant="bordered" isReadOnly />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <Button onPress={handleRegister} color="success">
                                            ลงทะเบียน
                                        </Button>
                                        <Button color="danger" onPress={() => { setScanned(false); setBarcode("") }}>
                                            ยกเลิก
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}