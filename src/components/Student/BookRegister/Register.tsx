"use client";
import BtmNavbar from "@/components/Student/Navigation/BtmNavbar";
import { useUser } from "@/context/Student/UserDataContext";
import { addToast, Button, Spinner, Card, CardBody, CardHeader, Divider, Chip } from "@heroui/react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaUser, FaBook, FaCircleCheck, FaEye, FaHouse, FaBarcode, FaGraduationCap } from "react-icons/fa6";

export interface GetBookProp {
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


export interface BookRegistrationProps {
    id: number
    student_id: number
    book_id: number
    subject_id: number
    register_code: string
    registered_at: string
    book: Book
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



export default function RegisterBookSystem() {
    const { book_code } = useParams();
    const router = useRouter();
    const { user } = useUser();
    const [book, setBook] = useState<GetBookProp | null>(null);
    const [registerData, setRegisterData] = useState<BookRegistrationProps | null>(null);
    const [showRegisterCode, setShowRegisterCode] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const check_book_reg = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/api/student/book/check?book_code=' + book_code,
        };

        try {
            const check_book_reg = await axios(config);
            const data = check_book_reg.data;

            if (data.status !== 200) {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: data.message,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,

                })
                setTimeout(() => {
                    router.push("/student/register");
                }, 3000);
                return;
            }

            setBook(data.data);

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
        check_book_reg();
    }, [])

    const confirm_register = async () => {
        // ป้องกันการกดซ้ำ
        if (isRegistering) return;

        setIsRegistering(true);

        let data = JSON.stringify({
            "book_code": book_code
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/student/book/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        try {
            const registeration = await axios(config);
            const data = registeration.data;

            if (data.status === 200) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: data.message
                })
                setRegisterData(data.data.register_data);
                return;
            }

            addToast({
                color: "warning",
                title: "ระวัง",
                description: data.message,
                timeout: 3000,
                shouldShowTimeoutProgress: true
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
        } finally {
            setIsRegistering(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <BtmNavbar />

            {/* Header */}
            <div className="w-full flex gap-2 items-center justify-between p-4 bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 left-0 z-10">
                <div className="flex gap-3 items-center">
                    <Link href={"/student/register"}>
                        <Button isIconOnly size="sm" radius="full" variant="shadow" color="primary">
                            <FaChevronLeft />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            {registerData ? "ลงทะเบียนสำเร็จ" : "ยืนยันการลงทะเบียน"}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {registerData ? "รหัสลงทะเบียนของคุณ" : "ตรวจสอบข้อมูลก่อนลงทะเบียน"}
                        </p>
                    </div>
                </div>
                <img src={"/images/logo.png"} className="w-16 h-16 object-contain" />
            </div>

            <div className="p-4 space-y-6">
                {registerData === null ? (
                    <>
                        {book === null ? (
                            <div className="space-y-4">
                                {/* Loading Student Info */}
                                <Card className="shadow-lg border-0">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2">
                                            <FaUser className="text-blue-500 text-lg" />
                                            <h2 className="text-lg font-semibold text-gray-800">ข้อมูลนักเรียน</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-2">
                                        <div className="h-24 flex items-center justify-center">
                                            <Spinner size="lg" color="primary" />
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Loading Book Info */}
                                <Card className="shadow-lg border-0">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2">
                                            <FaBook className="text-purple-500 text-lg" />
                                            <h2 className="text-lg font-semibold text-gray-800">ข้อมูลหนังสือ</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-2">
                                        <div className="h-48 flex items-center justify-center">
                                            <Spinner size="lg" color="primary" />
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Student Info Card */}
                                <Card className="shadow-lg border-0">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2">
                                            <FaUser className="text-blue-500 text-lg" />
                                            <h2 className="text-lg font-semibold text-gray-800">ข้อมูลนักเรียน</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-blue-100">
                                                    <FaUser className="text-blue-600 text-sm" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">รหัสนักเรียน</p>
                                                    <p className="font-semibold text-gray-800">{user?.stu_code}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-green-100">
                                                    <FaGraduationCap className="text-green-600 text-sm" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">ชื่อ-นามสกุล</p>
                                                    <p className="font-semibold text-gray-800">{user?.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Book Info Card */}
                                <Card className="shadow-lg border-0">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2">
                                            <FaBook className="text-purple-500 text-lg" />
                                            <h2 className="text-lg font-semibold text-gray-800">ข้อมูลหนังสือ</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-2">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-500">รหัสวิชา:</span>
                                                        <Chip size="sm" color="primary" variant="flat">
                                                            {book?.subject.code}
                                                        </Chip>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-500">ระดับชั้น:</span>
                                                        <Chip size="sm" color="secondary" variant="flat">
                                                            ม.{book?.subject.grade}
                                                        </Chip>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-xs text-gray-500">ชื่อวิชา</p>
                                                    <p className="font-semibold text-gray-800">{book?.subject.name}</p>
                                                </div>
                                            </div>

                                            <Divider />

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <FaBarcode className="text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">รหัสหนังสือ</p>
                                                        <p className="font-mono text-sm font-semibold text-gray-800">{book?.barcode}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <FaBook className="text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">ชื่อหนังสือ</p>
                                                        <p className="font-semibold text-gray-800">{book?.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        onPress={confirm_register}
                                        color="primary"
                                        size="lg"
                                        variant="shadow"
                                        className="font-semibold"
                                        isLoading={isRegistering}
                                        isDisabled={isRegistering}
                                    >
                                        {isRegistering ? "กำลังลงทะเบียน..." : "ยืนยันลงทะเบียน"}
                                    </Button>
                                    <Link href={"/student/register"}>
                                        <Button
                                            color="danger"
                                            variant="bordered"
                                            size="lg"
                                            className="w-full font-semibold"
                                            isDisabled={isRegistering}
                                        >
                                            ยกเลิก
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="space-y-6">
                        {/* Success Card */}
                        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-emerald-600">
                            <CardBody className="p-6 text-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 rounded-full bg-white/20">
                                        <FaCircleCheck className="text-white text-3xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-2">ลงทะเบียนสำเร็จ!</h2>
                                        <p className="text-white/90 text-sm">
                                            กรุณาเขียนรหัสลงทะเบียนที่หน้าแรกสุด<br />มุมขวาบนของหนังสือ
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Registration Code Card */}
                        <Card className="shadow-lg border-0">
                            <CardHeader className="text-center pb-2">
                                <h3 className="text-lg font-semibold text-gray-800 w-full">รหัสลงทะเบียน</h3>
                            </CardHeader>
                            <CardBody className="pt-2">
                                {showRegisterCode ? (
                                    <div className="space-y-4">
                                        <div className="text-center p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                                            <p className="text-xs text-gray-600 mb-2">รหัสลงทะเบียนของคุณ</p>
                                            <p className="text-3xl font-bold text-red-600 font-mono tracking-wider">
                                                {registerData.register_code}
                                            </p>
                                        </div>

                                        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <span className="text-gray-500">รหัสวิชา:</span>
                                                    <p className="font-semibold">{book?.subject.code}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">ชื่อวิชา:</span>
                                                    <p className="font-semibold">{book?.subject.name}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 text-sm">ชื่อหนังสือ:</span>
                                                <p className="font-semibold">{book?.name}</p>
                                            </div>
                                        </div>

                                        <Link href={"/student/home"}>
                                            <Button
                                                color="success"
                                                className="w-full"
                                                size="lg"
                                                variant="shadow"
                                                startContent={<FaHouse />}
                                            >
                                                กลับหน้าหลัก
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-4">
                                        <div className="p-6">
                                            <FaEye className="text-4xl text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 text-sm">
                                                กดปุ่มด้านล่างเพื่อแสดงรหัสลงทะเบียน
                                            </p>
                                        </div>
                                        <Button
                                            color="warning"
                                            className="w-full"
                                            size="lg"
                                            variant="shadow"
                                            onPress={() => setShowRegisterCode(true)}
                                            startContent={<FaEye />}
                                        >
                                            แสดงรหัสลงทะเบียน
                                        </Button>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                )}

                {/* Footer Space */}
                <div className="h-20"></div>
            </div>
        </div>
    )
}