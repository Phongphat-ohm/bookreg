"use client";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { addToast, Spinner } from "@heroui/react";
import { useLoading } from "@/context/LoadindContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTeacher } from "@/context/Teacher/TeacherDataContext";

export default function Layout({ children }: { children?: ReactNode }) {
    const { isLoading, setLoading } = useLoading();
    const { teacher, setTeacher } = useTeacher();
    const [error, setError] = useState("");
    const router = useRouter();

    const get_user = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/api/teacher/me'
        };

        try {
            const req_teacher = await axios(config);
            const data = req_teacher.data;

            if (data.status === 200) {
                setLoading(false);
                setTeacher(data.data);
                return;
            }

            setError(data.message);
            setTimeout(() => {
                router.push("/teacher");
            }, 2500);
            return;
        } catch (error) {
            router.push("/teacher");
            console.log(error);
        }
    }

    useEffect(() => {
        get_user();
    }, [])

    return (
        <>
            <div className="w-full min-h-screen flex bg-gray-100">
                {isLoading && (
                    <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-white z-50">
                        <Spinner variant="dots" />
                        <h1 className="text-lg text-blue-500">กำลังโหลดข้อมูล</h1>
                        <div className="text-red-500 font-bold">
                            {error}
                        </div>
                    </div>
                )}
                <Sidebar />
                <div className="w-full relative">
                    <Navbar />
                    <div className="p-5 pt-3">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}