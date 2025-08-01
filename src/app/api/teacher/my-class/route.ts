import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const check_signin = await CheckSignin();

        if (check_signin.status !== 200 || !check_signin || !check_signin.data) {
            return Response.json(check_signin);
        }

        const uid = check_signin.data.uid;

        const classes = await prisma.teachingAssignment.findMany({
            where: {
                teacher_id: Number(uid),
            },
            select: {
                id: true,
                subject: {
                    select: {
                        name: true
                    }
                },
                class: {
                    select: {
                        id: true,
                        name: true,
                        grade: true,
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

        return Response.json({
            status: 200,
            message: "สำเร็จ",
            data: classes,
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด",
        })
    }
}