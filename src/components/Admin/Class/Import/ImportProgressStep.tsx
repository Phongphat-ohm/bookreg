"use client";
import { Progress, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

interface StudentImportData {
    name: string;
    stu_code: string;
    password: string;
    status?: 'pending' | 'success' | 'error';
    error?: string;
}

interface ImportProgressStepProps {
    students: StudentImportData[];
    isProcessing: boolean;
}

export default function ImportProgressStep({ students, isProcessing }: ImportProgressStepProps) {
    const completedCount = students.filter(s => s.status === 'success' || s.status === 'error').length;
    const successCount = students.filter(s => s.status === 'success').length;
    const errorCount = students.filter(s => s.status === 'error').length;
    const progress = (completedCount / students.length) * 100;

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {isProcessing ? 'กำลังนำเข้าข้อมูล...' : 'นำเข้าข้อมูลเสร็จสิ้น'}
                </h3>
                <p className="text-sm text-gray-600">
                    {completedCount} จาก {students.length} คน
                </p>
            </div>

            <div className="space-y-2">
                <Progress
                    value={progress}
                    color={progress === 100 ? (errorCount > 0 ? "warning" : "success") : "primary"}
                    className="w-full"
                />
                <div className="flex justify-between text-sm">
                    <span className="text-green-600">สำเร็จ: {successCount}</span>
                    <span className="text-red-600">ล้มเหลว: {errorCount}</span>
                </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
                <Table
                    aria-label="สถานะการนำเข้า"
                    classNames={{
                        wrapper: "shadow-none border border-gray-200"
                    }}
                >
                    <TableHeader>
                        <TableColumn width={60}>สถานะ</TableColumn>
                        <TableColumn>ชื่อ-นามสกุล</TableColumn>
                        <TableColumn>รหัสนักเรียน</TableColumn>
                        <TableColumn>ข้อความ</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {student.status === 'success' && (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    )}
                                    {student.status === 'error' && (
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    {student.status === 'pending' && (
                                        <Clock className="w-5 h-5 text-gray-400" />
                                    )}
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
                                    {student.status === 'success' && (
                                        <span className="text-green-600 text-sm">นำเข้าสำเร็จ</span>
                                    )}
                                    {student.status === 'error' && (
                                        <span className="text-red-600 text-sm">{student.error}</span>
                                    )}
                                    {student.status === 'pending' && (
                                        <span className="text-gray-500 text-sm">รอดำเนินการ...</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}