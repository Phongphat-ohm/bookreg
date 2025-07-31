import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

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

        const subjectGroup = await prisma.subjectGroup.findUnique({
            where: { id },
            include: {
                members: {
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                role: true
                            }
                        }
                    }
                },
                subjects: {
                    include: {
                        teachingAssignments: {
                            include: {
                                teacher: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true,
                                        role: true
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
                        }
                    }
                }
            }
        });

        if (!subjectGroup) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบกลุ่มสาระที่ต้องการ"
            });
        }

        const teacherMap = new Map();

        // เพิ่มครูใน members ทั้งหมด
        subjectGroup.members.forEach(member => {
            teacherMap.set(member.teacher.id, {
                teacher: member.teacher,
                isHead: member.role === "head", // ใช้ role จาก SubjectGroupMembership
                subjects: [],
                totalSubjects: 0,
                totalClasses: 0
            });
        });

        // เพิ่มข้อมูลการสอนของครู
        subjectGroup.subjects.forEach(subject => {
            subject.teachingAssignments.forEach(assignment => {
                const teacherId = assignment.teacher.id;

                if (!teacherMap.has(teacherId)) {
                    teacherMap.set(teacherId, {
                        teacher: assignment.teacher,
                        isHead: false,
                        subjects: [],
                        totalSubjects: 0,
                        totalClasses: 0
                    });
                }

                const teacherData = teacherMap.get(teacherId);

                let subjectEntry = teacherData.subjects.find((s: any) => s.subject.id === subject.id);

                if (!subjectEntry) {
                    subjectEntry = {
                        subject: {
                            id: subject.id,
                            name: subject.name,
                            code: subject.code,
                            grade: subject.grade
                        },
                        classes: []
                    };
                    teacherData.subjects.push(subjectEntry);
                }

                if (!subjectEntry.classes.find((c: any) => c.id === assignment.class.id)) {
                    subjectEntry.classes.push(assignment.class);
                }
            });
        });

        teacherMap.forEach(teacherData => {
            teacherData.totalSubjects = teacherData.subjects.length;
            teacherData.totalClasses = teacherData.subjects.reduce(
                (total: number, s: any) => total + s.classes.length,
                0
            );
        });

        const teachers = Array.from(teacherMap.values()).sort((a: any, b: any) => {
            if (a.isHead) return -1;
            if (b.isHead) return 1;
            return a.teacher.name.localeCompare(b.teacher.name);
        });

        return NextResponse.json({
            status: 200,
            message: "ดึงข้อมูลครูในกลุ่มสาระสำเร็จ",
            data: {
                subjectGroup: {
                    id: subjectGroup.id,
                    name: subjectGroup.name
                },
                teachers,
                totalTeachers: teachers.length
            }
        });
    } catch (error) {
        console.error("Error fetching teachers in subject group:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลครูในกลุ่มสาระ"
        });
    }
}
