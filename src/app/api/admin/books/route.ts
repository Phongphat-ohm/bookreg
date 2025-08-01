import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงรายการหนังสือทั้งหมด
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const subjectId = searchParams.get('subjectId');
        const subjectGroupId = searchParams.get('subjectGroupId');
        const academicYearId = searchParams.get('academicYearId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const sortBy = searchParams.get('sortBy') || 'name';
        const sortOrder = searchParams.get('sortOrder') || 'asc';

        // สร้าง where condition
        const whereCondition: any = {};

        if (search) {
            whereCondition.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { barcode: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (subjectId) {
            whereCondition.subject_id = parseInt(subjectId);
        }

        if (subjectGroupId) {
            whereCondition.subject = {
                subject_group_id: parseInt(subjectGroupId)
            };
        }

        if (academicYearId) {
            whereCondition.academic_year_id = parseInt(academicYearId);
        }

        // นับจำนวนทั้งหมด
        const totalCount = await prisma.book.count({
            where: whereCondition
        });

        // ดึงข้อมูลหนังสือ
        const books = await prisma.book.findMany({
            where: whereCondition,
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
                                stu_code: true,
                                class: {
                                    select: {
                                        id: true,
                                        grade: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                [sortBy]: sortOrder as 'asc' | 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        });

        // เพิ่มข้อมูลสถิติ
        const booksWithStats = books.map(book => ({
            ...book,
            registrationCount: book.registrations.length,
            isRegistered: book.registrations.length > 0
        }));

        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลหนังสือสำเร็จ",
            data: {
                books: booksWithStats,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalCount,
                    limit,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            }
        });

    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ"
        });
    }
}

// POST - สร้างหนังสือใหม่
export async function POST(request: NextRequest) {
    try {
        const { barcode, name, description, subject_id, academic_year_id } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!barcode || !name || !subject_id || !academic_year_id) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบว่า barcode ซ้ำหรือไม่
        const existingBook = await prisma.book.findUnique({
            where: { barcode }
        });

        if (existingBook) {
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

        // สร้างหนังสือใหม่
        const newBook = await prisma.book.create({
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
                        grade: true
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
            status: 201,
            message: "สร้างหนังสือสำเร็จ",
            data: newBook
        });

    } catch (error) {
        console.error("Error creating book:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการสร้างหนังสือ"
        });
    }
}