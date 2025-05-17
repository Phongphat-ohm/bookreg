"use client";
import { FaBook } from "react-icons/fa6";
import BtmNavbar from "../Navigation/BtmNavbar";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useUser } from "@/context/Student/UserDataContext";


export default function StudentHomePage() {
    const { setUser, user } = useUser();

    return (
        <>
            <div className="h-screen bg-gray-100">
                <BtmNavbar />
                <div className="p-5">
                    <div className="w-full p-5 pb-0 rounded-lg bg-white shadow-xl  border border-gray-200">
                        <div className="flex gap-3 justify-between items-end">

                            <div className="flex flex-col">
                                <h1 className="text-xl">
                                    ยินดีตอนรับ,<br /> <span className="text-blue-500 text-2xl">คุณ{user?.name}</span>
                                </h1>
                                <label className="text-gray-500 text-sm mt-2">ชั้น มัธยมศึกษาปีที่ {user?.class.grade} ห้อง {user?.class.name} </label>
                                <div className="mt-1 mb-3">
                                    <Link href={"/student/logout"}>
                                        <Button color="danger" size="sm">ออกจากระบบ</Button>
                                    </Link>
                                </div>
                            </div>
                            <img src="/images/icons/student.png" className="w-32" alt="" />
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-xl border border-gray-200 flex items-center gap-4 mt-4">
                        <div className={`p-3 rounded-full bg-green-500`}>
                            <FaBook className="text-white text-xl" />
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">จำนวนการลงทะเบียน</h4>
                            <div className="flex items-end gap-2">
                                <p className="text-2xl font-semibold roboto-font text-gray-800">{user?.registrations.length}</p>
                                <p className="text-gray-500 mb-0.5 text-sm">เล่ม</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}