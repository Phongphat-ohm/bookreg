import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงรายการปีการศึกษาทั้งหมด
export async function GET() {
    try {
        const academicYears = await prisma.academicYear.findMany({
            orderBy: {
                year: 'desc'
            }
        });

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลปีการศึกษาสำเร็จ",
            data: academicYears
        });

    } catch (error) {
        console.error("Error fetching academic years:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลปีการศึกษา"
        });
    }
}