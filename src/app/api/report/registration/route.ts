import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const class_id = searchParams.get('class_id');
        const subject_id = searchParams.get('subject_id');
        const book_id = searchParams.get('book_id');
        
        const isSignin = await CheckSignin();

        if (isSignin.status !== 200) {
            return Response.json({
                status: isSignin.status,
                message: isSignin.message,
            });
        }

        if (!class_id || !subject_id) {
            return Response.json({
                status: 400,
                message: "กรุณาระบุ class_id และ subject_id"
            });
        }

        // ดึงข้อมูลรายงานการลงทะเบียน
        const classData = await prisma.class.findUnique({
            where: { id: Number(class_id) },
            include: {
                students: {
                    include: {
                        registrations: {
                            where: {
                                subject_id: Number(subject_id),
                                ...(book_id && { book_id: Number(book_id) })
                            },
                            include: {
                                book: true,
                                subject: {
                                    include: {
                                        SubjectGroup: {
                                            include: {
                                                members: {
                                                    include: {
                                                        teacher: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { id: 'asc' }
                }
            }
        });

        if (!classData) {
            return Response.json({
                status: 404,
                message: "ไม่พบข้อมูลห้องเรียน"
            });
        }

        const subjectData = await prisma.subject.findUnique({
            where: { id: Number(subject_id) },
            include: {
                SubjectGroup: {
                    include: {
                        members: {
                            where: {
                                role: "head"
                            },
                            include: {
                                teacher: true
                            }
                        }
                    }
                }
            }
        });

        if (!subjectData) {
            return Response.json({
                status: 404,
                message: "ไม่พบข้อมูลวิชา"
            });
        }

        // จัดรูปแบบข้อมูลสำหรับรายงาน
        const reportData = {
            class: {
                id: classData.id,
                name: classData.name,
                grade: classData.grade
            },
            subject: {
                id: subjectData.id,
                code: subjectData.code,
                name: subjectData.name,
                group_name: subjectData.SubjectGroup?.name || "",
                group_header: subjectData.SubjectGroup?.members?.[0]?.teacher?.name || ""
            },
            students: classData.students.map(student => ({
                id: student.id,
                name: student.name,
                stu_code: student.stu_code,
                registrations: student.registrations.map(reg => ({
                    id: reg.id,
                    book_code: reg.register_code || "",
                    book_name: reg.book.name,
                    book_barcode: reg.book.barcode,
                    registered_at: reg.registered_at
                }))
            }))
        };

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลรายงานเรียบร้อย",
            data: reportData
        });

    } catch (error) {
        console.error("Error fetching report data:", error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error: error
        });
    }
}