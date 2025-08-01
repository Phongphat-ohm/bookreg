import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, barcode, name, description, academic_year } = data;
        const isSignin = await CheckSignin();

        if (isSignin.status !== 200) {
            return Response.json({
                status: isSignin.status,
                message: isSignin.message,
            });
        }

        if (!id || !barcode || !name || !academic_year) {
            return Response.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
            });
        }

        // ตรวจสอบว่าปีการศึกษามีอยู่จริง
        const academicYear = await prisma.academicYear.findFirst({
            where: { year: academic_year }
        });

        if (!academicYear) {
            return Response.json({
                status: 400,
                message: "ไม่พบปีการศึกษาที่ระบุ",
            });
        }

        const editBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                barcode,
                name,
                description,
                academic_year_id: academicYear.id
            },
        })

        if (!editBook) {
            return Response.json({
                status: 400,
                message: "ไม่พบหนังสือที่ต้องการแก้ไข",
            });
        }

        return Response.json({
            status: 200,
            message: "แก้ไขข้อมูลหนังสือเรียบร้อย",
            data: editBook,
        });
    } catch (error) {
        console.error("Error editing book:", error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error: error
        });
    }
}