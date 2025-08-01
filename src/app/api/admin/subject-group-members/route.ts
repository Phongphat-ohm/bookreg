import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// POST - เพิ่มสมาชิกเข้ากลุ่มสาระ
export async function POST(request: NextRequest) {
    try {
        const { teacher_id, subject_group_id, role = "member" } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!teacher_id || !subject_group_id) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบว่า role ถูกต้อง
        if (!['head', 'member'].includes(role)) {
            return NextResponse.json({
                status: 400,
                message: "Role ต้องเป็น head หรือ member เท่านั้น"
            });
        }

        // ตรวจสอบว่าครูมีอยู่จริง
        const teacher = await prisma.teacher.findUnique({
            where: { id: parseInt(teacher_id) }
        });

        if (!teacher) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลครูที่เลือก"
            });
        }

        // ตรวจสอบว่ากลุ่มสาระมีอยู่จริง
        const subjectGroup = await prisma.subjectGroup.findUnique({
            where: { id: parseInt(subject_group_id) }
        });

        if (!subjectGroup) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลกลุ่มสาระที่เลือก"
            });
        }

        // ตรวจสอบว่าครูเป็นสมาชิกกลุ่มสาระอื่นแล้วหรือไม่
        const existingMembership = await prisma.subjectGroupMembership.findUnique({
            where: { teacher_id: parseInt(teacher_id) },
            include: {
                subject_group: true
            }
        });

        if (existingMembership) {
            return NextResponse.json({
                status: 400,
                message: `ครู ${teacher.name} เป็นสมาชิกกลุ่มสาระ "${existingMembership.subject_group.name}" อยู่แล้ว`
            });
        }

        // ถ้าเป็นการเพิ่มหัวหน้า ต้องตรวจสอบว่ามีหัวหน้าแล้วหรือไม่
        if (role === 'head') {
            const existingHeader = await prisma.subjectGroupMembership.findFirst({
                where: {
                    subject_group_id: parseInt(subject_group_id),
                    role: 'head'
                },
                include: {
                    teacher: true
                }
            });

            if (existingHeader) {
                return NextResponse.json({
                    status: 400,
                    message: `กลุ่มสาระ "${subjectGroup.name}" มีหัวหน้าแล้ว (${existingHeader.teacher.name})`
                });
            }
        }

        // เพิ่มสมาชิกใหม่
        const newMembership = await prisma.subjectGroupMembership.create({
            data: {
                teacher_id: parseInt(teacher_id),
                subject_group_id: parseInt(subject_group_id),
                role
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        username: true
                    }
                },
                subject_group: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return NextResponse.json({
            status: 201,
            message: `เพิ่ม${role === 'head' ? 'หัวหน้า' : 'สมาชิก'}กลุ่มสาระสำเร็จ`,
            data: newMembership
        });

    } catch (error) {
        console.error("Error adding subject group member:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการเพิ่มสมาชิกกลุ่มสาระ"
        });
    }
}

// PUT - อัปเดตบทบาทสมาชิก
export async function PUT(request: NextRequest) {
    try {
        const { teacher_id, subject_group_id, role } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!teacher_id || !subject_group_id || !role) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบว่า role ถูกต้อง
        if (!['head', 'member'].includes(role)) {
            return NextResponse.json({
                status: 400,
                message: "Role ต้องเป็น head หรือ member เท่านั้น"
            });
        }

        // ตรวจสอบว่าสมาชิกมีอยู่จริง
        const existingMembership = await prisma.subjectGroupMembership.findFirst({
            where: {
                teacher_id: parseInt(teacher_id),
                subject_group_id: parseInt(subject_group_id)
            },
            include: {
                teacher: true,
                subject_group: true
            }
        });

        if (!existingMembership) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลสมาชิกกลุ่มสาระ"
            });
        }

        // ถ้าเป็นการเปลี่ยนเป็นหัวหน้า ต้องตรวจสอบว่ามีหัวหน้าแล้วหรือไม่
        if (role === 'head' && existingMembership.role !== 'head') {
            const existingHeader = await prisma.subjectGroupMembership.findFirst({
                where: {
                    subject_group_id: parseInt(subject_group_id),
                    role: 'head',
                    teacher_id: { not: parseInt(teacher_id) }
                },
                include: {
                    teacher: true
                }
            });

            if (existingHeader) {
                return NextResponse.json({
                    status: 400,
                    message: `กลุ่มสาระ "${existingMembership.subject_group.name}" มีหัวหน้าแล้ว (${existingHeader.teacher.name})`
                });
            }
        }

        // อัปเดตบทบาท
        const updatedMembership = await prisma.subjectGroupMembership.update({
            where: { id: existingMembership.id },
            data: { role },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        username: true
                    }
                },
                subject_group: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return NextResponse.json({
            status: 200,
            message: `อัปเดตบทบาทเป็น${role === 'head' ? 'หัวหน้า' : 'สมาชิก'}สำเร็จ`,
            data: updatedMembership
        });

    } catch (error) {
        console.error("Error updating subject group member:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการอัปเดตบทบาทสมาชิก"
        });
    }
}

// DELETE - ลบสมาชิกออกจากกลุ่มสาระ
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const teacher_id = searchParams.get('teacher_id');
        const subject_group_id = searchParams.get('subject_group_id');

        if (!teacher_id || !subject_group_id) {
            return NextResponse.json({
                status: 400,
                message: "กรุณาระบุ teacher_id และ subject_group_id"
            });
        }

        // ตรวจสอบว่าสมาชิกมีอยู่จริง
        const existingMembership = await prisma.subjectGroupMembership.findFirst({
            where: {
                teacher_id: parseInt(teacher_id),
                subject_group_id: parseInt(subject_group_id)
            },
            include: {
                teacher: true,
                subject_group: true
            }
        });

        if (!existingMembership) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบข้อมูลสมาชิกกลุ่มสาระ"
            });
        }

        // ลบสมาชิก
        await prisma.subjectGroupMembership.delete({
            where: { id: existingMembership.id }
        });

        return NextResponse.json({
            status: 200,
            message: `ลบ${existingMembership.teacher.name}ออกจากกลุ่มสาระ ${existingMembership.subject_group.name} สำเร็จ`
        });

    } catch (error) {
        console.error("Error removing subject group member:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบสมาชิกกลุ่มสาระ"
        });
    }
}