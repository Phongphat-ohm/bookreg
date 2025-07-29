"use client";
import BtmNavbar from "@/components/Student/Navigation/BtmNavbar";
import { useUser } from "@/context/Student/UserDataContext";
import { addToast, Button, Spinner } from "@heroui/react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";

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
        }
    }

    return (
        <>
            <div className="min-h-screen w-full bg-gray-100">
                <BtmNavbar />
                <div className="w-full flex gap-2 items-center justify-between p-4 bg-gray-50 shadow sticky top-0 left-0">
                    <div className="flex gap-3 items-center">
                        <Link href={"/student/register"}>
                            <Button isIconOnly size="sm" radius="full" variant="shadow">
                                <FaChevronLeft />
                            </Button>
                        </Link>
                        <h1 className="text-lg text-blue-500">
                            ยืนยันการลงทะเบียน
                        </h1>
                    </div>
                    <img src={"/images/logo.png"} className="w-20" />
                </div>
                {registerData === null ? (
                    <>
                        {book === null ? (
                            <div className="p-5">
                                <div className="p-5 bg-white rounded-lg shadow-xl border-l-4 border-blue-500 h-48 flex items-center justify-center">
                                    <Spinner />
                                </div>
                                <div className="p-5 bg-white rounded-lg shadow-xl border-l-4 border-violet-500 mt-3 h-80  flex items-center justify-center">
                                    <Spinner />
                                </div>
                                {/* <div className="mt-3 flex justify-center items-center gap-3 w-full">
                                    <Button onPress={confirm_register} color="primary">ลงทะเบียน</Button>
                                    <Link href={"/student/register"}>
                                        <Button color="danger">ยกเลิก</Button>
                                    </Link>
                                </div> */}
                            </div>
                        ) : (
                            <div className="p-5">
                                <div className="p-5 bg-white rounded-lg shadow-xl border-l-4 border-blue-500">
                                    <div className="text-gray-500 text-sm">ข้อมูลนักเรียน</div>
                                    <table className="border border-gray-200 rounded-md shadow-sm overflow-hidden mt-2 w-full">
                                        <tbody>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสนักเรียน</td>
                                                <td className="p-3 border-b border-gray-200">{user?.stu_code}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700">ชื่อ</td>
                                                <td className="p-3">{user?.name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-5 bg-white rounded-lg shadow-xl border-l-4 border-violet-500 mt-3">
                                    <div className="text-gray-500 text-sm">ข้อมูลหนังสือ</div>
                                    <table className="border border-gray-200 rounded-md shadow-sm overflow-hidden mt-2 w-full">
                                        <tbody>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสวิชา</td>
                                                <td className="p-3 border-b border-gray-200">{book?.subject.code}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ชื่อวิชา</td>
                                                <td className="p-3 border-b border-gray-200">{book?.subject.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ระดับชั้น</td>
                                                <td className="p-3 border-b border-gray-200">{book?.subject.grade}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสหนังสือ</td>
                                                <td className="p-3 border-b border-gray-200">{book?.barcode}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ชื่อหนังสือ</td>
                                                <td className="p-3 border-b border-gray-200">{book?.name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-3 flex justify-center items-center gap-3 w-full">
                                    <Button onPress={confirm_register} color="primary">ลงทะเบียน</Button>
                                    <Link href={"/student/register"}>
                                        <Button color="danger">ยกเลิก</Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="p-5 mt-3">
                        <div className="p-5 bg-white rounded-lg shadow-xl border-l-4 border-green-500">
                            <label className="text-gray-500 text-center">กรุณาเขียนรหัสลงทะเบียนที่หน้าแรกสุดมุมขวาบนของหนังสือ</label>
                            {showRegisterCode ? (
                                <div className="flex flex-col gap-2">
                                    <table className="border border-gray-200 rounded-md shadow-sm overflow-hidden mt-2">
                                        <tbody>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ชื่อวิชา</td>
                                                <td className="p-3 border-b border-gray-200">{book?.subject.code}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสวิชา</td>
                                                <td className="p-3 border-b border-gray-200">{book?.subject.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ชื่อหนังสือ</td>
                                                <td className="p-3 border-b border-gray-200">{book?.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสลงทะเบียน</td>
                                                <td className="p-3 border-b border-gray-200 text-red-500 font-bold">{registerData.register_code}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link href={"/student/home"}>
                                        <Button color="success" className="w-full">
                                            สำเร็จ
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Button color="warning" className="w-full mt-3" onPress={() => { setShowRegisterCode(true) }}>แสดงรหัสลงทะเบียน</Button>
                            )}
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}