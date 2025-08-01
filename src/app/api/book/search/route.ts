import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const get_query = new URL(req.url).searchParams;
    const barcode = get_query.get("code");

    if (!barcode) {
        return Response.json({
            status: 400,
            message: "กรุณากรอกบาร์โค้ด"
        })
    }

    try {
        const get_book_data = await prisma.book.findUnique({
            where: {
                barcode
            },
            include: {
                subject: true
            }
        })

        if (!get_book_data) {
            return Response.json({
                status: 404,
                message: "ไม่พบหนังสือที่ต้องการหา"
            })
        }

        return Response.json({
            status: 200,
            message: "ค้นหาหนังสือสำเร็จ",
            book: get_book_data
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}