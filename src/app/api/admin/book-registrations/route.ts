import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// DELETE - ลบการลงทะเบียนหนังสือ
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const registrationId = searchParams.get('registrationId');

        if (!registrationId) {
            return NextResponse.json({
                status: 400,
                message: "กรุณาระบุ ID การลงทะเบียน"
            });
        }

        // ตรวจสอบว่าการลงทะเบียนมีอยู่จริง
        const existingRegistration = await prisma.bookRegistration.findUnique({
            where: { id: parseInt(registrationId) },
            include: {
                student: {
                    select: {
                        name: true,
                        stu_code: true
                    }
                },
                book: {
                    select: {
                        name: true,
                        barcode: true
                    }
                }
            }
        });

        if (!existingRegistration) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลการลงทะเบียน"
            });
        }

        // ลบการลงทะเบียน
        await prisma.bookRegistration.delete({
            where: { id: parseInt(registrationId) }
        });

        return NextResponse.json({
            status: 200,
            message: `ลบการลงทะเบียนหนังสือ "${existingRegistration.book.name}" ของ ${existingRegistration.student.name} สำเร็จ`
        });

    } catch (error) {
        console.error("Error deleting book registration:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบการลงทะเบียน"
        });
    }
}