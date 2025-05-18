"use client";

import { addToast, Button, Input } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa6";

export default function Signin() {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handle_signin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        const data = JSON.stringify({
            username,
            password
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/teacher/signin',
            headers: {
                'Content-Type': 'application/json',
            },
            data
        };

        try {
            const req_signin = await axios(config);
            const req_data = req_signin.data;

            if (req_data.status === 200) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: req_data.message,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true
                });

                setTimeout(() => {
                    if (req_data.role === "admin") {
                        router.push("/teacher/admin");
                    } else {
                        router.push("/teacher/home");
                    }
                }, 2500);
            } else {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: req_data.message,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true
                });
            }
        } catch (error) {
            console.error(error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "เซิฟเวอร์มีการทำงานผิดพลาด"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handle_signin} className="w-96 p-5 rounded-xl shadow bg-white mt-3 border-t-4 border-blue-900">
                <h1 className="text-xl text-center text-blue-900 font-bold">
                    เข้าสู่ระบบ
                </h1>
                <div className="mt-3 flex flex-col gap-3 p-2">
                    <Input isRequired autoComplete="off" type="text" label="ชื่อผู้ใช้" variant="bordered" labelPlacement="outside" startContent={<FaUser className="text-gray-500" />} name="username" id="username" size="lg" placeholder="กรอกชื่อผู้ใช้" color="primary" />
                    <Input isRequired type="password" label="รหัสผ่าน" variant="bordered" labelPlacement="outside" startContent={<FaLock className="text-gray-500" />} name="password" id="password" size="lg" placeholder="กรอกรหัสผ่าน" color="primary" />
                </div>
                <div className="mt-2 flex justify-center">
                    <Button type="submit" color="primary" isLoading={isLoading}>
                        เข้าสู่ระบบ
                    </Button>
                </div>
            </form>
            <div className="mt-2 text-gray-500 text-sm">
                สร้างโดย นายพงษ์ภัทร เภสัชชะ
            </div>
        </>
    );
}
