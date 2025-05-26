"use client";
import { Spinner } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const router = useRouter();

    const logout = async () => {
        try {
            const request = await axios.get("/api/teacher/logout");

            if (request.data.status === 200) {
                router.push("/teacher");
                return;
            } else {
                router.push("/teacher/home");
                return;
            }
        } catch (error) {
            router.push("/teacher/home");
            return;
        }
    }

    useEffect(() => {
        logout()
    }, [])

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center fixed top-0 left-0 z-50 bg-white">
            <Spinner variant="dots" />
            <h1 className="text-lg text-blue-500 mt-3">
                กำลังออกจากระบบ
            </h1>
        </div>
    )
}