"use client";
import { Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

interface StudentImportData {
    name: string;
    stu_code: string;
    password: string;
    status?: 'pending' | 'success' | 'error';
    error?: string;
}

interface PreviewStepProps {
    students: StudentImportData[];
    fileName: string;
}

export default function PreviewStep({ students, fileName }: PreviewStepProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">
                    ตรวจสอบข้อมูล ({students.length} คน)
                </h3>
                <Chip color="primary" variant="flat">
                    {fileName}
                </Chip>
            </div>

            <div className="max-h-96 overflow-y-auto">
                <Table
                    aria-label="ตัวอย่างข้อมูลนักเรียน"
                    classNames={{
                        wrapper: "shadow-none border border-gray-200"
                    }}
                >
                    <TableHeader>
                        <TableColumn>ลำดับ</TableColumn>
                        <TableColumn>ชื่อ-นามสกุล</TableColumn>
                        <TableColumn>รหัสนักเรียน</TableColumn>
                        <TableColumn>รหัสผ่าน</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <span className="text-gray-500 font-mono">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-gray-800">
                                        {student.name}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Chip size="sm" color="primary" variant="flat">
                                        {student.stu_code}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <span className="font-mono text-gray-600">
                                        {'●'.repeat(Math.min(student.password.length, 8))}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}