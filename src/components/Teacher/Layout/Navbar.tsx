import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGears } from "react-icons/fa6";

export default function Navbar() {
    const [dateTime, setDateTime] = useState<string>("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleString(); // หรือจะใช้ format เองก็ได้
            setDateTime(formatted);
        };

        updateDateTime(); // อัปเดตครั้งแรกก่อน interval
        const interval = setInterval(updateDateTime, 1000); // อัปเดตทุก 1 วิ

        return () => clearInterval(interval); // เคลียร์เมื่อ component ถูก unmount
    }, []);

    return (
        <nav className="p-5 top-0 left-0 sticky z-20">
            <div className="flex justify-between items-center w-full bg-blue-900 shadow-md p-5 text-white">
                <div className="text-sm">{dateTime}</div>
                <Link href={"/teacher/setting"} className="hover:text-gray-100 flex gap-2 items-center transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-800">
                    <FaGears className="w-4 h-4" />
                    ตั้งค่าส่วนบุคคล
                </Link>
            </div>
        </nav>
    );
}
