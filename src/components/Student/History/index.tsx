"use client";
import { addToast, Button, Input } from "@heroui/react";
import BtmNavbar from "../Navigation/BtmNavbar";
import { FaChevronLeft, FaMagnifyingGlass } from "react-icons/fa6";
import HistoryTable, { RegisterBook } from "./HistoryTable";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import BarcodeScanner from "../BookRegister/BarcodeScanner";
import { useBarcode } from "@/context/Student/ScanDataContext";

export default function HistoryRegister() {
    const [isLoading, setLoading] = useState(true);
    const [books, setBooks] = useState<RegisterBook[]>([]);
    const [searchText, setSearchText] = useState("");
    const { barcode, scanned } = useBarcode();

    useEffect(() => {
        if (barcode !== null) {
            setSearchText(barcode);
        }
    }, [barcode])

    const get_register_data = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/api/student/book'
        };

        try {
            const get_register = await axios(config);

            if (get_register.data.status === 200) {
                setLoading(false);
                setBooks(get_register.data.data);
                return;
            }

            addToast({
                color: "warning",
                title: "ระวัง",
                description: "ไม่สามารถดึงข้อมูลได้",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
        } catch (error) {
            console.log(error);
            addToast({
                color: "danger",
                title: "คำเตือน",
                description: "เซิฟเวอร์ทำงานผิดพลาด",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
        }
    }

    useEffect(() => {
        get_register_data();
    }, [])

    return (
        <>
            <div className="h-screen w-full bg-gray-100">
                <BtmNavbar />
                <div className="w-full flex gap-2 items-center justify-between p-4 bg-gray-50 shadow sticky top-0 left-0">
                    <div className="flex gap-3 items-center">
                        <Link href={"/student/home"}>
                            <Button isIconOnly size="sm" radius="full" variant="shadow">
                                <FaChevronLeft />
                            </Button>
                        </Link>
                        <h1 className="text-lg text-blue-500">
                            ค้นหาหนังสือ
                        </h1>
                    </div>
                    <img src={"/images/logo.png"} className="w-20" />
                </div>
                <div className="p-5">
                    <div className="w-full flex gap-3 items-end">
                        <Input value={searchText} onChange={ev => setSearchText(ev.target.value)} label="ค้นหา" labelPlacement="outside" variant="bordered" placeholder="ค้นหาจาก ชื่อหนังสือ ชื่อวิชา รหัสหนังสือ" />
                        <BarcodeScanner />
                    </div>
                    <div className="mt-2">
                        <HistoryTable isLoading={isLoading} books={books} searchText={searchText} />
                    </div>
                </div>
            </div>
        </>
    )
}