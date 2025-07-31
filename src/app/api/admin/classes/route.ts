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