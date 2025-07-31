import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { studentIds } = body;

        // Validate input
        if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
            return NextResponse.json({
                status: 400,
                message: "กรุณาระบุรายการนักเรียนที่ต้องการลบ"
            });
        }

        // Convert to numbers and validate
        const validIds = studentIds.filter(id => !isNaN(parseInt(id))).map(id => parseInt(id));
        
        if (validIds.length === 0) {
            return NextResponse.json({
                status: 400,
                message: "ID นักเรียนไม่ถูกต้อง"
            });
        }

        // Check which students exist and have registrations
        const existingStudents = await prisma.student.findMany({
            where: { id: { in: validIds } },
            include: {
                registrations: true
            }
        });

        if (existingStudents.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "ไม่พบนักเรียนที่ระบุ"
            });
        }

        // Separate students that can be deleted from those that cannot
        const canDelete: number[] = [];
        const cannotDelete: Array<{ id: number; name: string; reason: string }> = [];

        existingStudents.forEach(student => {
            if (student.registrations.length > 0) {
                cannotDelete.push({
                    id: student.id,
                    name: student.name,
                    reason: "มีการลงทะเบียนหนังสือ"
                });
            } else {
                canDelete.push(student.id);
            }
        });

        let deletedCount = 0;
        let errors: Array<{ id: number; name: string; error: string }> = [];

        // Delete students that can be deleted
        if (canDelete.length > 0) {
            try {
                const deleteResult = await prisma.student.deleteMany({
                    where: { id: { in: canDelete } }
                });
                deletedCount = deleteResult.count;
            } catch (error) {
                console.error("Error in bulk delete:", error);
                // If bulk delete fails, try individual deletes
                for (const studentId of canDelete) {
                    try {
                        await prisma.student.delete({
                            where: { id: studentId }
                        });
                        deletedCount++;
                    } catch (individualError) {
                        const student = existingStudents.find(s => s.id === studentId);
                        errors.push({
                            id: studentId,
                            name: student?.name || `ID: ${studentId}`,
                            error: "เกิดข้อผิดพลาดในการลบ"
                        });
                    }
                }
            }
        }

        // Add cannot delete items to errors
        cannotDelete.forEach(item => {
            errors.push({
                id: item.id,
                name: item.name,
                error: item.reason
            });
        });

        const totalRequested = validIds.length;
        const failedCount = errors.length;

        return NextResponse.json({
            status: 200,
            message: `ลบนักเรียนเสร็จสิ้น`,
            data: {
                total: totalRequested,
                success: deletedCount,
                failed: failedCount,
                errors: errors
            }
        });

    } catch (error) {
        console.error("Error in bulk delete students:", error);
        return NextResponse.json({
            status: 500,
            message: "เกิดข้อผิดพลาดในการลบนักเรียน"
        });
    }
}