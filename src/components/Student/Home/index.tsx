"use client";
import { FaBook, FaUser, FaGraduationCap, FaCalendar } from "react-icons/fa6";
import { FaSignOutAlt, FaChartLine } from "react-icons/fa";
import BtmNavbar from "../Navigation/BtmNavbar";
import { Button, Card, CardBody, CardHeader, Divider, Chip } from "@heroui/react";
import Link from "next/link";
import { useUser } from "@/context/Student/UserDataContext";


export default function StudentHomePage() {
    const { user } = useUser();

    const getCurrentTime = () => {
        const now = new Date();
        const hour = now.getHours();
        if (hour < 12) return "สวัสดีตอนเช้า";
        if (hour < 17) return "สวัสดีตอนบ่าย";
        return "สวัสดีตอนเย็น";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <BtmNavbar />
            
            <div className="p-4 space-y-6">
                {/* Welcome Card */}
                <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-500 to-indigo-600">
                    <CardBody className="p-6">
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaUser className="text-white/80" />
                                    <p className="text-white/90 text-sm font-medium">{getCurrentTime()}</p>
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-1">
                                    {user?.name}
                                </h1>
                                <div className="flex items-center gap-2 mb-4">
                                    <FaGraduationCap className="text-white/80 text-sm" />
                                    <p className="text-white/90 text-sm">
                                        มัธยมศึกษาปีที่ {user?.class.grade} ห้อง {user?.class.name}
                                    </p>
                                </div>
                                <Link href={"/student/logout"}>
                                    <Button 
                                        color="danger" 
                                        variant="shadow"
                                        size="sm"
                                        startContent={<FaSignOutAlt />}
                                        className="font-medium"
                                    >
                                        ออกจากระบบ
                                    </Button>
                                </Link>
                            </div>
                            <div className="hidden sm:block">
                                <img 
                                    src="/images/icons/student.png" 
                                    className="w-24 h-24 object-contain opacity-90" 
                                    alt="Student Icon" 
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Registration Count Card */}
                    <Card className="shadow-lg border-0">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500">
                                    <FaBook className="text-white text-lg" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">หนังสือที่ลงทะเบียน</h3>
                                    <div className="flex items-end gap-1">
                                        <span className="text-2xl font-bold text-gray-800">
                                            {user?.registrations.length || 0}
                                        </span>
                                        <span className="text-sm text-gray-500 mb-1">เล่ม</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <div className="flex items-center justify-between">
                                <Chip 
                                    color="success" 
                                    variant="flat" 
                                    size="sm"
                                    startContent={<FaChartLine className="text-xs" />}
                                >
                                    ลงทะเบียนแล้ว
                                </Chip>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Date Card */}
                    <Card className="shadow-lg border-0">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500">
                                    <FaCalendar className="text-white text-lg" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">วันที่ปัจจุบัน</h3>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {new Date().toLocaleDateString('th-TH', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <p className="text-sm text-gray-500">
                                {new Date().toLocaleDateString('th-TH', { weekday: 'long' })}
                            </p>
                        </CardBody>
                    </Card>
                </div>

                {/* Quick Actions Card */}
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <h3 className="text-lg font-semibold text-gray-800">เมนูหลัก</h3>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="grid grid-cols-1 gap-3">
                            <Link href="/student/register">
                                <Button 
                                    className="w-full justify-start h-14" 
                                    variant="flat"
                                    color="primary"
                                    startContent={
                                        <div className="p-2 rounded-lg bg-blue-100">
                                            <FaBook className="text-blue-600" />
                                        </div>
                                    }
                                >
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold">ลงทะเบียนหนังสือใหม่</p>
                                        <p className="text-xs text-gray-500">สแกนหรือค้นหาหนังสือเพื่อลงทะเบียน</p>
                                    </div>
                                </Button>
                            </Link>
                            
                            <Link href="/student/history">
                                <Button 
                                    className="w-full justify-start h-14" 
                                    variant="flat"
                                    color="success"
                                    startContent={
                                        <div className="p-2 rounded-lg bg-green-100">
                                            <FaChartLine className="text-green-600" />
                                        </div>
                                    }
                                >
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold">หนังสือของฉัน</p>
                                        <p className="text-xs text-gray-500">ดูรายการหนังสือที่ลงทะเบียนแล้ว</p>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>

                {/* Footer Space */}
                <div className="h-20"></div>
            </div>
        </div>
    )
}