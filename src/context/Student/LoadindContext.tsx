"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (status: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useBarcode must be used within a BarcodeProvider");
    }
    return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setLoading] = useState<boolean>(true);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadingContext.Provider >
    );
};
