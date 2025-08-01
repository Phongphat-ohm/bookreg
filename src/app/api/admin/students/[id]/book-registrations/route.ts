import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงรายการการลงทะเบียนหนังสือของนักเรียน
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const studentId = parseInt(paramId);

        if (isNaN(studentId)) {
            return NextResponse.json({
                status: 400,
                message: "ID นักเรียนไม่ถูกต้อง"
            });
        }

        // ตรวจสอบว่านักเรียนมีอยู่จริง
        const student = await prisma.student.findUnique({
            where: { id: studentId },
            include: {
                class: {
                    select: {
                        id: true,
                        grade: true,
                        name: true
                    }
                }
            }
        });

        if (!student) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลนักเรียน"
            });
        }

        // ดึงข้อมูลการลงทะเบียนหนังสือ
        const registrations = await prisma.bookRegistration.findMany({
            where: {
                student_id: studentId
            },
            include: {
                book: {
                    include: {
                        subject: {
                            select: {
                                id: true,
                                name: true,
                                code: true,
                                grade: true,
                                SubjectGroup: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        },
                        AcademicYear: {
                            select: {
                                id: true,
                                year: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                registered_at: 'desc'
            }
        });

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลการลงทะเบียนหนังสือสำเร็จ",
            data: {
                student,
                registrations
            }
        });

    } catch (error) {
        console.error("Error fetching student book registrations:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลการลงทะเบียนหนังสือ"
        });
    }
}