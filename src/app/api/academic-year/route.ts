import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const academic_years = await prisma.academicYear.findMany();

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลปีการศึกษาเรียบร้อย",
            data: academic_years
        });
    } catch (error) {
        console.error("Error fetching academic years:", error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error: error
        });

    }
}