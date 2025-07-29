"use client"
import { addToast, Button, Input, Spinner, Textarea, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import BtmNavbar from "../Navigation/BtmNavbar";
import { FaBarcode, FaChevronLeft, FaMagnifyingGlass, FaBook, FaGraduationCap } from "react-icons/fa6";
import Link from "next/link";
import BarcodeScanner from "./BarcodeScanner";
import { useBarcode } from "@/context/Student/ScanDataContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <BtmNavbar />

            {/* Header */}
            <div className="w-full flex gap-2 items-center justify-between p-4 bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 left-0 z-20">
                <div className="flex gap-3 items-center">
                    <Link href={"/student/home"}>
                        <Button isIconOnly size="sm" radius="full" variant="shadow" color="primary">
                            <FaChevronLeft />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            ลงทะเบียนหนังสือ
                        </h1>
                        <p className="text-sm text-gray-500">สแกนหรือพิมพ์รหัสหนังสือเพื่อลงทะเบียน</p>
                    </div>
                </div>
                <img src={"/images/logo.png"} className="w-16 h-16 object-contain" />
            </div>

            <div className="p-4 space-y-6">
                {/* Search Card */}
                <Card className="shadow-lg border-0">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <FaBarcode className="text-blue-500 text-lg" />
                            <h2 className="text-lg font-semibold text-gray-800">ค้นหาหนังสือ</h2>
                        </div>
                    </CardHeader>
                    <CardBody className="pt-2">
                        <div className="flex gap-3 items-end">
                            <Input
                                value={barcode !== null ? barcode : ""}
                                onChange={ev => setBarcode(ev.target.value)}
                                placeholder="พิมพ์หรือแสกนรหัสหลังหนังสือ"
                                startContent={<FaBarcode className="text-gray-400" />}
                                label="รหัสหนังสือ"
                                variant="bordered"
                                color="primary"
                                labelPlacement="outside"
                                className="flex-1"
                            />
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onPress={() => { handleSearch(); setScanned(true); }}
                                    isIconOnly
                                    color="primary"
                                    variant="shadow"
                                >
                                    <FaMagnifyingGlass />
                                </Button>
                                <BarcodeScanner />
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start gap-2">
                                <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-blue-700">
                                    <p className="font-medium">วิธีการใช้งาน:</p>
                                    <ul className="mt-1 space-y-1 text-xs">
                                        <li>• พิมพ์รหัสหนังสือในช่องด้านบน หรือ</li>
                                        <li>• กดปุ่มสแกนเพื่อใช้กล้องสแกนบาร์โค้ด</li>
                                        <li>• กดปุ่มค้นหาเพื่อดูข้อมูลหนังสือ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Book Details Card */}
                {scanned && (
                    <Card className="shadow-lg border-0 mb-28">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <FaBook className="text-green-500 text-lg" />
                                <h2 className="text-lg font-semibold text-gray-800">ข้อมูลหนังสือ</h2>
                            </div>
                        </CardHeader>
                        <CardBody className="pt-2">
                            {book == null ? (
                                <div className="h-48 flex flex-col items-center justify-center w-full">
                                    <Spinner size="lg" color="primary" />
                                    <p className="mt-3 text-gray-500">กำลังค้นหาข้อมูลหนังสือ...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Success Alert */}
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center gap-2 text-green-700">
                                            <FaCheckCircle />
                                            <span className="font-medium">ค้นหาหนังสือสำเร็จ</span>
                                        </div>
                                    </div>

                                    {/* Subject Info */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <FaGraduationCap className="text-blue-500" />
                                            <h3 className="font-semibold text-gray-800">ข้อมูลวิชา</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <Input
                                                label="รหัสวิชา"
                                                value={book.subject.code}
                                                variant="bordered"
                                                size="sm"
                                                isReadOnly
                                                startContent={<span className="text-gray-400 text-xs">#</span>}
                                            />
                                            <Input
                                                label="ระดับชั้น"
                                                value={`ม.${book.subject.grade}`}
                                                variant="bordered"
                                                size="sm"
                                                isReadOnly
                                            />
                                            <Input
                                                label="ชื่อวิชา"
                                                value={book.subject.name}
                                                className="md:col-span-2"
                                                variant="bordered"
                                                size="sm"
                                                isReadOnly
                                            />
                                        </div>
                                    </div>

                                    <Divider />

                                    {/* Book Info */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <FaBook className="text-orange-500" />
                                            <h3 className="font-semibold text-gray-800">ข้อมูลหนังสือ</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <Input
                                                label="ชื่อหนังสือ"
                                                value={book.name}
                                                variant="bordered"
                                                size="sm"
                                                isReadOnly
                                            />
                                            <Input
                                                label="รหัสบาร์โค้ด"
                                                value={book.barcode}
                                                variant="bordered"
                                                size="sm"
                                                isReadOnly
                                                startContent={<FaBarcode className="text-gray-400" />}
                                            />
                                            <Textarea
                                                label="รายละเอียดหนังสือ"
                                                placeholder="ไม่พบรายละเอียดหนังสือ"
                                                variant="bordered"
                                                size="sm"
                                                isReadOnly
                                                minRows={2}
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <Button
                                            onPress={handleRegister}
                                            color="success"
                                            variant="shadow"
                                            className="font-semibold"
                                        >
                                            ลงทะเบียน
                                        </Button>
                                        <Button
                                            color="danger"
                                            variant="bordered"
                                            onPress={() => { setScanned(false); setBarcode("") }}
                                            className="font-semibold"
                                        >
                                            ยกเลิก
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                )}
            </div>
        </div>
    )
}