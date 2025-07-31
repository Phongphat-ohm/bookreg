import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงรายการครูทั้งหมด
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const excludeGroupId = searchParams.get('excludeGroupId'); // สำหรับการแก้ไข
        const availableOnly = searchParams.get('availableOnly') === 'true'; // เฉพาะครูที่ยังไม่เป็นหัวหน้า
        const includeStats = searchParams.get('includeStats') === 'true'; // รวมสถิติ

        let whereCondition: any = {};

        if (availableOnly) {
            // ดึงเฉพาะครูที่ยังไม่เป็นสมาชิกกลุ่มสาระใดๆ
            const existingMembers = await prisma.subjectGroupMembership.findMany({
                select: { teacher_id: true },
                where: excludeGroupId ? {
                    subject_group_id: { not: parseInt(excludeGroupId) }
                } : undefined
            });

            const usedTeacherIds = existingMembers.map(member => member.teacher_id);

            whereCondition = {
                id: { notIn: usedTeacherIds }
            };
        }

        const teachers = await prisma.teacher.findMany({
            where: whereCondition,
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                create_at: true,
                update_at: true,
                subjectMembership: includeStats ? {
                    select: {
                        id: true,
                        role: true,
                        joined_at: true,
                        subject_group: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                } : false,
                advisingClasses: includeStats ? {
                    select: {
                        id: true,
                        grade: true,
                        name: true
                    }
                } : false,
                teachingAssignments: includeStats ? {
                    select: {
                        id: true,
                        subject: {
                            select: {
                                id: true,
                                name: true,
                                code: true
                            }
                        }
                    }
                } : false
            },
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลครูสำเร็จ",
            data: teachers
        });

    } catch (error) {
        console.error("Error fetching teachers:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลครู"
        });
    }
}

// POST - สร้างครูใหม่
export async function POST(request: NextRequest) {
    try {
        const { name, username, password, role } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!name || !username || !password) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบ role
        if (role && !['teacher', 'admin'].includes(role)) {
            return NextResponse.json({
                status: 400,
                message: "Role ต้องเป็น teacher หรือ admin เท่านั้น"
            });
        }

        // ตรวจสอบว่า username ซ้ำหรือไม่
        const existingTeacher = await prisma.teacher.findUnique({
            where: { username }
        });

        if (existingTeacher) {
            return NextResponse.json({
                status: 400,
                message: "Username นี้มีอยู่แล้ว"
            });
        }

        // เข้ารหัสรหัสผ่าน
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้างครูใหม่
        const newTeacher = await prisma.teacher.create({
            data: {
                name: name.trim(),
                username: username.trim(),
                password: hashedPassword,
                role: role || 'teacher'
            },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                create_at: true,
                update_at: true
            }
        });

        return NextResponse.json({
            status: 201,
            message: "สร้างครูสำเร็จ",
            data: newTeacher
        });

    } catch (error) {
        console.error("Error creating teacher:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการสร้างครู"
        });
    }
}