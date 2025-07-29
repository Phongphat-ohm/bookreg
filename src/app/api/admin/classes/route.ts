import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const classes = await prisma.class.findMany({
            include: {
                advisors: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                students: {
                    select: {
                        id: true
                    }
                }
            },
            orderBy: [
                { grade: 'asc' },
                { name: 'asc' }
            ]
        });

        const classesWithCount = classes.map(classItem => ({
            id: classItem.id,
            grade: classItem.grade,
            name: classItem.name,
            advisors: classItem.advisors,
            studentCount: classItem.students.length
        }));

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลห้องเรียนสำเร็จ",
            data: classesWithCount
        });

    } catch (error) {
        console.error("Error fetching classes:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลห้องเรียน"
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { grade, name, advisorIds } = body;

        // Validate required fields
        if (!grade || !name) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกระดับชั้นและชื่อห้องเรียน"
            });
        }

        // Check if class already exists
        const existingClass = await prisma.class.findFirst({
            where: {
                grade: grade,
                name: name
            }
        });

        if (existingClass) {
            return NextResponse.json({
                status: 400,
                message: "ห้องเรียนนี้มีอยู่ในระบบแล้ว"
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

        // Create new class
        const newClass = await prisma.class.create({
            data: {
                grade: grade,
                name: name,
                advisors: advisorIds && advisorIds.length > 0 ? {
                    connect: advisorIds.map((id: number) => ({ id }))
                } : undefined
            },
            include: {
                advisors: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                students: {
                    select: {
                        id: true
                    }
                }
            }
        });

        const classWithCount = {
            id: newClass.id,
            grade: newClass.grade,
            name: newClass.name,
            advisors: newClass.advisors,
            studentCount: newClass.students.length
        };

        return NextResponse.json({
            status: 201,
            message: "เพิ่มห้องเรียนสำเร็จ",
            data: classWithCount
        });

    } catch (error) {
        console.error("Error creating class:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการเพิ่มห้องเรียน"
        });
    }
}