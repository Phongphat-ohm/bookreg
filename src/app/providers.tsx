"use client";
import { LoadingProvider } from "@/context/LoadindContext";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode } from "react";
import StudentProvider from "./StudentProvider";
import TeacherProviderGroup from "./TeacherProvider";

export default function Providers({ children }: { children?: ReactNode }) {
    return (
        <>
            <TeacherProviderGroup>
                <StudentProvider>
                    <HeroUIProvider>
                        <LoadingProvider>
                            <ToastProvider placement="top-right" />
                            {children}
                        </LoadingProvider>
                    </HeroUIProvider>
                </StudentProvider>
            </TeacherProviderGroup>
        </>
    )
}