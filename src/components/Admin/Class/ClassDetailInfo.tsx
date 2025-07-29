"use client";
import { Card, CardBody, CardHeader, Avatar, Chip, Divider } from "@heroui/react";
import { UserCheck, Calendar, Hash } from "lucide-react";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface ClassDetailData {
    id: number;
    grade: string;
    name: string;
    advisors: Teacher[];
    students: any[];
    studentCount: number;
}

interface ClassDetailInfoProps {
    classData: ClassDetailData;
    onUpdate: () => void;
}

export default function ClassDetailInfo({ classData }: ClassDetailInfoProps) {
    const getGradeColor = (grade: string) => {
        const gradeNum = parseInt(grade);
        if (gradeNum <= 3) return "primary";
        if (gradeNum <= 6) return "success";
        return "warning";
    };

    return (
        <Card className="h-fit">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                        <UserCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">ข้อมูลห้องเรียน</h2>
                        <p className="text-sm text-gray-600">รายละเอียดและครูที่ปรึกษา</p>
                    </div>
                </div>
            </CardHeader>

            <Divider />

            <CardBody className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-600">ID ห้องเรียน</p>
                            <p className="text-lg font-semibold text-gray-800">#{classData.id}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-600">ชื่อเต็ม</p>
                            <div className="flex items-center gap-2">
                                <Chip 
                                    color={getGradeColor(classData.grade)}
                                    variant="solid"
                                    size="sm"
                                    className="font-semibold"
                                >
                                    ม.{classData.grade}
                                </Chip>
                                <p className="text-lg font-semibold text-gray-800">ห้อง {classData.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />

                {/* Advisors */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <p className="text-sm font-semibold text-gray-700">ครูที่ปรึกษา</p>
                        <Chip size="sm" color="primary" variant="flat">
                            {classData.advisors.length} คน
                        </Chip>
                    </div>

                    {classData.advisors.length > 0 ? (
                        <div className="space-y-3">
                            {classData.advisors.map((advisor, index) => (
                                <div key={advisor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Avatar 
                                        name={advisor.name.charAt(0)} 
                                        size="md"
                                        className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{advisor.name}</p>
                                        <p className="text-sm text-gray-500">@{advisor.username}</p>
                                        {index === 0 && classData.advisors.length > 1 && (
                                            <Chip size="sm" color="primary" variant="flat" className="mt-1">
                                                ครูที่ปรึกษาหลัก
                                            </Chip>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 bg-gray-50 rounded-lg">
                            <UserCheck className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">ยังไม่มีครูที่ปรึกษา</p>
                        </div>
                    )}
                </div>

                {/* Class Stats */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">สถิติห้องเรียน</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{classData.studentCount}</p>
                            <p className="text-xs text-gray-600">นักเรียนทั้งหมด</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{classData.advisors.length}</p>
                            <p className="text-xs text-gray-600">ครูที่ปรึกษา</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}