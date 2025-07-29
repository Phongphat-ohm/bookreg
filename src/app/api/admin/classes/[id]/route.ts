import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const classId = parseInt(id);

        if (isNaN(classId)) {
            return NextResponse.json({
                status: 400,
                message: "ID ห้องเรียนไม่ถูกต้อง"
            });
        }

        const classData = await prisma.class.findUnique({
            where: { id: classId },
            include: {
                advisors: {
                    select: {
                        id: true,
                        name: true,
                        username: true
                    }
                },
                students: {
                    select: {
                        id: true,
                        name: true,
                        stu_code: true,
                        create_at: true
                    },
                    orderBy: {
                        name: 'asc'
                    }
                }
            }
        });

        if (!classData) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบห้องเรียนที่ระบุ"
            });
        }

        const result = {
            id: classData.id,
            grade: classData.grade,
            name: classData.name,
            advisors: classData.advisors,
            students: classData.students,
            studentCount: classData.students.length
        };

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลห้องเรียนสำเร็จ",
            data: result
        });

    } catch (error) {
        console.error("Error fetching class detail:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลห้องเรียน"
        });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const classId = parseInt(id);
        const body = await request.json();
        const { grade, name, advisorIds } = body;

        if (isNaN(classId)) {
            return NextResponse.json({
                status: 400,
                message: "ID ห้องเรียนไม่ถูกต้อง"
            });
        }

        // Validate required fields
        if (!grade || !name) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกระดับชั้นและชื่อห้องเรียน"
            });
        }

        // Check if class exists
        const existingClass = await prisma.class.findUnique({
            where: { id: classId }
        });

        if (!existingClass) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบห้องเรียนที่ระบุ"
            });
        }

        // Check if another class with same grade and name exists (excluding current class)
        const duplicateClass = await prisma.class.findFirst({
            where: {
                grade: grade,
                name: name,
                id: { not: classId }
            }
        });

        if (duplicateClass) {
            return NextResponse.json({
                status: 400,
                message: "มีห้องเรียนนี้อยู่ในระบบแล้ว"
            });
        }

        // Validate advisors if provided
        if (advisorIds && advisorIds.length > 0) {
            const advisors = await prisma.teacher.findMany({
                where: {
                    id: {
                        in: advisorIds
                    }
                }
            });

            if (advisors.length !== advisorIds.length) {
                return NextResponse.json({
                    status: 400,
                    message: "ไม่พบครูที่ปรึกษาบางคนในระบบ"
                });
            }
        }

        // Update class
        const updatedClass = await prisma.class.update({
            where: { id: classId },
            data: {
                grade: grade,
                name: name,
                advisors: {
                    set: [], // Clear existing advisors
                    connect: advisorIds && advisorIds.length > 0 ?
                        advisorIds.map((id: number) => ({ id })) : []
                }
            },
            include: {
                advisors: {
                    select: {
                        id: true,
                        name: true,
                        username: true
                    }
                },
                students: {
                    select: {
                        id: true
                    }
                }
            }
        });

        const result = {
            id: updatedClass.id,
            grade: updatedClass.grade,
            name: updatedClass.name,
            advisors: updatedClass.advisors,
            studentCount: updatedClass.students.length
        };

        return NextResponse.json({
            status: 200,
            message: "อัปเดตห้องเรียนสำเร็จ",
            data: result
        });

    } catch (error) {
        console.error("Error updating class:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการอัปเดตห้องเรียน"
        });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const classId = parseInt(id);

        if (isNaN(classId)) {
            return NextResponse.json({
                status: 400,
                message: "ID ห้องเรียนไม่ถูกต้อง"
            });
        }

        // Check if class exists
        const existingClass = await prisma.class.findUnique({
            where: { id: classId },
            include: {
                students: true
            }
        });

        if (!existingClass) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบห้องเรียนที่ระบุ"
            });
        }

        // Check if class has students
        if (existingClass.students.length > 0) {
            return NextResponse.json({
                status: 400,
                message: "ไม่สามารถลบห้องเรียนที่มีนักเรียนได้ กรุณาย้ายหรือลบนักเรียนก่อน"
            });
        }

        // Delete class
        await prisma.class.delete({
            where: { id: classId }
        });

        return NextResponse.json({
            status: 200,
            message: "ลบห้องเรียนสำเร็จ"
        });

    } catch (error) {
        console.error("Error deleting class:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบห้องเรียน"
        });
    }
}