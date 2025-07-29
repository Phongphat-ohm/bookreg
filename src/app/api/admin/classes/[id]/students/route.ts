import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const classId = parseInt(id);
        const body = await request.json();
        const { name, stu_code, password } = body;

        if (isNaN(classId)) {
            return NextResponse.json({
                status: 400,
                message: "ID ห้องเรียนไม่ถูกต้อง"
            });
        }

        // Validate required fields
        if (!name || !stu_code || !password) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบทุกช่อง"
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

        // Check if student code already exists
        const existingStudent = await prisma.student.findUnique({
            where: { stu_code: stu_code.trim() }
        });

        if (existingStudent) {
            return NextResponse.json({
                status: 400,
                message: "รหัสนักเรียนนี้มีอยู่ในระบบแล้ว"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        // Create new student
        const newStudent = await prisma.student.create({
            data: {
                name: name.trim(),
                stu_code: stu_code.trim(),
                password: hashedPassword,
                class_id: classId
            },
            select: {
                id: true,
                name: true,
                stu_code: true,
                create_at: true
            }
        });

        return NextResponse.json({
            status: 201,
            message: "เพิ่มนักเรียนสำเร็จ",
            data: newStudent
        });

    } catch (error) {
        console.error("Error creating student:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการเพิ่มนักเรียน"
        });
    }
}