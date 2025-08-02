import { CheckSignin } from "@/functions/CheckSignin"
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const checkSignin = await CheckSignin();

        if (checkSignin.status !== 200 || !checkSignin.data) {
            return Response.json(checkSignin);
        }

        const get_teacher_admin = await prisma.teacher.findFirst({
            where: {
                AND: [
                    {
                        id: Number(checkSignin.data.uid)
                    },
                    {
                        role: "admin"
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                create_at: true,
                update_at: true
            }
        })

        if (!get_teacher_admin) {
            return Response.json({
                status: 401,
                message: "ไม่มีสิทธิ์เข้าถึง"
            })
        }

        return Response.json({
            status: 200,
            message: "เข้าสู่ระบบสำเร็จ",
            data: get_teacher_admin
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "มีบางอย่างผิดพลาด",
            error
        })
    }
}