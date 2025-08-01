import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงรายการวิชาทั้งหมด
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const subjectGroupId = searchParams.get('subjectGroupId');

        let whereCondition: any = {};

        if (subjectGroupId) {
            whereCondition.subject_group_id = parseInt(subjectGroupId);
        }

        const subjects = await prisma.subject.findMany({
            where: whereCondition,
            include: {
                SubjectGroup: {
                    select: {
                        id: true,
                        name: true,
                        members: {
                            where: {
                                role: "head"
                            },
                            select: {
                                teacher: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: [
                { grade: 'asc' },
                { name: 'asc' }
            ]
        });

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลวิชาสำเร็จ",
            data: subjects
        });

    } catch (error) {
        console.error("Error fetching subjects:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลวิชา"
        });
    }
}

// POST - สร้างวิชาใหม่
export async function POST(request: NextRequest) {
    try {
        const { code, name, grade, description, subject_group_id } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!code || !name || !grade || !subject_group_id) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบว่ารหัสวิชาซ้ำหรือไม่
        const existingSubject = await prisma.subject.findFirst({
            where: { code }
        });

        if (existingSubject) {
            return NextResponse.json({
                status: 400,
                message: "รหัสวิชานี้มีอยู่แล้ว"
            });
        }

        // ตรวจสอบว่ากลุ่มสาระมีอยู่จริง
        const subjectGroup = await prisma.subjectGroup.findUnique({
            where: { id: parseInt(subject_group_id) }
        });

        if (!subjectGroup) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบกลุ่มสาระที่เลือก"
            });
        }

        // สร้างวิชาใหม่
        const newSubject = await prisma.subject.create({
            data: {
                code,
                name,
                grade,
                description: description || null,
                subject_group_id: parseInt(subject_group_id)
            },
            include: {
                SubjectGroup: {
                    select: {
                        id: true,
                        name: true,
                        members: {
                            where: {
                                role: "head"
                            },
                            select: {
                                teacher: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({
            status: 201,
            message: "สร้างวิชาสำเร็จ",
            data: newSubject
        });

    } catch (error) {
        console.error("Error creating subject:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการสร้างวิชา"
        });
    }
}