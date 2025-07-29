"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardBody,
    Progress,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Select,
    SelectItem,
    addToast
} from "@heroui/react";
import { useState, useRef } from "react";
import { Upload, FileText, Download, AlertCircle, CheckCircle, X, ArrowRight, Columns } from "lucide-react";
import axios from "axios";

interface ImportStudentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    classId: number;
}

interface StudentImportData {
    name: string;
    stu_code: string;
    password: string;
    status?: 'pending' | 'success' | 'error';
    error?: string;
}

interface ColumnMapping {
    name: number | null;
    stu_code: number | null;
    password: number | null;
}

interface CSVData {
    headers: string[];
    rows: string[][];
}

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

export default function ImportStudentsModal({ isOpen, onClose, onSuccess, classId }: ImportStudentsModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [csvData, setCsvData] = useState<CSVData | null>(null);
    const [columnMapping, setColumnMapping] = useState<ColumnMapping>({
        name: null,
        stu_code: null,
        password: null
    });
    const [students, setStudents] = useState<StudentImportData[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [importResult, setImportResult] = useState<ImportResult | null>(null);
    const [currentStep, setCurrentStep] = useState<'upload' | 'mapping' | 'preview' | 'importing' | 'result'>('upload');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
                addToast({
                    color: "danger",
                    title: "ไฟล์ไม่ถูกต้อง",
                    description: "กรุณาเลือกไฟล์ CSV เท่านั้น"
                });
                return;
            }
            setFile(selectedFile);
            parseCSV(selectedFile);
        }
    };

    const parseCSV = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n').filter(line => line.trim());

            if (lines.length < 2) {
                addToast({
                    color: "danger",
                    title: "ไฟล์ไม่ถูกต้อง",
                    description: "ไฟล์ CSV ต้องมีหัวตารางและข้อมูลอย่างน้อย 1 แถว"
                });
                return;
            }

            // Parse headers and data
            const headers = lines[0].split(',').map(col => col.trim().replace(/"/g, ''));
            const dataRows = lines.slice(1).map(line => 
                line.split(',').map(col => col.trim().replace(/"/g, ''))
            );

            setCsvData({
                headers,
                rows: dataRows
            });

            // Auto-detect column mapping
            const autoMapping: ColumnMapping = {
                name: null,
                stu_code: null,
                password: null
            };

            headers.forEach((header, index) => {
                const lowerHeader = header.toLowerCase();
                if (lowerHeader.includes('ชื่อ') || lowerHeader.includes('name')) {
                    autoMapping.name = index;
                } else if (lowerHeader.includes('รหัส') || lowerHeader.includes('code') || lowerHeader.includes('id')) {
                    autoMapping.stu_code = index;
                } else if (lowerHeader.includes('รหัสผ่าน') || lowerHeader.includes('password') || lowerHeader.includes('pass')) {
                    autoMapping.password = index;
                }
            });

            setColumnMapping(autoMapping);
            setCurrentStep('mapping');
        };
        reader.readAsText(file, 'UTF-8');
    };

    const generateStudentsFromMapping = () => {
        if (!csvData || columnMapping.name === null || columnMapping.stu_code === null || columnMapping.password === null) {
            addToast({
                color: "danger",
                title: "การจับคู่คอลัมน์ไม่ครบ",
                description: "กรุณาเลือกคอลัมน์สำหรับชื่อ รหัสนักเรียน และรหัสผ่าน"
            });
            return false;
        }

        const parsedStudents: StudentImportData[] = [];

        csvData.rows.forEach((row) => {
            if (row.length > Math.max(columnMapping.name!, columnMapping.stu_code!, columnMapping.password!)) {
                const name = row[columnMapping.name!]?.trim();
                const stu_code = row[columnMapping.stu_code!]?.trim();
                const password = row[columnMapping.password!]?.trim();

                if (name && stu_code && password) {
                    parsedStudents.push({
                        name,
                        stu_code,
                        password,
                        status: 'pending'
                    });
                }
            }
        });

        if (parsedStudents.length === 0) {
            addToast({
                color: "danger",
                title: "ไม่พบข้อมูล",
                description: "ไม่พบข้อมูลนักเรียนที่ถูกต้องตามการจับคู่คอลัมน์"
            });
            return false;
        }

        setStudents(parsedStudents);
        return true;
    };

    const handleProceedToPreview = () => {
        if (generateStudentsFromMapping()) {
            setCurrentStep('preview');
        }
    };

    const handleImport = async () => {
        setIsProcessing(true);
        setCurrentStep('importing');

        const results: ImportResult = {
            success: 0,
            failed: 0,
            total: students.length,
            errors: []
        };

        // Option 1: Use bulk API (faster for large datasets)
        try {
            const response = await axios.post(`/api/admin/classes/${classId}/students/bulk`, {
                students: students.map(s => ({
                    name: s.name,
                    stu_code: s.stu_code,
                    password: s.password
                }))
            });

            if (response.data.status === 200) {
                const bulkResults = response.data.data;
                results.success = bulkResults.success;
                results.failed = bulkResults.failed;
                results.total = bulkResults.total;

                // Update student statuses
                students.forEach((student, index) => {
                    const error = bulkResults.errors.find((e: any) => e.index === index);
                    if (error) {
                        student.status = 'error';
                        student.error = error.error;
                        results.errors.push({
                            row: index + 2,
                            name: student.name,
                            stu_code: student.stu_code,
                            error: error.error
                        });
                    } else {
                        student.status = 'success';
                    }
                });
            } else {
                throw new Error(response.data.message || 'เกิดข้อผิดพลาด');
            }
        } catch (error: any) {
            console.error('Bulk import failed, falling back to individual imports:', error);

            // Fallback: Individual imports with progress
            for (let i = 0; i < students.length; i++) {
                const student = students[i];
                try {
                    const response = await axios.post(`/api/admin/classes/${classId}/students`, {
                        name: student.name,
                        stu_code: student.stu_code,
                        password: student.password
                    });

                    if (response.data.status === 201) {
                        student.status = 'success';
                        results.success++;
                    } else {
                        student.status = 'error';
                        student.error = response.data.message || 'เกิดข้อผิดพลาด';
                        results.failed++;
                        results.errors.push({
                            row: i + 2,
                            name: student.name,
                            stu_code: student.stu_code,
                            error: student.error || 'เกิดข้อผิดพลาด'
                        });
                    }
                } catch (error: any) {
                    student.status = 'error';
                    student.error = error.response?.data?.message || 'เกิดข้อผิดพลาด';
                    results.failed++;
                    results.errors.push({
                        row: i + 2,
                        name: student.name,
                        stu_code: student.stu_code,
                        error: student.error || 'เกิดข้อผิดพลาด'
                    });
                }

                // Update UI
                setStudents([...students]);

                // Small delay to show progress
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        setImportResult(results);
        setCurrentStep('result');
        setIsProcessing(false);

        if (results.success > 0) {
            addToast({
                color: "success",
                title: "นำเข้าสำเร็จ",
                description: `นำเข้านักเรียนสำเร็จ ${results.success} คน`
            });
        }
    };

    const handleClose = () => {
        setFile(null);
        setCsvData(null);
        setColumnMapping({ name: null, stu_code: null, password: null });
        setStudents([]);
        setImportResult(null);
        setCurrentStep('upload');
        setIsProcessing(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    const handleFinish = () => {
        if (importResult && importResult.success > 0) {
            onSuccess();
        }
        handleClose();
    };

    const downloadTemplate = () => {
        const csvContent = "ชื่อ-นามสกุล,รหัสนักเรียน,รหัสผ่าน\n" +
            "นายสมชาย ใจดี,60001,123456\n" +
            "นางสาวสมหญิง รักเรียน,60002,654321\n" +
            "นายทดสอบ ระบบ,60003,password";

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'template_students.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="4xl"
            scrollBehavior="inside"
            isDismissable={!isProcessing}
            classNames={{
                base: "bg-white",
                header: "border-b border-gray-200",
                footer: "border-t border-gray-200"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                        <Upload className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">นำเข้านักเรียนจากไฟล์ CSV</h2>
                        <p className="text-sm text-gray-600">
                            {currentStep === 'upload' && 'เลือกไฟล์ CSV ที่มีข้อมูลนักเรียน'}
                            {currentStep === 'mapping' && 'จับคู่คอลัมน์ข้อมูลกับฟิลด์ที่ต้องการ'}
                            {currentStep === 'preview' && 'ตรวจสอบข้อมูลก่อนนำเข้า'}
                            {currentStep === 'importing' && 'กำลังนำเข้าข้อมูล...'}
                            {currentStep === 'result' && 'ผลการนำเข้าข้อมูล'}
                        </p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    {/* Upload Step */}
                    {currentStep === 'upload' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">เลือกไฟล์ CSV</h3>
                                    <p className="text-gray-500 mb-4">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <Button
                                        color="primary"
                                        onPress={() => fileInputRef.current?.click()}
                                        startContent={<Upload className="w-4 h-4" />}
                                    >
                                        เลือกไฟล์
                                    </Button>
                                </div>
                            </div>

                            <Card>
                                <CardBody>
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-2">รูปแบบไฟล์ CSV</h4>
                                            <p className="text-sm text-gray-600 mb-3">
                                                ระบบจะให้คุณเลือกว่าคอลัมน์ไหนคือข้อมูลอะไร ไม่จำเป็นต้องเรียงตามลำดับ
                                            </p>
                                            <Button
                                                size="sm"
                                                variant="bordered"
                                                startContent={<Download className="w-4 h-4" />}
                                                onPress={downloadTemplate}
                                            >
                                                ดาวน์โหลดไฟล์ตัวอย่าง
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    )}

                    {/* Column Mapping Step */}
                    {currentStep === 'mapping' && csvData && (
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
                                            <p className="font-medium text-gray-800">{file?.name}</p>
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
                                                    setColumnMapping(prev => ({
                                                        ...prev,
                                                        name: value ? parseInt(value as string) : null
                                                    }));
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
                                                    setColumnMapping(prev => ({
                                                        ...prev,
                                                        stu_code: value ? parseInt(value as string) : null
                                                    }));
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
                                                    setColumnMapping(prev => ({
                                                        ...prev,
                                                        password: value ? parseInt(value as string) : null
                                                    }));
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
                    )}

                    {/* Preview Step */}
                    {currentStep === 'preview' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-800">
                                    ตรวจสอบข้อมูล ({students.length} คน)
                                </h3>
                                <Chip color="primary" variant="flat">
                                    {file?.name}
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
                                        <TableColumn>ชื่อ-นามสกุล</TableColumn>
                                        <TableColumn>รหัสนักเรียน</TableColumn>
                                        <TableColumn>รหัสผ่าน</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {students.slice(0, 10).map((student, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>
                                                    <Chip size="sm" variant="flat">
                                                        {student.stu_code}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-mono text-sm">
                                                        {'*'.repeat(student.password.length)}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {students.length > 10 && (
                                    <p className="text-center text-sm text-gray-500 mt-2">
                                        และอีก {students.length - 10} คน...
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Importing Step */}
                    {currentStep === 'importing' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">กำลังนำเข้าข้อมูล</h3>
                                <Progress
                                    value={(students.filter(s => s.status !== 'pending').length / students.length) * 100}
                                    className="mb-4"
                                    color="primary"
                                />
                                <p className="text-sm text-gray-600">
                                    {students.filter(s => s.status !== 'pending').length} / {students.length} คน
                                </p>
                            </div>

                            <div className="max-h-64 overflow-y-auto">
                                <div className="space-y-2">
                                    {students.map((student, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                            <div className="flex-shrink-0">
                                                {student.status === 'pending' && (
                                                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                                )}
                                                {student.status === 'success' && (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                )}
                                                {student.status === 'error' && (
                                                    <X className="w-4 h-4 text-red-500" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{student.name}</p>
                                                <p className="text-xs text-gray-500">{student.stu_code}</p>
                                                {student.error && (
                                                    <p className="text-xs text-red-500">{student.error}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Result Step */}
                    {currentStep === 'result' && importResult && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">ผลการนำเข้าข้อมูล</h3>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <Card>
                                        <CardBody className="text-center py-4">
                                            <p className="text-2xl font-bold text-green-600">{importResult.success}</p>
                                            <p className="text-sm text-gray-600">สำเร็จ</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody className="text-center py-4">
                                            <p className="text-2xl font-bold text-red-600">{importResult.failed}</p>
                                            <p className="text-sm text-gray-600">ล้มเหลว</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody className="text-center py-4">
                                            <p className="text-2xl font-bold text-blue-600">{importResult.total}</p>
                                            <p className="text-sm text-gray-600">ทั้งหมด</p>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>

                            {importResult.errors.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">รายการที่ล้มเหลว:</h4>
                                    <div className="max-h-48 overflow-y-auto">
                                        <Table
                                            aria-label="รายการที่ล้มเหลว"
                                            classNames={{
                                                wrapper: "shadow-none border border-gray-200"
                                            }}
                                        >
                                            <TableHeader>
                                                <TableColumn>แถว</TableColumn>
                                                <TableColumn>ชื่อ</TableColumn>
                                                <TableColumn>รหัส</TableColumn>
                                                <TableColumn>ข้อผิดพลาด</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {importResult.errors.map((error, errorIndex) => (
                                                    <TableRow key={errorIndex}>
                                                        <TableCell>{error.row}</TableCell>
                                                        <TableCell>{error.name}</TableCell>
                                                        <TableCell>{error.stu_code}</TableCell>
                                                        <TableCell>
                                                            <span className="text-red-600 text-sm">{error.error}</span>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </ModalBody>

                <ModalFooter>
                    {currentStep === 'upload' && (
                        <Button variant="light" onPress={handleClose}>
                            ยกเลิก
                        </Button>
                    )}

                    {currentStep === 'mapping' && (
                        <>
                            <Button variant="light" onPress={() => setCurrentStep('upload')}>
                                กลับ
                            </Button>
                            <Button
                                color="primary"
                                onPress={handleProceedToPreview}
                                startContent={<ArrowRight className="w-4 h-4" />}
                                isDisabled={columnMapping.name === null || columnMapping.stu_code === null || columnMapping.password === null}
                            >
                                ดูตัวอย่างข้อมูล
                            </Button>
                        </>
                    )}

                    {currentStep === 'preview' && (
                        <>
                            <Button variant="light" onPress={() => setCurrentStep('mapping')}>
                                กลับ
                            </Button>
                            <Button
                                color="primary"
                                onPress={handleImport}
                                startContent={<Upload className="w-4 h-4" />}
                                className="bg-gradient-to-r from-green-500 to-green-600"
                            >
                                นำเข้าข้อมูล ({students.length} คน)
                            </Button>
                        </>
                    )}

                    {currentStep === 'importing' && (
                        <Button variant="light" isDisabled>
                            กำลังดำเนินการ...
                        </Button>
                    )}

                    {currentStep === 'result' && (
                        <Button
                            color="primary"
                            onPress={handleFinish}
                            startContent={<CheckCircle className="w-4 h-4" />}
                        >
                            เสร็จสิ้น
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}