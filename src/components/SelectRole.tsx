"use client";
import { Image } from "@heroui/react";
import Link from "next/link";

export default function SelectRole() {
    return (
        <div className="h-screen flex flex-col items-center max-lg:justify-start justify-center gap-3">
            <Image src={"/images/logo.png"} className="w-48 max-lg:mt-10" />
            <h1 className="text-xl">
                เลือกผู้ใช้งาน
            </h1>
            <div className="flex gap-5 max-lg:flex-col">
                <Link href={"/student"} className="p-10 flex flex-col items-center justify-center bg-blue-200 border-2 border-blue-500 rounded-xl cursor-pointer text-blue-500 hover:bg-blue-300 hover:scale-105 transition-all duration-200">
                    <Image src={"/images/icons/student.png"} className="w-36 h-36" />
                    <label className="mt-3">นักเรียน</label>
                </Link>
                <Link href={"/teacher"} className="p-10 flex flex-col items-center justify-center bg-red-200 border-2 border-red-500 rounded-xl cursor-pointer text-red-500 hover:bg-red-300 hover:scale-105 transition-all duration-200">
                    <Image src={"/images/icons/teacher.png"} className="w-36 h-36" />
                    <label className="mt-3">ครู/ผู้ดูแลระบบ</label>
                </Link>
            </div>
        </div>
    )
}