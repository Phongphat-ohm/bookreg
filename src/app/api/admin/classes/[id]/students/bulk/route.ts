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
        const { students } = body;

        if (isNaN(classId)) {
            return NextResponse.json({
                status: 400,
                message: "ID ห้องเรียนไม่ถูกต้อง"
            });
        }

        // Validate students array
        if (!Array.isArray(students) || students.length === 0) {
            return NextResponse.json({
                status: 400,
                message: "ข้อมูลนักเรียนไม่ถูกต้อง"
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

        const results = {
            success: 0,
            failed: 0,
            total: students.length,
            errors: [] as Array<{
                index: number;
                name: string;
                stu_code: string;
                error: string;
            }>
        };

        // Process each student
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            
            try {
                // Validate required fields
                if (!student.name || !student.stu_code || !student.password) {
                    results.failed++;
                    results.errors.push({
                        index: i,
                        name: student.name || '',
                        stu_code: student.stu_code || '',
                        error: 'ข้อมูลไม่ครบถ้วน'
                    });
                    continue;
                }

                // Check if student code already exists
                const existingStudent = await prisma.student.findUnique({
                    where: { stu_code: student.stu_code.trim() }
                });

                if (existingStudent) {
                    results.failed++;
                    results.errors.push({
                        index: i,
                        name: student.name,
                        stu_code: student.stu_code,
                        error: 'รหัสนักเรียนซ้ำ'
                    });
                    continue;
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(student.password.trim(), 10);

                // Create student
                await prisma.student.create({
                    data: {
                        name: student.name.trim(),
                        stu_code: student.stu_code.trim(),
                        password: hashedPassword,
                        class_id: classId
                    }
                });

                results.success++;

            } catch (error) {
                console.error(`Error creating student ${i}:`, error);
                results.failed++;
                results.errors.push({
                    index: i,
                    name: student.name || '',
                    stu_code: student.stu_code || '',
                    error: 'เกิดข้อผิดพลาดในการสร้างข้อมูล'
                });
            }
        }

        return NextResponse.json({
            status: 200,
            message: `นำเข้าข้อมูลเสร็จสิ้น สำเร็จ ${results.success} คน ล้มเหลว ${results.failed} คน`,
            data: results
        });

    } catch (error) {
        console.error("Error bulk creating students:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการนำเข้าข้อมูลนักเรียน"
        });
    }
}