"use client";
import { useBarcode } from "@/context/Student/ScanDataContext";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import {
    centerText,
    IDetectedBarcode,
    Scanner,
} from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { FaBarcode } from "react-icons/fa6";

export default function BarcodeScanner() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [scanData, setScanData] = useState<IDetectedBarcode[] | null>(null);
    const { barcode, setBarcode, scanned, setScanned } = useBarcode();

    const handleScan = (data: IDetectedBarcode[]) => {
        if (!scanned && data.length > 0) {
            setScanData(data);
            setScanned(true);
            setBarcode(data[0].rawValue);
            onClose();
        }
    };

    const handleOpen = () => {
        setScanned(false);
        setBarcode(null);
        onOpen();
    };

    return (
        <>
            <Button type="button" onPress={handleOpen} isIconOnly color="primary">
                <FaBarcode />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                แสกนรหัสหลังหนังสือ
                            </ModalHeader>
                            <ModalBody>
                                <div className="overflow-hidden rounded-lg mb-5">
                                    <Scanner
                                        onScan={handleScan}
                                        formats={["ean_13"]}
                                        components={{
                                            tracker: centerText,
                                            onOff: true,
                                            zoom: true,
                                            finder: true,
                                            torch: true,
                                        }}
                                    />
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
