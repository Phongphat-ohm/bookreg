import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const check_signin = await CheckSignin();

        if (!check_signin.data || check_signin.status !== 200) {
            return Response.json({
                status: 400,
                message: check_signin.message
            })
        }

        const user_data = check_signin.data;

        const get_teahcing_subject = await prisma.teacher.findUnique({
            where: {
                id: Number(user_data.uid)
            },
            select: {
                teachingAssignments: {
                    select: {
                        id: true,
                        subject: true,
                    },
                    distinct: ["subject_id"]
                }
            }
        })

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลวิชาที่สอนสำเร็จ",
            data: get_teahcing_subject
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}
