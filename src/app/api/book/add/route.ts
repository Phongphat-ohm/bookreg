import { CheckSignin } from "@/functions/CheckSignin";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { barcode, name, description, subject_id, academic_year_id } = data;
        const isSignin = await CheckSignin();

        if (isSignin.status !== 200) {
            return Response.json({
                status: isSignin.status,
                message: isSignin.message,
            });
        }

        if (!barcode || !name || !subject_id || !academic_year_id) {
            return Response.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
            });
        }

        // ตรวจสอบว่า barcode ซ้ำหรือไม่
        const existingBook = await prisma.book.findUnique({
            where: { barcode }
        });

        if (existingBook) {
            return Response.json({
                status: 400,
                message: "รหัสบาร์โค้ดนี้มีอยู่ในระบบแล้ว",
            });
        }

        // ตรวจสอบว่า subject_id และ academic_year_id มีอยู่จริง
        const subject = await prisma.subject.findUnique({
            where: { id: Number(subject_id) }
        });

        const academicYear = await prisma.academicYear.findUnique({
            where: { id: Number(academic_year_id) }
        });

        if (!subject) {
            return Response.json({
                status: 400,
                message: "ไม่พบวิชาที่ระบุ",
            });
        }

        if (!academicYear) {
            return Response.json({
                status: 400,
                message: "ไม่พบปีการศึกษาที่ระบุ",
            });
        }

        const newBook = await prisma.book.create({
            data: {
                barcode,
                name,
                description: description || null,
                subject_id: Number(subject_id),
                academic_year_id: Number(academic_year_id)
            },
            include: {
                subject: true,
                AcademicYear: true
            }
        });

        return Response.json({
            status: 200,
            message: "เพิ่มหนังสือเรียบร้อย",
            data: newBook,
        });
    } catch (error) {
        console.error("Error adding book:", error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error: error
        });
    }
}