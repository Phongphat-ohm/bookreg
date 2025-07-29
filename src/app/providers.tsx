"use client";
import { LoadingProvider } from "@/context/LoadindContext";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode } from "react";
import StudentProvider from "./StudentProvider";
import TeacherProviderGroup from "./TeacherProvider";
import { AdminProvider } from "@/context/Admin/AdminDataContext";

export default function Providers({ children }: { children?: ReactNode }) {
    return (
        <>
            <HeroUIProvider>
                <AdminProvider>
                    <TeacherProviderGroup>
                        <StudentProvider>
                            <LoadingProvider>
                                <ToastProvider placement="top-right" />
                                {children}
                            </LoadingProvider>
                        </StudentProvider>
                    </TeacherProviderGroup>
                </AdminProvider>
            </HeroUIProvider>
        </>
    )
}