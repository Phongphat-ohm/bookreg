"use client";
import { centerText, IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";

export default function ScanCode({ }) {
    const [scanData, setScanData] = useState<IDetectedBarcode[] | null>(null);
    const [scanned, setScanned] = useState(false);

    const handleScan = (data: IDetectedBarcode[]) => {
        if (!scanned && data.length > 0) {
            setScanData(data);
            setScanned(true);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-96">
                {!scanned && (
                    <Scanner
                        onScan={handleScan}
                        sound
                        formats={["ean_13"]}
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

            <h1 className="text-2xl mt-4">
                {scanData && (
                    <>
                        <div>Format: {scanData[0].format}</div>
                        <div>Value: {scanData[0].rawValue}</div>
                    </>
                )}
            </h1>

            {scanned && (
                <button
                    onClick={() => {
                        setScanData(null);
                        setScanned(false);
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    สแกนอีกครั้ง
                </button>
            )}
        </div>
    );
}
