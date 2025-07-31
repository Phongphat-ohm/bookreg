"use client";
import { Button, Card, CardBody } from "@heroui/react";
import { Download, AlertCircle } from "lucide-react";
import FileDropZone from "../FileDropZone";

interface FileUploadStepProps {
    onFileSelect: (file: File) => void;
    onDownloadTemplate: () => void;
}

export default function FileUploadStep({ onFileSelect, onDownloadTemplate }: FileUploadStepProps) {
    return (
        <div className="space-y-6">
            <FileDropZone
                onFileSelect={onFileSelect}
                accept=".csv"
                maxSize={10}
                className="w-full"
            />

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
                                onPress={onDownloadTemplate}
                            >
                                ดาวน์โหลดไฟล์ตัวอย่าง
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}