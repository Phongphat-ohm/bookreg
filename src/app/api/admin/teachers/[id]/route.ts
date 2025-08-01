import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงข้อมูลครูตาม ID
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
                message: "ID ไม่ถูกต้อง"
            });
        }

        const teacher = await prisma.teacher.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                create_at: true,
                update_at: true,
                subjectMembership: {
                    select: {
                        id: true,
                        role: true,
                        subject_group: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                advisingClasses: {
                    select: {
                        id: true,
                        grade: true,
                        name: true,
                        students: {
                            select: {
                                id: true
                            }
                        }
                    }
                },
                teachingAssignments: {
                    select: {
                        id: true,
                        subject: {
                            select: {
                                id: true,
                                name: true,
                                code: true,
                                grade: true
                            }
                        },
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
        });

        if (!teacher) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบครูที่ต้องการ"
            });
        }

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลครูสำเร็จ",
            data: teacher
        });

    } catch (error) {
        console.error("Error fetching teacher:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลครู"
        });
    }
}

// PUT - แก้ไขข้อมูลครู
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const id = parseInt(paramId);
        const { name, username, password, role } = await request.json();

        if (isNaN(id)) {
            return NextResponse.json({
                status: 400,
                message: "ID ไม่ถูกต้อง"
            });
        }

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!name || !username) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบ role
        if (role && !['teacher', 'admin'].includes(role)) {
            return NextResponse.json({
                status: 400,
                message: "Role ต้องเป็น teacher หรือ admin เท่านั้น"
            });
        }

        // ตรวจสอบว่าครูมีอยู่จริง
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id }
        });

        if (!existingTeacher) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบครูที่ต้องการแก้ไข"
            });
        }

        // ตรวจสอบว่า username ซ้ำหรือไม่ (ยกเว้นตัวเอง)
        const duplicateTeacher = await prisma.teacher.findFirst({
            where: {
                username: username.trim(),
                id: { not: id }
            }
        });

        if (duplicateTeacher) {
            return NextResponse.json({
                status: 400,
                message: "Username นี้มีอยู่แล้ว"
            });
        }

        // เตรียมข้อมูลสำหรับอัปเดต
        const updateData: any = {
            name: name.trim(),
            username: username.trim(),
            role: role || existingTeacher.role
        };

        // ถ้ามีการเปลี่ยนรหัสผ่าน
        if (password && password.trim()) {
            const bcrypt = require('bcrypt');
            updateData.password = await bcrypt.hash(password.trim(), 10);
        }

        // อัปเดตข้อมูลครู
        const updatedTeacher = await prisma.teacher.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                create_at: true,
                update_at: true
            }
        });

        return NextResponse.json({
            status: 200,
            message: "แก้ไขครูสำเร็จ",
            data: updatedTeacher
        });

    } catch (error) {
        console.error("Error updating teacher:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการแก้ไขครู"
        });
    }
}

// DELETE - ลบครู
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

        // ตรวจสอบว่าครูมีอยู่จริง
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id },
            include: {
                subjectMembership: true,
                advisingClasses: true,
                teachingAssignments: true
            }
        });

        if (!existingTeacher) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบครูที่ต้องการลบ"
            });
        }

        // ตรวจสอบว่ามีข้อมูลที่เกี่ยวข้องหรือไม่
        const relatedDataCount = 
            (existingTeacher.subjectMembership ? 1 : 0) + 
            existingTeacher.advisingClasses.length + 
            existingTeacher.teachingAssignments.length;

        if (relatedDataCount > 0) {
            const details = [];
            if (existingTeacher.subjectMembership) {
                details.push(`สมาชิกกลุ่มสาระ: 1 กลุ่ม`);
            }
            if (existingTeacher.advisingClasses.length > 0) {
                details.push(`ครูที่ปรึกษา: ${existingTeacher.advisingClasses.length} ห้อง`);
            }
            if (existingTeacher.teachingAssignments.length > 0) {
                details.push(`การสอน: ${existingTeacher.teachingAssignments.length} วิชา`);
            }

            return NextResponse.json({
                status: 400,
                message: `ไม่สามารถลบครูได้ เนื่องจากมีข้อมูลที่เกี่ยวข้อง (${details.join(', ')})`
            });
        }

        // ลบครู
        await prisma.teacher.delete({
            where: { id }
        });

        return NextResponse.json({
            status: 200,
            message: "ลบครูสำเร็จ"
        });

    } catch (error) {
        console.error("Error deleting teacher:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบครู"
        });
    }
}