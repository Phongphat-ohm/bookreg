"use client";
import { LoadingProvider } from "@/context/Student/LoadindContext";
import { BarcodeProvider } from "@/context/Student/ScanDataContext";
import { UserProvider } from "@/context/Student/UserDataContext";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children?: ReactNode }) {
    return (
        <>
            <UserProvider>
                <BarcodeProvider>
                    <HeroUIProvider>
                        <LoadingProvider>
                            <ToastProvider placement="top-right" />
                            {children}
                        </LoadingProvider>
                    </HeroUIProvider>
                </BarcodeProvider>
            </UserProvider>
        </>
    )
}