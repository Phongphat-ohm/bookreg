"use client";
import { addToast, Button, Image, Input, InputOtp } from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";

export default function StudentSignin() {
    const [idCard, setIdCard] = useState("");
    const [studentCode, setStudentCode] = useState("");
    const [step, setStep] = useState<"student" | "idcard">("student");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleStudentCodeSubmit = async () => {
        setLoading(true);
        try {
            let data = JSON.stringify({
                "stu_code": studentCode
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/student/stu-code-vertify',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const res = await axios(config);
            if (res.data.status === 200) {
                // addToast({
                //     color: "success",
                //     title: "สำเร็จ",
                //     description: res.data.message,
                //     timeout: 3000,
                //     shouldShowTimeoutProgress: true,
                // });
                setStep("idcard");
            } else {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: res.data.message,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                });
            }
        } catch (err) {
            addToast({
                color: "warning",
                title: "ระวัง",
                description: "เกิดข้อผิดพลาดในการตรวจสอบรหัสนักเรียน",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleIdCardSubmit = async () => {
        setLoading(true);
        try {
            let data = JSON.stringify({
                "stu_code": studentCode,
                "password": idCard
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/student/stu-vertify',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const res = await axios(config);

            if (res.data.status === 200) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: res.data.message,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                });

                setTimeout(() => {
                    router.push("/student/home");
                }, 3000);
            } else {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: res.data.message,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                });
            }
        } catch (err) {
            addToast({
                color: "warning",
                title: "ระวัง",
                description: "เกิดข้อผิดพลาดในการยืนยันตัวตน",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === "student") {
            await handleStudentCodeSubmit();
        } else {
            await handleIdCardSubmit();
        }
    };

    return (
        <div className="flex flex-col w-full items-center pt-10">
            <Image src={"/images/logo.png"} className="w-56" />
            <h1 className="text-4xl mt-3 text-blue-500">เข้าสู่ระบบ</h1>
            <label className="text-gray-400">เพื่อใช้งานระบบลงทะเบียนหนังสือ</label>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 items-center">
                <AnimatePresence mode="wait">
                    {step === "student" && (
                        <motion.div
                            key="student"
                            initial={{ x: 0, opacity: 1 }}
                            exit={{ x: -200, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col"
                        >
                            <label>รหัสนักเรียน</label>
                            <InputOtp
                                autoFocus
                                length={5}
                                size="lg"
                                value={studentCode}
                                onValueChange={setStudentCode}
                            />
                        </motion.div>
                    )}

                    {step === "idcard" && (
                        <motion.div
                            key="idcard"
                            initial={{ x: 200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col w-80"
                        >
                            <label>รหัสบัตรประจำตัวประชาชน</label>
                            <Input
                                placeholder="กรอกรหัสบัตรประจำตัวประชาชน"
                                value={idCard}
                                onChange={(e) => setIdCard(e.target.value)}
                                className="w-full"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex gap-2">
                    <Button type="button" isIconOnly onPress={() => setStep("student")} isDisabled={step == "student" ? true : false}>
                        <FaAngleLeft />
                    </Button>
                    <Button color="primary" type="submit" isLoading={loading}>
                        ดำเนินการต่อ
                    </Button>
                </div>
            </form>
        </div>
    );
}
