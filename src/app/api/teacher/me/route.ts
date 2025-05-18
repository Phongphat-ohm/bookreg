import { PrismaClient } from "@/generated/prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const cookie = await cookies();
        const env = process.env.JWT_SECRET || "jwtpasswordissoveryharadnaakubtuaeng";

        const get_token = cookie.get("teacher_token");

        if (!get_token) {
            return Response.json({
                status: 404,
                message: "กรุณาเข้าสู่ระบบ"
            })
        }

        const vertify_token: any = jwt.verify(get_token.value, env);

        if (!vertify_token) {
            return Response.json({
                status: 400,
                message: "กรุณาเข้าสู่ระบบ(ยืนยันตัวตนผิดพลาด)"
            })
        }

        const uid = vertify_token.uid;

        if (!uid) {
            return Response.json({
                status: 400,
                message: "กรุณาเข้าสู่ระบบ(ไม่พบข้อมูล)"
            })
        }

        const get_teacher = await prisma.teacher.findUnique({
            where: {
                id: Number(uid)
            },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                advisingClasses: true,
                subjectAssignments: true,
                teachingClasses: true,
                create_at: true,
                update_at: true
            }
        })

        if (!get_teacher) {
            return Response.json({
                status: 400,
                message: "ไม่พบผู้ใช้"
            })
        }

        return Response.json({
            status: 200,
            message: "พบผู้ใช้แล้ว",
            data: get_teacher
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}