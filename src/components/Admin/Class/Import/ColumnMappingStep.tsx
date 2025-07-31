"use client";
import { Card, CardBody, Chip, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { Columns } from "lucide-react";

interface CSVData {
    headers: string[];
    rows: string[][];
}

interface ColumnMapping {
    name: number | null;
    stu_code: number | null;
    password: number | null;
}

interface ColumnMappingStepProps {
    csvData: CSVData;
    file: File;
    columnMapping: ColumnMapping;
    onMappingChange: (mapping: ColumnMapping) => void;
}

export default function ColumnMappingStep({ 
    csvData, 
    file, 
    columnMapping, 
    onMappingChange 
}: ColumnMappingStepProps) {
    const updateMapping = (field: keyof ColumnMapping, value: number | null) => {
        onMappingChange({
            ...columnMapping,
            [field]: value
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <Columns className="w-5 h-5 text-blue-600" />
                <div>
                    <h3 className="text-lg font-medium text-gray-800">จับคู่คอลัมน์ข้อมูล</h3>
                    <p className="text-sm text-gray-600">เลือกคอลัมน์จากไฟล์ CSV ที่ตรงกับข้อมูลที่ต้องการ</p>
                </div>
            </div>

            {/* File Info */}
            <Card>
                <CardBody>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">{file.name}</p>
                            <p className="text-sm text-gray-600">
                                {csvData.headers.length} คอลัมน์ • {csvData.rows.length} แถว
                            </p>
                        </div>
                        <Chip color="primary" variant="flat">
                            CSV
                        </Chip>
                    </div>
                </CardBody>
            </Card>

            {/* Column Mapping */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Name Mapping */}
                <Card>
                    <CardBody>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <h4 className="font-medium text-gray-800">ชื่อ-นามสกุล</h4>
                                <span className="text-red-500">*</span>
                            </div>
                            <Select
                                placeholder="เลือกคอลัมน์"
                                selectedKeys={columnMapping.name !== null ? [columnMapping.name.toString()] : []}
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0];
                                    updateMapping('name', value ? parseInt(value as string) : null);
                                }}
                                size="sm"
                            >
                                {csvData.headers.map((header, index) => (
                                    <SelectItem key={index.toString()} textValue={header}>
                                        <div>
                                            <p className="font-medium">{header}</p>
                                            <p className="text-xs text-gray-500">
                                                ตัวอย่าง: {csvData.rows[0]?.[index] || '-'}
                                            </p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </CardBody>
                </Card>

                {/* Student Code Mapping */}
                <Card>
                    <CardBody>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <h4 className="font-medium text-gray-800">รหัสนักเรียน</h4>
                                <span className="text-red-500">*</span>
                            </div>
                            <Select
                                placeholder="เลือกคอลัมน์"
                                selectedKeys={columnMapping.stu_code !== null ? [columnMapping.stu_code.toString()] : []}
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0];
                                    updateMapping('stu_code', value ? parseInt(value as string) : null);
                                }}
                                size="sm"
                            >
                                {csvData.headers.map((header, index) => (
                                    <SelectItem key={index.toString()} textValue={header}>
                                        <div>
                                            <p className="font-medium">{header}</p>
                                            <p className="text-xs text-gray-500">
                                                ตัวอย่าง: {csvData.rows[0]?.[index] || '-'}
                                            </p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </CardBody>
                </Card>

                {/* Password Mapping */}
                <Card>
                    <CardBody>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <h4 className="font-medium text-gray-800">รหัสผ่าน</h4>
                                <span className="text-red-500">*</span>
                            </div>
                            <Select
                                placeholder="เลือกคอลัมน์"
                                selectedKeys={columnMapping.password !== null ? [columnMapping.password.toString()] : []}
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0];
                                    updateMapping('password', value ? parseInt(value as string) : null);
                                }}
                                size="sm"
                            >
                                {csvData.headers.map((header, index) => (
                                    <SelectItem key={index.toString()} textValue={header}>
                                        <div>
                                            <p className="font-medium">{header}</p>
                                            <p className="text-xs text-gray-500">
                                                ตัวอย่าง: {csvData.rows[0]?.[index] || '-'}
                                            </p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Preview Mapping */}
            {columnMapping.name !== null && columnMapping.stu_code !== null && columnMapping.password !== null && (
                <Card>
                    <CardBody>
                        <h4 className="font-medium text-gray-800 mb-3">ตัวอย่างการจับคู่ข้อมูล</h4>
                        <div className="overflow-x-auto">
                            <Table
                                aria-label="ตัวอย่างการจับคู่"
                                classNames={{
                                    wrapper: "shadow-none border border-gray-200"
                                }}
                            >
                                <TableHeader>
                                    <TableColumn>ชื่อ-นามสกุล</TableColumn>
                                    <TableColumn>รหัสนักเรียน</TableColumn>
                                    <TableColumn>รหัสผ่าน</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {csvData.rows.slice(0, 3).map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <span className="text-blue-600 font-medium">
                                                    {row[columnMapping.name!] || '-'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Chip size="sm" color="success" variant="flat">
                                                    {row[columnMapping.stu_code!] || '-'}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono text-purple-600">
                                                    {row[columnMapping.password!] ? '●'.repeat(Math.min(row[columnMapping.password!].length, 8)) : '-'}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {csvData.rows.length > 3 && (
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    และอีก {csvData.rows.length - 3} แถว...
                                </p>
                            )}
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}