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
import { useState, useEffect } from "react";
import { Camera, X, RotateCcw } from "lucide-react";
import { Scanner, IDetectedBarcode, centerText } from "@yudiel/react-qr-scanner";

interface BarcodeScannerProps {
    isOpen: boolean;
    onClose: () => void;
    onScan: (barcode: string) => void;
    title?: string;
}

export default function BarcodeScanner({
    isOpen,
    onClose,
    onScan,
    title = "สแกนบาร์โค้ด"
}: BarcodeScannerProps) {
    const [scanData, setScanData] = useState<IDetectedBarcode[] | null>(null);
    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scannerError, setScannerError] = useState<string | null>(null);

    const handleScan = (data: IDetectedBarcode[]) => {
        if (!scanned && data.length > 0) {
            setScanData(data);
            setScanned(true);

            // เรียก callback function
            onScan(data[0].rawValue);

            addToast({
                color: "success",
                title: "สแกนสำเร็จ",
                description: `รหัสบาร์โค้ด: ${data[0].rawValue}`
            });

            // ปิด modal หลังสแกนสำเร็จ
            setTimeout(() => {
                handleClose();
            }, 1500);
        }
    };

    const handleError = (error: any) => {
        console.error("Scanner error:", error);
        setScannerError(error.message);
        setHasPermission(false);
        addToast({
            color: "danger",
            title: "ข้อผิดพลาดในการสแกน",
            description: "ไม่สามารถเข้าถึงกล้องได้ กรุณาตรวจสอบสิทธิ์การใช้งาน"
        });
    };

    const resetScanner = () => {
        setScanData(null);
        setScanned(false);
        setScannerError(null);
        setHasPermission(null);
    };

    const handleClose = () => {
        resetScanner();
        onClose();
    };

    // Reset scanner when modal opens
    useEffect(() => {
        if (isOpen) {
            resetScanner();
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            classNames={{
                base: "bg-white",
                header: "border-b border-gray-200",
                footer: "border-t border-gray-200"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                        <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-600">วางบาร์โค้ดให้อยู่ในกรอบเพื่อสแกน</p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-4">
                        {hasPermission === false && (
                            <div className="text-center py-8">
                                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <X className="w-8 h-8 text-red-500" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-2">
                                    ไม่สามารถเข้าถึงกล้องได้
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    กรุณาอนุญาตการใช้งานกล้องในเบราว์เซอร์
                                </p>
                                {scannerError && (
                                    <p className="text-sm text-red-600 mb-4">
                                        ข้อผิดพลาด: {scannerError}
                                    </p>
                                )}
                                <Button
                                    color="primary"
                                    onPress={resetScanner}
                                    startContent={<RotateCcw className="w-4 h-4" />}
                                >
                                    ลองอีกครั้ง
                                </Button>
                            </div>
                        )}

                        {!scanned && hasPermission !== false && (
                            <div className="space-y-4">
                                {/* Scanner */}
                                <Card>
                                    <CardBody className="p-0">
                                        <div className="w-full max-w-md mx-auto">
                                            <Scanner
                                                onScan={handleScan}
                                                onError={handleError}
                                                formats={["ean_13", "ean_8", "code_128", "code_39", "upc_a", "upc_e", "codabar"]}
                                                allowMultiple={false}
                                                components={{
                                                    onOff: true,
                                                    torch: true,
                                                    zoom: true,
                                                    finder: true,
                                                    tracker: centerText,
                                                }}
                                                styles={{
                                                    container: {
                                                        width: '100%',
                                                        height: '300px'
                                                    }
                                                }}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Status */}
                                <div className="flex items-center justify-center gap-2">
                                    <Chip
                                        variant="flat"
                                        color="success"
                                        startContent={
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        }
                                    >
                                        กำลังสแกน...
                                    </Chip>
                                </div>

                                {/* Instructions */}
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-800 mb-2">วิธีใช้งาน</h4>
                                    <div className="text-sm text-blue-700 space-y-1">
                                        <p>• วางบาร์โค้ดให้อยู่ในกรอบเพื่อสแกน</p>
                                        <p>• ให้แสงเพียงพอและบาร์โค้ดชัดเจน</p>
                                        <p>• ระบบจะสแกนอัตโนมัติเมื่อตรวจพบบาร์โค้ด</p>
                                        <p>• สามารถใช้ปุ่มควบคุมในหน้าจอสแกนได้</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {scanned && scanData && (
                            <div className="space-y-4">
                                {/* Scan Result */}
                                <Card>
                                    <CardBody className="text-center">
                                        <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <Camera className="w-8 h-8 text-green-500" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                                            สแกนสำเร็จ!
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="text-sm text-gray-600">
                                                รูปแบบ: {scanData[0].format}
                                            </div>
                                            <div className="text-lg font-mono font-medium bg-gray-100 p-2 rounded">
                                                {scanData[0].rawValue}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Scan Again Button */}
                                <div className="text-center">
                                    <Button
                                        color="primary"
                                        onPress={resetScanner}
                                        startContent={<RotateCcw className="w-4 h-4" />}
                                    >
                                        สแกนอีกครั้ง
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={handleClose}
                    >
                        {scanned ? 'ปิด' : 'ยกเลิก'}
                    </Button>
                    {scanned && (
                        <Button
                            color="primary"
                            onPress={handleClose}
                        >
                            ใช้รหัสนี้
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}