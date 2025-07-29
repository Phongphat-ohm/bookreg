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

        // ดึงข้อมูลวิชา
        const subjectData = await prisma.subject.findUnique({
            where: { id: Number(subject_id) },
            include: {
                SubjectGroup: {
                    include: {
                        Teacher: true
                    }
                }
            }
        });

        if (!subjectData) {
            return Response.json({
                status: 404,
                message: "ไม่พบข้อมูลวิชา"
            });
        }

        // ดึงข้อมูลการลงทะเบียนแยกตามห้อง
        const classes = await prisma.class.findMany({
            include: {
                students: {
                    include: {
                        registrations: {
                            where: {
                                subject_id: Number(subject_id)
                            }
                        }
                    }
                }
            },
            orderBy: [
                { grade: 'asc' },
                { name: 'asc' }
            ]
        });

        // คำนวณสถิติ
        let totalStudents = 0;
        let totalRegistered = 0;

        const classesData = classes.map(cls => {
            const studentsInClass = cls.students.length;
            const registeredInClass = cls.students.filter(student => 
                student.registrations.length > 0
            ).length;

            totalStudents += studentsInClass;
            totalRegistered += registeredInClass;

            return {
                class_id: cls.id,
                name: cls.name,
                grade: cls.grade,
                total: studentsInClass,
                registered: registeredInClass,
                unregistered: studentsInClass - registeredInClass
            };
        });

        const reportData = {
            subject: {
                id: subjectData.id,
                code: subjectData.code,
                name: subjectData.name,
                group_name: subjectData.SubjectGroup?.name || "",
                group_header: subjectData.SubjectGroup?.Teacher?.name || ""
            },
            summary: {
                total_students: totalStudents,
                registered_students: totalRegistered,
                unregistered_students: totalStudents - totalRegistered
            },
            classes: classesData
        };

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลรายงานสรุปเรียบร้อย",
            data: reportData
        });

    } catch (error) {
        console.error("Error fetching subject summary:", error);
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error: error
        });
    }
}