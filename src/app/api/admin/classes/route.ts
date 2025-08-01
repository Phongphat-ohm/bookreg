import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงรายการห้องเรียนทั้งหมด
export async function GET() {
    try {
        const classes = await prisma.class.findMany({
            select: {
                id: true,
                grade: true,
                name: true,
                students: {
                    select: {
                        id: true
                    }
                },
                advisors: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: [
                { grade: 'asc' },
                { name: 'asc' }
            ]
        });

        // เพิ่มจำนวนนักเรียนและครูที่ปรึกษา
        const classesWithCount = classes.map(classItem => ({
            id: classItem.id,
            grade: classItem.grade,
            name: classItem.name,
            studentCount: classItem.students.length,
            advisors: classItem.advisors || []
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

// POST - สร้างห้องเรียนใหม่
export async function POST(request: NextRequest) {
    try {
        const { grade, name, advisorIds } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!grade || !name) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกระดับชั้นและชื่อห้องเรียน"
            });
        }

        // ตรวจสอบว่าห้องเรียนซ้ำหรือไม่
        const existingClass = await prisma.class.findFirst({
            where: {
                grade: grade,
                name: name.trim()
            }
        });

        if (existingClass) {
            return NextResponse.json({
                status: 400,
                message: `ห้องเรียน ม.${grade}/${name} มีอยู่แล้ว`
            });
        }

        // ตรวจสอบว่าครูที่ปรึกษามีอยู่จริงและยังไม่เป็นครูที่ปรึกษาห้องอื่น
        if (advisorIds && advisorIds.length > 0) {
            const teachers = await prisma.teacher.findMany({
                where: {
                    id: { in: advisorIds }
                },
                include: {
                    advisingClasses: true
                }
            });

            // ตรวจสอบว่าครูทุกคนมีอยู่จริง
            if (teachers.length !== advisorIds.length) {
                return NextResponse.json({
                    status: 400,
                    message: "พบครูที่ไม่มีอยู่ในระบบ"
                });
            }

            // ตรวจสอบว่าครูยังไม่เป็นครูที่ปรึกษาห้องอื่น
            const busyTeachers = teachers.filter(teacher => teacher.advisingClasses.length > 0);
            if (busyTeachers.length > 0) {
                const busyNames = busyTeachers.map(t => t.name).join(', ');
                return NextResponse.json({
                    status: 400,
                    message: `ครู ${busyNames} เป็นครูที่ปรึกษาห้องอื่นอยู่แล้ว`
                });
            }
        }

        // สร้างห้องเรียนใหม่
        const newClass = await prisma.class.create({
            data: {
                grade: grade,
                name: name.trim(),
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

        return NextResponse.json({
            status: 201,
            message: "สร้างห้องเรียนสำเร็จ",
            data: {
                id: newClass.id,
                grade: newClass.grade,
                name: newClass.name,
                studentCount: newClass.students.length,
                advisors: newClass.advisors
            }
        });

    } catch (error) {
        console.error("Error creating class:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการสร้างห้องเรียน"
        });
    }
}