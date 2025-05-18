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
        <nav className="p-5 top-0 left-0 sticky">
            <div className="flex justify-between items-center w-full bg-blue-900 shadow-md p-5 text-white">
                <div className="text-sm">{dateTime}</div>
                <Link href={"settings"} className="hover:text-gray-100 flex gap-2 items-center">
                    ตั้งค่าส่วนบุคคล
                    <FaGears />
                </Link>
            </div>
        </nav>
    );
}
