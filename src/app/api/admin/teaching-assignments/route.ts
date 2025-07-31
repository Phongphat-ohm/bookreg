import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - ดึงรายการการสอนของครู
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const teacherId = searchParams.get('teacherId');
        const subjectGroupId = searchParams.get('subjectGroupId');

        let whereCondition: any = {};

        if (teacherId) {
            whereCondition.teacher_id = parseInt(teacherId);
        }

        if (subjectGroupId) {
            whereCondition.subject = {
                subject_group_id: parseInt(subjectGroupId)
            };
        }

        const assignments = await prisma.teachingAssignment.findMany({
            where: whereCondition,
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        username: true
                    }
                },
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
            },
            orderBy: [
                { subject: { grade: 'asc' } },
                { subject: { name: 'asc' } }
            ]
        });

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลการสอนสำเร็จ",
            data: assignments
        });

    } catch (error) {
        console.error("Error fetching teaching assignments:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลการสอน"
        });
    }
}

// POST - เพิ่มการสอนใหม่
export async function POST(request: NextRequest) {
    try {
        const { teacher_id, subject_id, class_id } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!teacher_id || !subject_id || !class_id) {
            return NextResponse.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        // ตรวจสอบว่ามีการสอนนี้แล้วหรือไม่
        const existingAssignment = await prisma.teachingAssignment.findFirst({
            where: {
                teacher_id: parseInt(teacher_id),
                subject_id: parseInt(subject_id),
                class_id: parseInt(class_id)
            }
        });

        if (existingAssignment) {
            return NextResponse.json({
                status: 400,
                message: "ครูคนนี้สอนวิชานี้ในห้องนี้อยู่แล้ว"
            });
        }

        // ตรวจสอบว่ามีครูสอนวิชานี้ในห้องนี้แล้วหรือไม่
        const existingTeacher = await prisma.teachingAssignment.findFirst({
            where: {
                subject_id: parseInt(subject_id),
                class_id: parseInt(class_id)
            },
            include: {
                teacher: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (existingTeacher) {
            return NextResponse.json({
                status: 400,
                message: `วิชานี้ในห้องนี้มีครู ${existingTeacher.teacher.name} สอนอยู่แล้ว`
            });
        }

        // สร้างการสอนใหม่
        const newAssignment = await prisma.teachingAssignment.create({
            data: {
                teacher_id: parseInt(teacher_id),
                subject_id: parseInt(subject_id),
                class_id: parseInt(class_id)
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        username: true
                    }
                },
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
        });

        return NextResponse.json({
            status: 201,
            message: "เพิ่มการสอนสำเร็จ",
            data: newAssignment
        });

    } catch (error) {
        console.error("Error creating teaching assignment:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการเพิ่มการสอน"
        });
    }
}

// DELETE - ลบการสอนหลายรายการ
export async function DELETE(request: NextRequest) {
    try {
        const { assignmentIds } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!assignmentIds || !Array.isArray(assignmentIds) || assignmentIds.length === 0) {
            return NextResponse.json({
                status: 400,
                message: "กรุณาระบุรายการการสอนที่ต้องการลบ"
            });
        }

        // ตรวจสอบว่าการสอนมีอยู่จริง
        const existingAssignments = await prisma.teachingAssignment.findMany({
            where: {
                id: { in: assignmentIds.map((id: string) => parseInt(id)) }
            },
            include: {
                teacher: {
                    select: {
                        name: true
                    }
                },
                subject: {
                    select: {
                        name: true,
                        code: true
                    }
                },
                class: {
                    select: {
                        grade: true,
                        name: true
                    }
                }
            }
        });

        if (existingAssignments.length !== assignmentIds.length) {
            return NextResponse.json({
                status: 404,
                message: "พบการสอนที่ไม่มีอยู่ในระบบ"
            });
        }

        // ลบการสอนทั้งหมด
        const deleteResult = await prisma.teachingAssignment.deleteMany({
            where: {
                id: { in: assignmentIds.map((id: string) => parseInt(id)) }
            }
        });

        return NextResponse.json({
            status: 200,
            message: "ลบการสอนสำเร็จ",
            data: {
                deletedCount: deleteResult.count,
                deletedAssignments: existingAssignments.map(assignment => ({
                    id: assignment.id,
                    teacher: assignment.teacher.name,
                    subject: `${assignment.subject.name} (${assignment.subject.code})`,
                    class: `${assignment.class.grade}/${assignment.class.name}`
                }))
            }
        });

    } catch (error) {
        console.error("Error bulk deleting teaching assignments:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบการสอน"
        });
    }
}