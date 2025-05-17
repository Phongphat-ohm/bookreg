"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface BarcodeContextType {
    barcode: string | null;
    setBarcode: (code: string | null) => void;
    scanned: boolean;
    setScanned: (code: boolean | false) => void;
}

const BarcodeContext = createContext<BarcodeContextType | undefined>(undefined);

export const useBarcode = () => {
    const context = useContext(BarcodeContext);
    if (!context) {
        throw new Error("useBarcode must be used within a BarcodeProvider");
    }
    return context;
};

export const BarcodeProvider = ({ children }: { children: ReactNode }) => {
    const [barcode, setBarcode] = useState<string | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);

    return (
        <BarcodeContext.Provider value={{ barcode, setBarcode, scanned, setScanned }}>
            {children}
        </BarcodeContext.Provider>
    );
};
