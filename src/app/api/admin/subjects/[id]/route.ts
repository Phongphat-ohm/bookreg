import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงข้อมูลวิชาตาม ID
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
                message: "ID ไม่ถูกต้อง",
            });
        }

        const subject = await prisma.subject.findUnique({
            where: { id },
            include: {
                SubjectGroup: {
                    select: {
                        id: true,
                        name: true,
                        members: {
                            select: {
                                role: true,
                                teacher: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!subject) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบวิชาที่ต้องการ",
            });
        }

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลวิชาสำเร็จ",
            data: subject,
        });
    } catch (error) {
        console.error("Error fetching subject:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลวิชา",
        });
    }
}

// PUT - แก้ไขข้อมูลวิชา
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const id = parseInt(paramId);
        const { code, name, grade, description, subject_group_id } =
            await request.json();

        if (isNaN(id)) {
            return NextResponse.json({
                status: 400,
                message: "ID ไม่ถูกต้อง",
            });
        }

        if (!code || !name || !grade || !subject_group_id) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
            });
        }

        const existingSubject = await prisma.subject.findUnique({
            where: { id },
        });

        if (!existingSubject) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบวิชาที่ต้องการแก้ไข",
            });
        }

        const duplicateSubject = await prisma.subject.findFirst({
            where: {
                code,
                id: { not: id },
            },
        });

        if (duplicateSubject) {
            return NextResponse.json({
                status: 400,
                message: "รหัสวิชานี้มีอยู่แล้ว",
            });
        }

        const subjectGroup = await prisma.subjectGroup.findUnique({
            where: { id: parseInt(subject_group_id) },
        });

        if (!subjectGroup) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบกลุ่มสาระที่เลือก",
            });
        }

        const updatedSubject = await prisma.subject.update({
            where: { id },
            data: {
                code,
                name,
                grade,
                description: description || null,
                subject_group_id: parseInt(subject_group_id),
            },
            include: {
                SubjectGroup: {
                    select: {
                        id: true,
                        name: true,
                        members: {
                            select: {
                                role: true,
                                teacher: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            status: 200,
            message: "แก้ไขวิชาสำเร็จ",
            data: updatedSubject,
        });
    } catch (error) {
        console.error("Error updating subject:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการแก้ไขวิชา",
        });
    }
}

// DELETE - ลบวิชา
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
                message: "ID ไม่ถูกต้อง",
            });
        }

        const existingSubject = await prisma.subject.findUnique({
            where: { id },
            include: {
                books: true,
                registrations: true,
                teachingAssignments: true,
            },
        });

        if (!existingSubject) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบวิชาที่ต้องการลบ",
            });
        }

        const relatedDataCount =
            existingSubject.books.length +
            existingSubject.registrations.length +
            existingSubject.teachingAssignments.length;

        if (relatedDataCount > 0) {
            return NextResponse.json({
                status: 400,
                message: `ไม่สามารถลบวิชาได้ เนื่องจากมีข้อมูลที่เกี่ยวข้อง (หนังสือ: ${existingSubject.books.length}, การลงทะเบียน: ${existingSubject.registrations.length}, การสอน: ${existingSubject.teachingAssignments.length})`,
            });
        }

        await prisma.subject.delete({
            where: { id },
        });

        return NextResponse.json({
            status: 200,
            message: "ลบวิชาสำเร็จ",
        });
    } catch (error) {
        console.error("Error deleting subject:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบวิชา",
        });
    }
}
