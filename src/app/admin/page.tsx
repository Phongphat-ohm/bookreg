"use client"
import AdminLayout from "@/components/Admin/Layout";
import { Image } from "@heroui/react";

export default function Admin() {
    return (
        <>
            <AdminLayout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <Image src={"/images/logo.png"} className="w-48" />
                    <h1 className="text-3xl font-bold text-red-900 mt-3">ยินดีต้อนรับเข้าสู่ระบบลงทะเบียนหนังสือ</h1>
                    <h1 className="text-xl font-bold text-red-900">จัดการข้อมูลหนังสือ รายงานการลงทะเบียนหนังสือ</h1>
                    <h1 className="text-lg font-bold text-red-900">สำหรับผู้ดูแลระบบ</h1>
                </div>
            </AdminLayout>
        </>
    )
}