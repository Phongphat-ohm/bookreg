"use client";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Layout/Sidebar";
import Navbar from "./Layout/Navbar";
import axios from "axios";
import { addToast, Spinner } from "@heroui/react";
import { useAdmin } from "@/context/Admin/AdminDataContext";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
    children?: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [isLoading, setLoading] = useState(true);
    const { admin, setAdmin } = useAdmin();
    const route = useRouter();

    const get_user = async () => {
        setLoading(true);
        try {
            const get_user = await axios.get("/api/admin/me");
            const response = get_user.data;

            if (response.status !== 200) {
                route.push("/teacher")
                return;
            }

            const user = response.data;
            setAdmin(user);
            setLoading(false);
            return;
        } catch (error) {
            console.log(error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "มีบางอย่างผิดพลาด"
            })
            return;
        }
    }

    useEffect(() => {
        get_user();
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <Spinner variant="wave" />
                    <label className="font-bold">กำลังโหลดข้อมูล</label>
                </div>
            ) : (
                <div className="h-screen w-full flex bg-gray-50">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        {/* Navbar */}
                        <Navbar />

                        {/* Page Content */}
                        <main className="flex-1 bg-gray-50">
                            <div className="p-6">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
}