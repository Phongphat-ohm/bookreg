import { useAdmin } from "@/context/Admin/AdminDataContext";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaBook, FaChalkboard, FaHouse, FaTable, FaUserGroup, FaUserTie } from "react-icons/fa6";

interface LinkList {
    name: string;
    href: string;
    icon: ReactNode;
}

const link_list: LinkList[] = [
    {
        name: "หน้าหลัก",
        href: "/admin",
        icon: <FaHouse />
    },
    {
        name: "ห้องเรียน/นักเรียน",
        href: "/admin/class",
        icon: <FaChalkboard />
    },
    {
        name: "กลุ่มสาระ",
        href: "/admin/subject_group",
        icon: <FaUserGroup />
    },
    {
        name: "วิชา",
        href: "/admin/subject",
        icon: <FaTable />
    },
    {
        name: "บุคคลากร",
        href: "/admin/teacher",
        icon: <FaUserTie />
    },
    {
        name: "หนังสือ",
        href: "/admin/book",
        icon: <FaBook />
    }
]

export default function Sidebar() {
    const { admin } = useAdmin();

    return (
        <>
            <div className="w-96 bg-white h-screen">
                <div className="w-full h-48 bg-red-200 flex gap-3 flex-col items-center justify-center">
                    <div className="p-1 bg-white rounded-xl shadow">
                        <Image src={"/images/logo.png"} className="w-28" />
                    </div>
                    <h1 className="text-lg font-bolf">
                        {admin?.name}
                    </h1>
                    <Link href={"/teacher/logout"}>
                        <Button color="danger" variant="shadow" size="sm" radius="sm">
                            ออกจากระบบ
                        </Button>
                    </Link>
                </div>
                <ul className="p-5 flex flex-col gap-3">
                    {link_list.map((val, index) => (
                        <li key={index}>
                            <Link href={val.href}>
                                <Button size="lg" variant="bordered" color="danger" className="w-full" startContent={
                                    val.icon
                                }>
                                    {val.name}
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}