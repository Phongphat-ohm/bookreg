import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const classId = url.searchParams.get("class_id");

        if (!classId) {
            return Response.json({
                status: 400,
                message: "ไม่พบรหัสชั้นเรียน",
            });
        }

        const check_signin = await CheckSignin();

        if (check_signin.status !== 200 || !check_signin || !check_signin.data) {
            return Response.json(check_signin);
        }

        const uid = check_signin.data.uid;

        const class_detail = await prisma.teachingAssignment.findFirst({
            where: {
                AND: [
                    {
                        teacher_id: Number(uid),
                    },
                    {
                        id: Number(classId),
                    }
                ]
            },
            select: {
                id: true,
                subject: {
                    select: {
                        name: true,
                        code: true,
                        SubjectGroup: {
                            select: {
                                name: true,
                                Teacher: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },
                class: {
                    select: {
                        id: true,
                        name: true,
                        grade: true,
                        students: {
                            select: {
                                id: true,
                                stu_code: true,
                                name: true,
                                class_id: true,
                                registrations: {
                                    select: {
                                        register_code: true,
                                        book: true,
                                        subject: {
                                            select: {
                                                name: true,
                                                code: true,
                                            }
                                        },
                                        registered_at: true,
                                    }
                                }
                            }
                        },
                        _count: {
                            select: {
                                students: true,
                            }
                        },
                        advisors: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            }
        })

        if (!class_detail) {
            return Response.json({
                status: 404,
                message: "ไม่พบชั้นเรียนนี้",
            });
        }

        return Response.json({
            status: 200,
            message: "สำเร็จ",
            data: class_detail,
        });
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด",
            error
        });
    }
}