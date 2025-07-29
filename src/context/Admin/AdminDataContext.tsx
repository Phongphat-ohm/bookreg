"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Admin {
    id: number;
    name: string;
    role: string;
    create_at: Date;
    update_at: Date;
}

type AdminContextType = {
    admin: Admin | null;
    setAdmin: (admin: Admin | null) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}