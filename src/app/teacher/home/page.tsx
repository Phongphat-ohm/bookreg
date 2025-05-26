"use client";
import Layout from "@/components/Teacher/Layout";
import { Image } from "@heroui/react";

export default function TeacherHomePage() {
    return (
        <>
            <Layout>
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <Image src={"/images/logo.png"} className="w-48" />
                    <h1 className="text-3xl font-bold text-blue-900 mt-3">ยินดีต้อนรับเข้าสู่ระบบลงทะเบียนหนังสือ</h1>
                    <h1 className="text-xl font-bold text-blue-900">จัดการข้อมูลหนังสือ รายงานการลงทะเบียนหนังสือ</h1>
                    <h1 className="text-lg font-bold text-blue-900">สำหรับครูผู้สอน</h1>
                </div>
            </Layout>
        </>
    )
}