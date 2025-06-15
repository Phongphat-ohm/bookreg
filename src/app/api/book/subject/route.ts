import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const query = new URL(req.url).searchParams;
    const subject_id = query.get("subject_id");

    if (!subject_id) {
        return Response.json({
            status: 400,
            message: "ไม่พบรหัสวิชาที่ส่งมา"
        })
    }

    try {
        const get_book_in_subject = await prisma.subject.findUnique({
            where: {
                id: Number(subject_id)
            },
            include: {
                books: true
            }
        })

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลหนังสือสำเร็จ",
            data: get_book_in_subject
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