"use client";
import { centerText, IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";

interface ScanCodeProps {
    onResult?: (result: string) => void;
}

export default function ScanCode({ onResult }: ScanCodeProps) {
    const [scanData, setScanData] = useState<IDetectedBarcode[] | null>(null);
    const [scanned, setScanned] = useState(false);

    const handleScan = (data: IDetectedBarcode[]) => {
        if (!scanned && data.length > 0) {
            setScanData(data);
            setScanned(true);
            
            // เรียก callback function ถ้ามี
            if (onResult) {
                onResult(data[0].rawValue);
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-sm">
                {!scanned && (
                    <Scanner
                        onScan={handleScan}
                        sound
                        formats={["ean_13", "code_128", "code_39"]}
                        allowMultiple={false}
                        components={{
                            onOff: true,
                            torch: true,
                            zoom: true,
                            finder: true,
                            tracker: centerText,
                        }}
                    />
                )}
            </div>

            {scanData && (
                <div className="text-center mt-4">
                    <div className="text-sm text-gray-600">Format: {scanData[0].format}</div>
                    <div className="text-lg font-medium">Value: {scanData[0].rawValue}</div>
                </div>
            )}

            {scanned && (
                <button
                    onClick={() => {
                        setScanData(null);
                        setScanned(false);
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    สแกนอีกครั้ง
                </button>
            )}
        </div>
    );
}
