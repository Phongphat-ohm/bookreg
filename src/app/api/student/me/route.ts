import { PrismaClient } from '@/generated/prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers"

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const cookie = await cookies();
        const env = process.env.JWT_SECRET || "jwtpasswordissoveryharadnaakubtuaeng";

        const get_token = cookie.get("student_token");

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

        const get_user = await prisma.student.findUnique({
            where: {
                id: Number(uid)
            },
            select: {
                id: true,
                name: true,
                stu_code: true,
                class: true,
                registrations: true
            }
        })

        if (!get_user) {
            return Response.json({
                status: 400,
                message: "กรุณาเข้าสู่ระบบ(ไม่พบข้อมูลผู้ใช้)"
            })
        }

        return Response.json({
            status: 200,
            message: "พบข้อมูลผู้ใช้แล้ว",
            data: get_user
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}