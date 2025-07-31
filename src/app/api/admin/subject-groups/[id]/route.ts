import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงข้อมูลกลุ่มสาระตาม ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const id = Number(paramId);

        if (isNaN(id)) {
            return NextResponse.json({
                status: 400,
                message: "ID ไม่ถูกต้อง"
            });
        }

        const subjectGroup = await prisma.subjectGroup.findUnique({
            where: { id },
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
                        grade: true,
                        description: true,
                        teachingAssignments: {
                            select: {
                                id: true,
                                teacher: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true
                                    }
                                },
                                class: {
                                    select: {
                                        id: true,
                                        grade: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!subjectGroup) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบกลุ่มสาระที่ต้องการ"
            });
        }

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลกลุ่มสาระสำเร็จ",
            data: subjectGroup
        });

    } catch (error) {
        console.error("Error fetching subject group:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลกลุ่มสาระ"
        });
    }
}

// PUT - แก้ไขข้อมูลกลุ่มสาระ
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const id = parseInt(paramId);
        const { name } = await request.json();

        if (isNaN(id)) {
            return NextResponse.json({
                status: 400,
                message: "ID ไม่ถูกต้อง"
            });
        }

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!name) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกชื่อกลุ่มสาระ"
            });
        }

        // ตรวจสอบว่ากลุ่มสาระมีอยู่จริง
        const existingGroup = await prisma.subjectGroup.findUnique({
            where: { id }
        });

        if (!existingGroup) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบกลุ่มสาระที่ต้องการแก้ไข"
            });
        }

        // ตรวจสอบว่าชื่อกลุ่มสาระซ้ำหรือไม่ (ยกเว้นตัวเอง)
        const duplicateGroup = await prisma.subjectGroup.findFirst({
            where: {
                name,
                id: { not: id }
            }
        });

        if (duplicateGroup) {
            return NextResponse.json({
                status: 400,
                message: "ชื่อกลุ่มสาระนี้มีอยู่แล้ว"
            });
        }

        // อัปเดตข้อมูลกลุ่มสาระ
        const updatedSubjectGroup = await prisma.subjectGroup.update({
            where: { id },
            data: { name },
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
            status: 200,
            message: "แก้ไขกลุ่มสาระสำเร็จ",
            data: updatedSubjectGroup
        });

    } catch (error) {
        console.error("Error updating subject group:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการแก้ไขกลุ่มสาระ"
        });
    }
}

// DELETE - ลบกลุ่มสาระ
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const id = parseInt(paramId);

        if (isNaN(id)) {
            return NextResponse.json({
                status: 400,
                message: "ID ไม่ถูกต้อง"
            });
        }

        // ตรวจสอบว่ากลุ่มสาระมีอยู่จริง
        const existingGroup = await prisma.subjectGroup.findUnique({
            where: { id },
            include: {
                subjects: true
            }
        });

        if (!existingGroup) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบกลุ่มสาระที่ต้องการลบ"
            });
        }

        // ตรวจสอบว่ามีวิชาในกลุ่มสาระหรือไม่
        if (existingGroup.subjects.length > 0) {
            return NextResponse.json({
                status: 400,
                message: `ไม่สามารถลบกลุ่มสาระได้ เนื่องจากมีวิชาอยู่ในกลุ่มสาระนี้ ${existingGroup.subjects.length} วิชา`
            });
        }

        // ลบกลุ่มสาระ
        await prisma.subjectGroup.delete({
            where: { id }
        });

        return NextResponse.json({
            status: 200,
            message: "ลบกลุ่มสาระสำเร็จ"
        });

    } catch (error) {
        console.error("Error deleting subject group:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบกลุ่มสาระ"
        });
    }
}