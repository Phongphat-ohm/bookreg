import { PrismaClient } from "@/generated/prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const query = new URL(req.url).searchParams;
    const book_code = query.get("book_code");

    if (!book_code) {
        return Response.json({
            status: 400,
            message: "กรุณากรอกรหัสหนังสือ"
        })
    }

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

        const find_book_reg = await prisma.student.findFirst({
            where: {
                AND: [
                    {
                        id: Number(uid),
                    },
                    {
                        registrations: {
                            some: {
                                book: {
                                    barcode: book_code.toString()
                                }
                            }
                        }
                    }
                ]
            },
        })

        if (find_book_reg) {
            return Response.json({
                status: 400,
                message: "มีการลงทะเบียนหนังสือเล่มนี้แล้ว"
            })
        }

        const get_book = await prisma.book.findUnique({
            where: {
                barcode: book_code
            },
            include: {
                subject: true
            }
        })

        if (!get_book) {
            return Response.json({
                status: 400,
                message: "ไม่พบหนังสือที่ต้องการ"
            })
        }

        return Response.json({
            status: 200,
            message: "ไม่พบการลงทะเบียน",
            data: get_book
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}