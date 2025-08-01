import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงข้อมูลหนังสือเล่มเดียว
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const id = parseInt(paramId);

        if (isNaN(id)) {
            return NextResponse.json({
                status: 400,
                message: "ID หนังสือไม่ถูกต้อง"
            });
        }

        const book = await prisma.book.findUnique({
            where: { id },
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
                },
                registrations: {
                    select: {
                        id: true,
                        register_code: true,
                        registered_at: true,
                        student: {
                            select: {
                                id: true,
                                name: true,
                                stu_code: true
                            }
                        }
                    }
                }
            }
        });

        if (!book) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลหนังสือ"
            });
        }

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลหนังสือสำเร็จ",
            data: {
                ...book,
                registrationCount: book.registrations.length,
                isRegistered: book.registrations.length > 0
            }
        });

    } catch (error) {
        console.error("Error fetching book:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ"
        });
    }
}

// PUT - แก้ไขข้อมูลหนังสือ
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const id = parseInt(paramId);
        const { barcode, name, description, subject_id, academic_year_id } = await request.json();

        if (isNaN(id)) {
            return NextResponse.json({
                status: 400,
                message: "ID หนังสือไม่ถูกต้อง"
            });
        }

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!barcode || !name || !subject_id || !academic_year_id) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบว่าหนังสือมีอยู่จริง
        const existingBook = await prisma.book.findUnique({
            where: { id }
        });

        if (!existingBook) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลหนังสือ"
            });
        }

        // ตรวจสอบว่า barcode ซ้ำหรือไม่ (ยกเว้นตัวเอง)
        const duplicateBarcode = await prisma.book.findFirst({
            where: {
                barcode: barcode.trim(),
                id: { not: id }
            }
        });

        if (duplicateBarcode) {
            return NextResponse.json({
                status: 400,
                message: "รหัสหนังสือนี้มีอยู่แล้ว"
            });
        }

        // ตรวจสอบว่าวิชามีอยู่จริง
        const subject = await prisma.subject.findUnique({
            where: { id: parseInt(subject_id) }
        });

        if (!subject) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลวิชาที่เลือก"
            });
        }

        // ตรวจสอบว่าปีการศึกษามีอยู่จริง
        const academicYear = await prisma.academicYear.findUnique({
            where: { id: parseInt(academic_year_id) }
        });

        if (!academicYear) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลปีการศึกษาที่เลือก"
            });
        }

        // อัปเดตข้อมูลหนังสือ
        const updatedBook = await prisma.book.update({
            where: { id },
            data: {
                barcode: barcode.trim(),
                name: name.trim(),
                description: description?.trim() || null,
                subject_id: parseInt(subject_id),
                academic_year_id: parseInt(academic_year_id)
            },
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
        });

        return NextResponse.json({
            status: 200,
            message: "แก้ไขข้อมูลหนังสือสำเร็จ",
            data: updatedBook
        });

    } catch (error) {
        console.error("Error updating book:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการแก้ไขข้อมูลหนังสือ"
        });
    }
}

// DELETE - ลบหนังสือ
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
                message: "ID หนังสือไม่ถูกต้อง"
            });
        }

        // ตรวจสอบว่าหนังสือมีอยู่จริง
        const existingBook = await prisma.book.findUnique({
            where: { id },
            include: {
                registrations: {
                    select: {
                        id: true,
                        student: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!existingBook) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลหนังสือ"
            });
        }

        // ตรวจสอบว่ามีการลงทะเบียนหรือไม่
        if (existingBook.registrations.length > 0) {
            return NextResponse.json({
                status: 400,
                message: `ไม่สามารถลบหนังสือได้ เนื่องจากมีนักเรียน ${existingBook.registrations.length} คนลงทะเบียนแล้ว`
            });
        }

        // ลบหนังสือ
        await prisma.book.delete({
            where: { id }
        });

        return NextResponse.json({
            status: 200,
            message: `ลบหนังสือ "${existingBook.name}" สำเร็จ`
        });

    } catch (error) {
        console.error("Error deleting book:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบหนังสือ"
        });
    }
}