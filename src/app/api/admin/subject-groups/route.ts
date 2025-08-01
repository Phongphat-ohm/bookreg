import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงรายการกลุ่มสาระทั้งหมด
export async function GET() {
    try {
        const subjectGroups = await prisma.subjectGroup.findMany({
            include: {
                members: {
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        }
                    },
                    orderBy: [
                        { role: 'desc' }, // หัวหน้าขึ้นก่อน
                        { teacher: { name: 'asc' } }
                    ]
                },
                subjects: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        grade: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลกลุ่มสาระสำเร็จ",
            data: subjectGroups
        });

    } catch (error) {
        console.error("Error fetching subject groups:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลกลุ่มสาระ"
        });
    }
}

// POST - สร้างกลุ่มสาระใหม่
export async function POST(request: NextRequest) {
    try {
        const { name, header_id } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!name || !header_id) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบว่าชื่อกลุ่มสาระซ้ำหรือไม่
        const existingGroup = await prisma.subjectGroup.findFirst({
            where: { name }
        });

        if (existingGroup) {
            return NextResponse.json({
                status: 400,
                message: "ชื่อกลุ่มสาระนี้มีอยู่แล้ว"
            });
        }

        // ตรวจสอบว่าครูมีอยู่จริง
        const teacher = await prisma.teacher.findUnique({
            where: { id: parseInt(header_id) }
        });

        if (!teacher) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลครูที่เลือก"
            });
        }

        // ตรวจสอบว่าครูเป็นสมาชิกกลุ่มสาระอื่นแล้วหรือไม่
        const existingMembership = await prisma.subjectGroupMembership.findUnique({
            where: { teacher_id: parseInt(header_id) },
            include: {
                subject_group: true
            }
        });

        if (existingMembership) {
            return NextResponse.json({
                status: 400,
                message: `ครู ${teacher.name} เป็นสมาชิกกลุ่มสาระ "${existingMembership.subject_group.name}" อยู่แล้ว`
            });
        }

        // สร้างกลุ่มสาระใหม่พร้อมกับสมาชิกหัวหน้า
        const newSubjectGroup = await prisma.subjectGroup.create({
            data: {
                name,
                members: {
                    create: {
                        teacher_id: parseInt(header_id),
                        role: "head"
                    }
                }
            },
            include: {
                members: {
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        }
                    }
                },
                subjects: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        grade: true
                    }
                }
            }
        });

        return NextResponse.json({
            status: 201,
            message: "สร้างกลุ่มสาระสำเร็จ",
            data: newSubjectGroup
        });

    } catch (error) {
        console.error("Error creating subject group:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการสร้างกลุ่มสาระ"
        });
    }
}