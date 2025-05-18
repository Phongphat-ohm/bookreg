import Layout from "@/components/Teacher/Layout";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBook, FaBookOpenReader, FaChalkboardUser } from "react-icons/fa6";

export default function TeacherHomePage() {
    return (
        <>
            <Layout>
                <div className="w-full grid grid-cols-4 gap-5">
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full text-2xl text-green-500"><FaBookOpenReader /></div>
                            <div>
                                <p className="text-gray-500 text-sm">การลงทะเบียนหนังสือรวม</p>
                                <p className="text-xl font-bold text-gray-800"><label className="roboto-font font-bold">0</label> เล่ม</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-violet-100 p-3 rounded-full text-2xl text-violet-500"><FaChalkboardUser /></div>
                            <div>
                                <p className="text-gray-500 text-sm">รวมวิชาที่สอน</p>
                                <p className="text-xl font-bold text-gray-800"><label className="roboto-font font-bold">0</label> วิชา</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-yellow-100 p-3 rounded-full text-2xl text-yellow-500"><FaChalkboardTeacher /></div>
                            <div>
                                <p className="text-gray-500 text-sm">รวมห้องเรียนที่สอน</p>
                                <p className="text-xl font-bold text-gray-800"><label className="roboto-font font-bold">0</label> ห้อง</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 p-3 rounded-full text-2xl text-red-500"><FaBook /></div>
                            <div>
                                <p className="text-gray-500 text-sm">หนังสือทั้งหมดในปีการศึกษา </p>
                                <p className="text-xl font-bold text-gray-800"><label className="roboto-font font-bold">0</label> ห้อง</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}