import { PrismaClient } from "@/generated/prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;
        const env_secret = process.env.JWT_SECRET || "jwtpasswordissoveryharadnaakubtuaeng";
        const cookie = await cookies();

        if (!username || !password) {
            return Response.json({
                status: 400,
                message: "กรุรากรอกข้อมูลให้ครบ"
            })
        }

        const get_user = await prisma.teacher.findUnique({
            where: {
                username: username
            }
        })

        if (!get_user) {
            return Response.json({
                status: 404,
                message: "ไม่พบผู้ใช้"
            })
        }

        const compare_pass = await bcrypt.compare(password, get_user.password);

        if (!compare_pass) {
            return Response.json({
                status: 400,
                message: "รหัสผ่านไม่ถูกต้อง"
            })
        }

        const create_token = jwt.sign({ uid: get_user.id }, env_secret);

        if (!create_token) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถเข้าสู่ระบบได้"
            })
        }

        cookie.set("teacher_token", create_token);

        return Response.json({
            status: 200,
            message: "เข้าสู่ระบบสำเร็จ"
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}