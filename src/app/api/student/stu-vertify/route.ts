import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json()
    const { stu_code, password } = body;
    const cookie = await cookies();

    if (!stu_code || !password) {
        return Response.json({
            status: 400,
            message: "กรุณากรอกข้อมูลให้ครบถ้วน"
        })
    }

    try {
        const get_user = await prisma.student.findUnique({
            where: {
                stu_code
            }
        })

        if (!get_user) {
            return Response.json({
                status: 404,
                message: "ไม่พบรหัสนักเรียนนี้"
            })
        }

        const compare_password = await bcrypt.compare(password, get_user.password);

        if (!compare_password) {
            return Response.json({
                status: 401,
                message: "รหัสบัตรประจำตัวประชาชนไม่ถูกต้อง"
            })
        }

        const create_token = jwt.sign({
            uid: get_user.id
        }, process.env.JWT_SECRET || "jwtpasswordissoveryharadnaakubtuaeng");

        if (!create_token) {
            return Response.json({
                status: 401,
                message: "การเข้าสู่ระบบไม่สำเร็จ"
            })
        }

        cookie.set("student_token", create_token);

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