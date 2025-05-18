import { TeacherProvider } from "@/context/Teacher/TeacherDataContext";
import { ReactNode } from "react";

export default function TeacherProviderGroup({ children }: { children?: ReactNode }) {
    return (
        <TeacherProvider>
            {children}
        </TeacherProvider>
    )
}