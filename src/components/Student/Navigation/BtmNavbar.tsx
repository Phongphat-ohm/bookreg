"use client";
import { useLoading } from "@/context/Student/LoadindContext";
import { useUser } from "@/context/Student/UserDataContext";
import { Spinner } from "@heroui/react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaHouse, FaPlus, FaClockRotateLeft } from "react-icons/fa6";

export default function BtmNavbar() {
    const path = usePathname();
    const router = useRouter();
    const { isLoading, setLoading } = useLoading();
    const { setUser, user } = useUser();

    const get_user = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/api/student/me',
        };

        try {
            const get_user = await axios(config);
            const user_data = get_user.data.data;

            if (get_user.data.status === 200) {
                setLoading(false);
                setUser(user_data);
            } else {
                router.push("/student");
            }
        } catch (error) {
            router.push("/student");
        }
    }

    useEffect(() => {
        get_user();
    }, []);

    return (
        <>
            {isLoading && (
                <div className="h-screen w-full flex flex-col items-center justify-center fixed top-0 left-0 z-50 bg-white">
                    <Spinner variant="dots" />
                    <h1 className="text-lg text-blue-500 mt-3">
                        กำลังโหลดข้อมูล
                    </h1>
                </div>
            )}
            <div className="fixed bottom-0 left-0 z-40 w-full max-sm:block hidden">
                <div className="w-full bg-white shadow-md px-3 py-3 flex justify-around items-center rounded-t-2xl border-t border-gray-200">
                    {navItems.map((item, idx) =>
                        item.isCenter ? (
                            <Link href={item.link} key={idx} className="relative flex flex-col items-center -mt-10">
                                <button className="flex items-center justify-center bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300">
                                    <FaPlus className="text-2xl" />
                                </button>
                                <span className="text-sm mt-1 text-blue-600 font-medium">ลงทะเบียนใหม่</span>
                            </Link>
                        ) : (
                            <Link href={item.link} key={idx} className={`flex flex-col items-center ${path == item.link ? "text-blue-700" : "text-gray-500"} transition-all duration-200 cursor-pointer`}>
                                <item.icon className="text-xl" />
                                <span className="text-xs mt-1">{item.label}</span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

const navItems = [
    { label: "หน้าหลัก", icon: FaHouse, link: "/student/home" },
    { isCenter: true, label: "ลงทะเบียนไหม่", icon: FaPlus, link: "/student/register" },
    { label: "ประวัติ", icon: FaClockRotateLeft, link: "/student/history" },
];
