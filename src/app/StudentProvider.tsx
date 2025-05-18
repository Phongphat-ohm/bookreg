import { BarcodeProvider } from "@/context/Student/ScanDataContext";
import { UserProvider } from "@/context/Student/UserDataContext";
import { ReactNode } from "react";

export default function StudentProvider({ children }: { children?: ReactNode }) {
    return (
        <UserProvider>
            <BarcodeProvider>
                {children}
            </BarcodeProvider>
        </UserProvider>
    )
}