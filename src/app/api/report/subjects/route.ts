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

        const subjects = await prisma.subject.findMany({
            include: {
                SubjectGroup: {
                    include: {
                        Teacher: true
                    }
                }
            },
            orderBy: { id: 'asc' }
        });

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลวิชาเรียบร้อย",
            data: subjects
        });

    } catch (error) {
        console.error("Error fetching subjects:", error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error: error
        });
    }
}