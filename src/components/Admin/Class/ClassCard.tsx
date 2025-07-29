"use client";
import { Card, CardBody, CardHeader, Chip, Avatar, Divider } from "@heroui/react";
import { Users, UserCheck, BookOpen, Star } from "lucide-react";

interface Teacher {
    id: number;
    name: string;
}

interface ClassCardProps {
    id: number;
    grade: string;
    name: string;
    advisors: Teacher[];
    studentCount: number;
    onClick?: () => void;
}

export default function ClassCard({ grade, name, advisors, studentCount, onClick }: ClassCardProps) {
    const getGradeColor = (grade: string) => {
        const gradeNum = parseInt(grade);
        if (gradeNum <= 3) return "primary";
        if (gradeNum <= 6) return "success";
        return "warning";
    };

    const getGradientClass = (grade: string) => {
        const gradeNum = parseInt(grade);
        if (gradeNum <= 3) return "from-blue-50 to-blue-100 border-blue-200";
        if (gradeNum <= 6) return "from-green-50 to-green-100 border-green-200";
        return "from-orange-50 to-orange-100 border-orange-200";
    };

    const getIconColor = (grade: string) => {
        const gradeNum = parseInt(grade);
        if (gradeNum <= 3) return "text-blue-600";
        if (gradeNum <= 6) return "text-green-600";
        return "text-orange-600";
    };

    return (
        <Card 
            className={`hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${getGradientClass(grade)} border-2 hover:border-opacity-60 ${onClick ? 'cursor-pointer' : ''}`}
            isPressable={!!onClick}
            onPress={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start w-full">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full bg-white shadow-sm ${getIconColor(grade)}`}>
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">
                                ม.{grade}/{name}
                            </h3>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <Divider className="opacity-30" />

            <CardBody className="pt-4">
                <div className="space-y-4">
                    {/* Advisors Section */}
                    <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <UserCheck className={`w-4 h-4 ${getIconColor(grade)}`} />
                            <p className="text-sm font-semibold text-gray-700">ครูที่ปรึกษา</p>
                        </div>
                        {advisors.length > 0 ? (
                            <div className="space-y-2">
                                {advisors.map((advisor, index) => (
                                    <div key={advisor.id} className="flex items-center gap-2">
                                        <Avatar
                                            name={advisor.name.charAt(0)}
                                            size="sm"
                                            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                {advisor.name}
                                            </p>
                                            {index === 0 && advisors.length > 1 && (
                                                <p className="text-xs text-gray-500">ครูที่ปรึกษาหลัก</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-gray-400">
                                <Avatar size="sm" className="bg-gray-200" />
                                <p className="text-sm italic">ยังไม่มีครูที่ปรึกษา</p>
                            </div>
                        )}
                    </div>

                    {/* Student Count Section */}
                    <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className={`w-4 h-4 ${getIconColor(grade)}`} />
                                <p className="text-sm font-semibold text-gray-700">จำนวนนักเรียน</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-2xl font-bold ${getIconColor(grade)}`}>
                                        {studentCount}
                                    </span>
                                    <span className="text-sm text-gray-500">คน</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${studentCount > 35 ? 'bg-red-400' :
                                        studentCount > 30 ? 'bg-yellow-400' :
                                            'bg-green-400'
                                        }`} />
                                    <span className="text-xs text-gray-500">
                                        {studentCount > 40 ? 'เต็ม' :
                                            studentCount > 35 ? 'ใกล้เต็ม' :
                                                'ปกติ'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}