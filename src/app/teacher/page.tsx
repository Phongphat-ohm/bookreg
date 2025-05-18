"use client"
import Signin from "@/components/Teacher/Signin";
import { Image } from "@heroui/react";

export default function TeacherSignin() {
    return (
        <>
            <div className="h-screen flex flex-col items-center pt-20 bg-gray-100">
                <Image src={"/images/logo.png"} className="w-52" />
                <Signin />
            </div>
        </>
    )
}