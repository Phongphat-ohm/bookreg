import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const isSignin = await CheckSignin();

        if (isSignin.status !== 200) {
            return Response.json({
                status: isSignin.status,
                message: isSignin.message,
            });
        }

        const classes = await prisma.class.findMany({
            orderBy: { id: 'asc' }
        });

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลห้องเรียนเรียบร้อย",
            data: classes
        });

    } catch (error) {
        console.error("Error fetching classes:", error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error: error
        });
    }
}