import { PrismaClient } from "@/generated/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { book_code } = body;
    const cookie = await cookies();
    const env = process.env.JWT_SECRET || "jwtpasswordissoveryharadnaakubtuaeng";

    if (!book_code) {
        return Response.json({
            status: 400,
            message: "กรุณากรอกรหัสหนังสือ"
        })
    }

    try {
        const get_book = await prisma.book.findUnique({
            where: {
                barcode: book_code
            },
            include: {
                subject: true,
                AcademicYear: true
            }
        })

        if (!get_book) {
            return Response.json({
                status: 404,
                message: "ไม่พบหนังสือ"
            })
        }

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

        const check_registered_book = await CheckRegisteredBook(book_code);

        if (check_registered_book.status !== 200) {
            return Response.json(check_registered_book)
        }

        const register_book = await prisma.bookRegistration.create({
            data: {
                book_id: get_book.id,
                student_id: Number(uid),
                subject_id: get_book.subject_id
            },
        })

        if (!register_book) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถลงทะเบียนได้",
            })
        }

        const create_register_code = `${get_book.subject.code}-${register_book.id}/${get_book.AcademicYear.year}`

        const update_register_data = await prisma.bookRegistration.update({
            where: {
                id: register_book.id
            },
            data: {
                register_code: create_register_code
            },
            include: {
                book: true
            }
        })

        return Response.json({
            status: 200,
            message: "ลงทะเบียนหนังสือสำเร็จ",
            data: {
                register_code: create_register_code,
                register_data: update_register_data,
            },
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}

async function CheckRegisteredBook(book_code: string) {
    try {
        const cookie = await cookies();
        const env = process.env.JWT_SECRET || "jwtpasswordissoveryharadnaakubtuaeng";

        const get_token = cookie.get("student_token");

        if (!get_token) {
            return {
                status: 404,
                message: "กรุณาเข้าสู่ระบบ"
            }
        }

        const vertify_token: any = jwt.verify(get_token.value, env);

        if (!vertify_token) {
            return {
                status: 400,
                message: "กรุณาเข้าสู่ระบบ(ยืนยันตัวตนผิดพลาด)"
            }
        }

        const uid = vertify_token.uid;

        if (!uid) {
            return {
                status: 400,
                message: "กรุณาเข้าสู่ระบบ(ไม่พบข้อมูล)"
            }
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
            return {
                status: 400,
                message: "มีการลงทะเบียนหนังสือเล่มนี้แล้ว"
            }
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
            return {
                status: 400,
                message: "ไม่พบหนังสือที่ต้องการ"
            }
        }

        return {
            status: 200,
            message: "ไม่พบการลงทะเบียน",
            data: get_book
        }
    } catch (error) {
        return {
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        }
    }
}