import Layout from "@/components/Teacher/Layout";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-96 flex flex-col justify-center items-center">
            <h1 className="text-4xl text-red-500">
                404 Not Found
            </h1>
            <label className="text-gray-500">ไม่พบหน้าที่ต้องการค้นหา <Link href="/">กดทีนี่เพื่อไปที่หน้าแรก</Link></label>
        </div>
    )
}