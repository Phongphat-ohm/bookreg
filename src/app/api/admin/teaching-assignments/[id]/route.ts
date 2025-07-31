import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// DELETE - ลบการสอน
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

        // ตรวจสอบว่าการสอนมีอยู่จริง
        const existingAssignment = await prisma.teachingAssignment.findUnique({
            where: { id }
        });

        if (!existingAssignment) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบการสอนที่ต้องการลบ"
            });
        }

        // ลบการสอน
        await prisma.teachingAssignment.delete({
            where: { id }
        });

        return NextResponse.json({
            status: 200,
            message: "ลบการสอนสำเร็จ"
        });

    } catch (error) {
        console.error("Error deleting teaching assignment:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบการสอน"
        });
    }
}