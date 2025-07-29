import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const teachers = await prisma.teacher.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                advisingClasses: {
                    select: {
                        id: true,
                        grade: true,
                        name: true
                    }
                }
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