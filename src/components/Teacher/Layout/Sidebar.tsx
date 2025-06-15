"use client";
import { useTeacher } from "@/context/Teacher/TeacherDataContext";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRightFromBracket, FaBook, FaChalkboard, FaChartSimple, FaHouse, } from "react-icons/fa6";

export default function Sidebar() {
    const { teacher } = useTeacher();
    const path_name = usePathname();

    const link_list = [
        {
            icon: <FaHouse />,
            name: "หน้าหลัก",
            link: "/teacher/home"
        },
        {
            icon: <FaChartSimple />,
            name: "รายงาน",
            link: "/teacher/report"
        },
        {
            icon: <FaChalkboard />,
            name: "ห้องเรียน",
            link: "/teacher/class"
        },
        {
            icon: <FaBook />,
            name: "หนังสือ",
            link: "/teacher/book"
        }
    ]

    return (
        <div className="w-96 bg-white min-h-screen relative">
            <div className="p-5 bg-blue-900 flex flex-col items-center justify-center w-full sticky top-0 left-0">
                <div className="bg-white p-3 rounded-lg shadow-lg">
                    <Image src={"/images/logo.png"} className="w-20" />
                </div>
                <div className="mt-2 flex flex-col text-white">
                    <label>{teacher?.name}</label>
                    <Link href={"logout"} className="mt-2 flex justify-center">
                        <Button color="danger" size="sm" >
                            ออกจากระบบ
                        </Button>
                    </Link>
                </div>
            </div>
            <ul className="p-5 flex flex-col gap-5">
                {link_list.map((val, index) => (
                    <li key={index}>
                        <Link href={val.link}>
                            <Button startContent={val.icon} className={`w-full ${path_name !== val.link && "text-gray-600"}`} size="lg" variant="ghost" color={path_name === val.link ? "primary" : "default"}>
                                {val.name}
                            </Button>
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href={"/teacher/logout"}>
                        <Button startContent={<FaArrowRightFromBracket />} className="w-full" size="lg" variant="ghost" color={"danger"}>
                            ออกจากระบบ
                        </Button>
                    </Link>
                </li>
            </ul>
        </div >
    )
}