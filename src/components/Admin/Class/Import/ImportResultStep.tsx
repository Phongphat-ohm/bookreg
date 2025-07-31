"use client";
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import { CheckCircle, AlertCircle, Users } from "lucide-react";

interface ImportResult {
    success: number;
    failed: number;
    total: number;
    errors: Array<{
        row: number;
        name: string;
        stu_code: string;
        error: string;
    }>;
}

interface ImportResultStepProps {
    result: ImportResult;
}

export default function ImportResultStep({ result }: ImportResultStepProps) {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    result.failed === 0 ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                    {result.failed === 0 ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                        <AlertCircle className="w-8 h-8 text-yellow-600" />
                    )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {result.failed === 0 ? 'นำเข้าสำเร็จทั้งหมด!' : 'นำเข้าเสร็จสิ้น'}
                </h3>
                <p className="text-gray-600">
                    นำเข้าข้อมูลนักเรียนเสร็จสิ้นแล้ว
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardBody className="text-center">
                        <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-800">{result.total}</p>
                        <p className="text-sm text-gray-600">ทั้งหมด</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="text-center">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{result.success}</p>
                        <p className="text-sm text-gray-600">สำเร็จ</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="text-center">
                        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-red-600">{result.failed}</p>
                        <p className="text-sm text-gray-600">ล้มเหลว</p>
                    </CardBody>
                </Card>
            </div>

            {/* Error Details */}
            {result.errors.length > 0 && (
                <Card>
                    <CardBody>
                        <h4 className="font-medium text-gray-800 mb-3">
                            รายการที่ล้มเหลว ({result.errors.length} รายการ)
                        </h4>
                        <div className="max-h-48 overflow-y-auto">
                            <Table
                                aria-label="รายการข้อผิดพลาด"
                                classNames={{
                                    wrapper: "shadow-none border border-gray-200"
                                }}
                            >
                                <TableHeader>
                                    <TableColumn>แถว</TableColumn>
                                    <TableColumn>ชื่อ-นามสกุล</TableColumn>
                                    <TableColumn>รหัสนักเรียน</TableColumn>
                                    <TableColumn>สาเหตุ</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {result.errors.map((error, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Chip size="sm" color="danger" variant="flat">
                                                    {error.row}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium text-gray-800">
                                                    {error.name}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono text-gray-600">
                                                    {error.stu_code}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-red-600 text-sm">
                                                    {error.error}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}