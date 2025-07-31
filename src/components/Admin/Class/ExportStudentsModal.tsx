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
    Chip,
    addToast
} from "@heroui/react";
import { useState } from "react";
import { Download, FileSpreadsheet, Users, Calendar } from "lucide-react";
import { exportStudentsToExcel } from "@/functions/exportUtils";

interface Student {
    id: number;
    name: string;
    stu_code: string;
    create_at: string;
}

interface ExportStudentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    students: Student[];
    selectedStudents?: Set<number>;
    className?: string;
}

export default function ExportStudentsModal({ 
    isOpen, 
    onClose, 
    students, 
    selectedStudents,
    className 
}: ExportStudentsModalProps) {
    const [isExporting, setIsExporting] = useState(false);

    const exportData = selectedStudents && selectedStudents.size > 0 
        ? students.filter(student => selectedStudents.has(student.id))
        : students;

    const handleExport = async () => {
        try {
            setIsExporting(true);
            
            const result = exportStudentsToExcel(exportData, className);
            
            addToast({
                color: "success",
                title: "Export สำเร็จ",
                description: `ดาวน์โหลดไฟล์ ${result.fileName} สำเร็จ (${result.totalStudents} คน)`
            });
            
            onClose();
        } catch (error) {
            console.error("Export error:", error);
            addToast({
                color: "danger",
                title: "Export ล้มเหลว",
                description: "เกิดข้อผิดพลาดในการ export ข้อมูล"
            });
        } finally {
            setIsExporting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
            isDismissable={!isExporting}
            classNames={{
                base: "bg-white",
                header: "border-b border-gray-200",
                footer: "border-t border-gray-200"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                        <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Export ข้อมูลนักเรียน</h2>
                        <p className="text-sm text-gray-600">
                            {selectedStudents && selectedStudents.size > 0 
                                ? `Export นักเรียนที่เลือก ${selectedStudents.size} คน`
                                : `Export นักเรียนทั้งหมด ${students.length} คน`
                            }
                        </p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-6">
                        {/* Export Format */}
                        <Card>
                            <CardBody>
                                <div className="flex items-start gap-3">
                                    <FileSpreadsheet className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800 mb-2">รูปแบบไฟล์ Excel (.xlsx)</h4>
                                        <p className="text-sm text-gray-600 mb-3">
                                            ไฟล์ Excel ที่มีข้อมูลนักเรียนพร้อมการจัดรูปแบบที่เหมาะสม
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <Chip size="sm" variant="flat" color="primary">ลำดับ</Chip>
                                            <Chip size="sm" variant="flat" color="primary">ชื่อ-นามสกุล</Chip>
                                            <Chip size="sm" variant="flat" color="primary">รหัสนักเรียน</Chip>
                                            <Chip size="sm" variant="flat" color="primary">วันที่เพิ่ม</Chip>
                                            <Chip size="sm" variant="flat" color="primary">ID</Chip>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Export Summary */}
                        <Card>
                            <CardBody>
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800 mb-2">สรุปข้อมูลที่จะ Export</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">จำนวนนักเรียน</p>
                                                <p className="font-semibold text-gray-800">{exportData.length} คน</p>
                                            </div>
                                            {className && (
                                                <div>
                                                    <p className="text-gray-600">ห้องเรียน</p>
                                                    <p className="font-semibold text-gray-800">{className}</p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-gray-600">วันที่ Export</p>
                                                <p className="font-semibold text-gray-800">{formatDate(new Date().toISOString())}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">รูปแบบไฟล์</p>
                                                <p className="font-semibold text-gray-800">Excel (.xlsx)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Preview */}
                        {exportData.length > 0 && (
                            <Card>
                                <CardBody>
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 mb-2">ตัวอย่างข้อมูล (5 คนแรก)</h4>
                                            <div className="space-y-2">
                                                {exportData.slice(0, 5).map((student, index) => (
                                                    <div key={student.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                        <span className="text-xs text-gray-500 w-6">{index + 1}</span>
                                                        <span className="font-medium text-gray-800 flex-1">{student.name}</span>
                                                        <Chip size="sm" variant="flat" color="primary" className="font-mono">
                                                            {student.stu_code}
                                                        </Chip>
                                                    </div>
                                                ))}
                                                {exportData.length > 5 && (
                                                    <p className="text-xs text-gray-500 text-center py-2">
                                                        และอีก {exportData.length - 5} คน...
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </div>
                </ModalBody>

                <ModalFooter className="flex justify-between">
                    <Button
                        variant="bordered"
                        onPress={onClose}
                        disabled={isExporting}
                    >
                        ยกเลิก
                    </Button>

                    <Button
                        color="primary"
                        startContent={!isExporting && <Download className="w-4 h-4" />}
                        onPress={handleExport}
                        isLoading={isExporting}
                        disabled={isExporting || exportData.length === 0}
                        className="bg-gradient-to-r from-blue-500 to-blue-600"
                    >
                        {isExporting ? 'กำลัง Export...' : 'ดาวน์โหลด Excel'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}