"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    addToast
} from "@heroui/react";
import { useState } from "react";
import { Upload, ArrowRight, ArrowLeft, X } from "lucide-react";
import axios from "axios";
import FileUploadStep from "./Import/FileUploadStep";
import ColumnMappingStep from "./Import/ColumnMappingStep";
import PreviewStep from "./Import/PreviewStep";
import ImportProgressStep from "./Import/ImportProgressStep";
import ImportResultStep from "./Import/ImportResultStep";

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

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        parseCSV(selectedFile);
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

        // Try bulk API first (faster for large datasets)
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

    const canProceedToPreview = () => {
        return columnMapping.name !== null &&
            columnMapping.stu_code !== null &&
            columnMapping.password !== null;
    };

    const canGoBack = () => {
        return currentStep !== 'upload' && currentStep !== 'importing';
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 'upload': return 'เลือกไฟล์ CSV ที่มีข้อมูลนักเรียน';
            case 'mapping': return 'จับคู่คอลัมน์ข้อมูลกับฟิลด์ที่ต้องการ';
            case 'preview': return 'ตรวจสอบข้อมูลก่อนนำเข้า';
            case 'importing': return 'กำลังนำเข้าข้อมูล...';
            case 'result': return 'ผลการนำเข้าข้อมูล';
            default: return '';
        }
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
                        <p className="text-sm text-gray-600">{getStepTitle()}</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    {currentStep === 'upload' && (
                        <FileUploadStep
                            onFileSelect={handleFileSelect}
                            onDownloadTemplate={downloadTemplate}
                        />
                    )}

                    {currentStep === 'mapping' && csvData && file && (
                        <ColumnMappingStep
                            csvData={csvData}
                            file={file}
                            columnMapping={columnMapping}
                            onMappingChange={setColumnMapping}
                        />
                    )}

                    {currentStep === 'preview' && file && (
                        <PreviewStep
                            students={students}
                            fileName={file.name}
                        />
                    )}

                    {currentStep === 'importing' && (
                        <ImportProgressStep
                            students={students}
                            isProcessing={isProcessing}
                        />
                    )}

                    {currentStep === 'result' && importResult && (
                        <ImportResultStep result={importResult} />
                    )}
                </ModalBody>

                <ModalFooter className="flex justify-between">
                    <div>
                        {canGoBack() && (
                            <Button
                                variant="bordered"
                                startContent={<ArrowLeft className="w-4 h-4" />}
                                onPress={() => {
                                    if (currentStep === 'mapping') setCurrentStep('upload');
                                    else if (currentStep === 'preview') setCurrentStep('mapping');
                                    else if (currentStep === 'result') setCurrentStep('preview');
                                }}
                                disabled={isProcessing}
                            >
                                ย้อนกลับ
                            </Button>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="bordered"
                            startContent={<X className="w-4 h-4" />}
                            onPress={currentStep === 'result' ? handleFinish : handleClose}
                            disabled={isProcessing}
                        >
                            {currentStep === 'result' ? 'เสร็จสิ้น' : 'ยกเลิก'}
                        </Button>

                        {currentStep === 'mapping' && (
                            <Button
                                color="primary"
                                endContent={<ArrowRight className="w-4 h-4" />}
                                onPress={handleProceedToPreview}
                                disabled={!canProceedToPreview()}
                            >
                                ดูตัวอย่าง
                            </Button>
                        )}

                        {currentStep === 'preview' && (
                            <Button
                                color="primary"
                                endContent={<Upload className="w-4 h-4" />}
                                onPress={handleImport}
                                disabled={isProcessing}
                            >
                                เริ่มนำเข้า
                            </Button>
                        )}
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}