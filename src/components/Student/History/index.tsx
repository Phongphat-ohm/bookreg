"use client";
import { addToast, Button, Input, Card, CardBody, CardHeader } from "@heroui/react";
import BtmNavbar from "../Navigation/BtmNavbar";
import { FaChevronLeft, FaMagnifyingGlass, FaBook } from "react-icons/fa6";
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <BtmNavbar />

            {/* Header */}
            <div className="w-full flex gap-2 items-center justify-between p-4 bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 left-0 z-10">
                <div className="flex gap-3 items-center">
                    <Link href={"/student/home"}>
                        <Button isIconOnly size="sm" radius="full" variant="shadow" color="primary">
                            <FaChevronLeft />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            หนังสือของฉัน
                        </h1>
                        <p className="text-sm text-gray-500">ค้นหาและดูรายการหนังสือที่ลงทะเบียน</p>
                    </div>
                </div>
                <img src={"/images/logo.png"} className="w-16 h-16 object-contain" />
            </div>

            <div className="p-4 space-y-6">
                {/* Search Card */}
                <Card className="shadow-lg border-0">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <FaMagnifyingGlass className="text-blue-500 text-lg" />
                            <h2 className="text-lg font-semibold text-gray-800">ค้นหาหนังสือ</h2>
                        </div>
                    </CardHeader>
                    <CardBody className="pt-2">
                        <div className="flex gap-3 items-end">
                            <Input
                                value={searchText}
                                onChange={ev => setSearchText(ev.target.value)}
                                label="ค้นหา"
                                labelPlacement="outside"
                                variant="bordered"
                                placeholder="ค้นหาจาก ชื่อหนังสือ ชื่อวิชา รหัสหนังสือ"
                                startContent={<FaMagnifyingGlass className="text-gray-400" />}
                                className="flex-1"
                            />
                            <BarcodeScanner />
                        </div>
                    </CardBody>
                </Card>

                {/* Books List Card */}
                <Card className="shadow-lg border-0">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <FaBook className="text-green-500 text-lg" />
                            <h2 className="text-lg font-semibold text-gray-800">รายการหนังสือ</h2>
                            <div className="ml-auto">
                                <span className="text-sm text-gray-500">
                                    ทั้งหมด {books.length} เล่ม
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="pt-2">
                        <HistoryTable isLoading={isLoading} books={books} searchText={searchText} />
                    </CardBody>
                </Card>

                {/* Footer Space */}
                <div className="h-20"></div>
            </div>
        </div>
    )
}