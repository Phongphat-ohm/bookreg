import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { stu_code } = body;

    if (!stu_code) {
        return Response.json({
            status: 400,
            message: "กรุณากรอกรหัสนักเรียน"
        })
    }

    try {
        const get_stu_code = await prisma.student.findUnique({
            where: {
                stu_code
            }
        })

        if (!get_stu_code) {
            return Response.json({
                status: 404,
                message: "ไม่พบรหัสนักเรียนนี้"
            })
        }

        return Response.json({
            status: 200,
            message: "พบรหัสนักเรียนแล้ว"
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}