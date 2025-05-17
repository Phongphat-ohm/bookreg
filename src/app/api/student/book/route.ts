import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/generated/prisma/client";

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

        const books_data = await prisma.bookRegistration.findMany({
            where: {
                student_id: Number(uid)
            },
            include: {
                book: true,
                subject: true
            }
        })

        return Response.json({
            status: 200,
            message: "สำเร็จ",
            data: books_data
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