import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const studentId = parseInt(id);
        const body = await request.json();
        const { name, stu_code, password } = body;

        if (isNaN(studentId)) {
            return NextResponse.json({
                status: 400,
                message: "ID นักเรียนไม่ถูกต้อง"
            });
        }

        // Validate required fields
        if (!name || !stu_code) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกชื่อและรหัสนักเรียน"
            });
        }

        // Check if student exists
        const existingStudent = await prisma.student.findUnique({
            where: { id: studentId }
        });

        if (!existingStudent) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบนักเรียนที่ระบุ"
            });
        }

        // Check if student code is taken by another student
        const duplicateStudent = await prisma.student.findFirst({
            where: {
                stu_code: stu_code.trim(),
                id: { not: studentId }
            }
        });

        if (duplicateStudent) {
            return NextResponse.json({
                status: 400,
                message: "รหัสนักเรียนนี้มีอยู่ในระบบแล้ว"
            });
        }

        // Prepare update data
        const updateData: any = {
            name: name.trim(),
            stu_code: stu_code.trim()
        };

        // Hash password if provided
        if (password && password.trim()) {
            updateData.password = await bcrypt.hash(password.trim(), 10);
        }

        // Update student
        const updatedStudent = await prisma.student.update({
            where: { id: studentId },
            data: updateData,
            select: {
                id: true,
                name: true,
                stu_code: true,
                create_at: true,
                update_at: true
            }
        });

        return NextResponse.json({
            status: 200,
            message: "อัปเดตข้อมูลนักเรียนสำเร็จ",
            data: updatedStudent
        });

    } catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการอัปเดตนักเรียน"
        });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const studentId = parseInt(id);

        if (isNaN(studentId)) {
            return NextResponse.json({
                status: 400,
                message: "ID นักเรียนไม่ถูกต้อง"
            });
        }

        // Check if student exists
        const existingStudent = await prisma.student.findUnique({
            where: { id: studentId },
            include: {
                registrations: true
            }
        });

        if (!existingStudent) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบนักเรียนที่ระบุ"
            });
        }

        // Check if student has book registrations
        if (existingStudent.registrations.length > 0) {
            return NextResponse.json({
                status: 400,
                message: "ไม่สามารถลบนักเรียนที่มีการลงทะเบียนหนังสือได้ กรุณายกเลิกการลงทะเบียนก่อน"
            });
        }

        // Delete student
        await prisma.student.delete({
            where: { id: studentId }
        });

        return NextResponse.json({
            status: 200,
            message: "ลบนักเรียนสำเร็จ"
        });

    } catch (error) {
        console.error("Error deleting student:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบนักเรียน"
        });
    }
}