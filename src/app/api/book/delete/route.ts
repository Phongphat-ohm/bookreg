import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { book_id } = body;

        console.log(book_id)

        const check_signin = await CheckSignin();

        if (check_signin.status !== 200) {
            return Response.json(check_signin);
        }

        const delete_book = await prisma.book.delete({
            where: {
                id: Number(book_id)
            }
        });

        if (!delete_book) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถลบข้อมูลหนังสือได้"
            })
        }

        return Response.json({
            status: 200,
            message: "ลบข้อมูลสำเร็จ"
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