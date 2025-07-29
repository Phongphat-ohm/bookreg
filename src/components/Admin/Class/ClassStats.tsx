"use client";
import { Card, CardBody } from "@heroui/react";
import { GraduationCap, Users, UserCheck, TrendingUp } from "lucide-react";

interface Teacher {
    id: number;
    name: string;
}

interface ClassData {
    id: number;
    grade: string;
    name: string;
    advisors: Teacher[];
    studentCount: number;
}

interface ClassStatsProps {
    classes: ClassData[];
    isFiltered?: boolean;
}

export default function ClassStats({ classes, isFiltered = false }: ClassStatsProps) {
    const totalClasses = classes.length;
    const totalStudents = classes.reduce((total, cls) => total + cls.studentCount, 0);
    const totalAdvisors = new Set(classes.flatMap(cls => cls.advisors.map(advisor => advisor.id))).size;
    const averageStudentsPerClass = totalClasses > 0 ? Math.round(totalStudents / totalClasses) : 0;

    const stats = [
        {
            title: isFiltered ? "ห้องเรียนที่พบ" : "จำนวนห้องเรียนทั้งหมด",
            value: totalClasses,
            icon: GraduationCap,
            gradient: "from-blue-500 to-blue-600",
            bgPattern: "bg-blue-50",
            iconBg: "bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            title: isFiltered ? "นักเรียนในผลการค้นหา" : "จำนวนนักเรียนทั้งหมด",
            value: totalStudents,
            icon: Users,
            gradient: "from-green-500 to-green-600",
            bgPattern: "bg-green-50",
            iconBg: "bg-green-100",
            textColor: "text-green-600"
        },
        {
            title: isFiltered ? "ครูที่ปรึกษาในผลการค้นหา" : "ครูที่ปรึกษาทั้งหมด",
            value: totalAdvisors,
            icon: UserCheck,
            gradient: "from-purple-500 to-purple-600",
            bgPattern: "bg-purple-50",
            iconBg: "bg-purple-100",
            textColor: "text-purple-600"
        },
        {
            title: "เฉลี่ยนักเรียนต่อห้อง",
            value: averageStudentsPerClass,
            icon: TrendingUp,
            gradient: "from-orange-500 to-orange-600",
            bgPattern: "bg-orange-50",
            iconBg: "bg-orange-100",
            textColor: "text-orange-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className={`${stat.bgPattern} border-2 border-white/50 hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600 mb-2">
                                    {stat.title}
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <p className={`text-3xl font-bold ${stat.textColor}`}>
                                        {stat.value.toLocaleString()}
                                    </p>
                                    {stat.title.includes('เฉลี่ย') && (
                                        <span className="text-sm text-gray-500">คน</span>
                                    )}
                                </div>
                            </div>
                            <div className={`${stat.iconBg} p-3 rounded-full shadow-sm`}><stat.icon className={`w-6 h-6 ${stat.textColor}`} /></div>
                        </div>

                        {/* Progress bar for visual appeal */}
                        <div className="mt-4">
                            <div className="w-full bg-white/60 rounded-full h-2">
                                <div
                                    className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full transition-all duration-1000 ease-out`}
                                    style={{
                                        width: `${Math.min(100, (stat.value / Math.max(...stats.map(s => s.value))) * 100)}%`
                                    }}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}
