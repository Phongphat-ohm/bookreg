import { CheckSignin } from "@/functions/CheckSignin"
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    try {
        const checkSignin = await CheckSignin();

        if (checkSignin.status !== 200 || !checkSignin.data) {
            return Response.json(checkSignin);
        }

        const body = await req.json();
        const { name, currentPassword, newPassword } = body;

        // ตรวจสอบว่าเป็นครูจริง
        const teacher = await prisma.teacher.findFirst({
            where: {
                id: Number(checkSignin.data.uid)
            }
        });

        if (!teacher) {
            return Response.json({
                status: 401,
                message: "ไม่พบข้อมูลครู หรือไม่มีสิทธิ์เข้าถึง"
            });
        }

        // ตรวจสอบว่าเป็นครูหรือแอดมิน
        if (!['teacher', 'admin'].includes(teacher.role)) {
            return Response.json({
                status: 403,
                message: "ไม่มีสิทธิ์ในการแก้ไขข้อมูล"
            });
        }

        // เตรียมข้อมูลที่จะอัปเดต
        const updateData: any = {};

        // อัปเดตชื่อ (ถ้ามี)
        if (name && name.trim() !== "") {
            const trimmedName = name.trim();
            if (trimmedName.length < 2) {
                return Response.json({
                    status: 400,
                    message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"
                });
            }
            if (trimmedName.length > 100) {
                return Response.json({
                    status: 400,
                    message: "ชื่อต้องไม่เกิน 100 ตัวอักษร"
                });
            }
            updateData.name = trimmedName;
        }

        // อัปเดตรหัสผ่าน (ถ้ามี)
        if (newPassword && newPassword.trim() !== "") {
            // ตรวจสอบรหัสผ่านเดิม
            if (!currentPassword) {
                return Response.json({
                    status: 400,
                    message: "กรุณาใส่รหัสผ่านเดิม"
                });
            }

            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, teacher.password);
            if (!isCurrentPasswordValid) {
                return Response.json({
                    status: 400,
                    message: "รหัสผ่านเดิมไม่ถูกต้อง"
                });
            }

            // ตรวจสอบความยาวรหัสผ่านใหม่
            if (newPassword.length < 6) {
                return Response.json({
                    status: 400,
                    message: "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร"
                });
            }

            // เข้ารหัสรหัสผ่านใหม่
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashedNewPassword;
        }

        // ตรวจสอบว่ามีข้อมูลที่จะอัปเดตหรือไม่
        if (Object.keys(updateData).length === 0) {
            return Response.json({
                status: 400,
                message: "ไม่มีข้อมูลที่จะอัปเดต"
            });
        }

        // เพิ่ม update timestamp
        updateData.update_at = new Date();

        // อัปเดตข้อมูล
        const updatedTeacher = await prisma.teacher.update({
            where: { id: teacher.id },
            data: updateData,
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                create_at: true,
                update_at: true
            }
        });

        return Response.json({
            status: 200,
            message: "อัปเดตข้อมูลสำเร็จ",
            data: updatedTeacher
        });

    } catch (error) {
        console.error("Error updating teacher profile:", error);
        return Response.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}