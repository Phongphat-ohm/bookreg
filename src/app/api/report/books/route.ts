import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const subject_id = searchParams.get('subject_id');

        const isSignin = await CheckSignin();

        if (isSignin.status !== 200) {
            return Response.json({
                status: isSignin.status,
                message: isSignin.message,
            });
        }

        if (!subject_id) {
            return Response.json({
                status: 400,
                message: "กรุณาระบุ subject_id"
            });
        }

        const books = await prisma.book.findMany({
            where: {
                subject_id: Number(subject_id)
            },
            include: {
                AcademicYear: true
            },
            orderBy: { id: 'asc' }
        });

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลหนังสือเรียบร้อย",
            data: books
        });

    } catch (error) {
        console.error("Error fetching books:", error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error: error
        });
    }
}