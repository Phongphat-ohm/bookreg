"use client";
import ScanCode from "@/components/ScanCode";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { FaBarcode } from "react-icons/fa6";

interface BarcodeScannerProps {
    onScan?: (barcode: string) => void;
}

export default function BarcodeScanner({ onScan }: BarcodeScannerProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleScanResult = (result: string) => {
        if (onScan) {
            onScan(result);
        }
        onOpenChange(); // ปิด modal
    };

    return (
        <>
            <Button isIconOnly color="primary" onPress={onOpen}>
                <FaBarcode />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">แสกนรหัสหลังหนังสือ</ModalHeader>
                            <ModalBody>
                                <ScanCode onResult={handleScanResult} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ปิด
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
