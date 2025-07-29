"use client";
import { addToast, Button, Image, Input, InputOtp, Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaAngleLeft, FaUser, FaIdCard, FaGraduationCap } from "react-icons/fa6";

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <Image src={"/images/logo.png"} className="w-32 h-32 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">เข้าสู่ระบบนักเรียน</h1>
                    <p className="text-gray-600">ระบบลงทะเบียนหนังสือเรียน</p>
                </div>

                {/* Login Card */}
                <Card className="shadow-xl border-0">
                    <CardHeader className="text-center pb-2">
                        <div className="w-full">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                {step === "student" ? (
                                    <>
                                        <FaUser className="text-blue-500" />
                                        <h2 className="text-lg font-semibold text-gray-800">รหัสนักเรียน</h2>
                                    </>
                                ) : (
                                    <>
                                        <FaIdCard className="text-green-500" />
                                        <h2 className="text-lg font-semibold text-gray-800">ยืนยันตัวตน</h2>
                                    </>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">
                                {step === "student" 
                                    ? "กรอกรหัสนักเรียน 5 หลัก" 
                                    : "กรอกรหัสบัตรประจำตัวประชาชน"
                                }
                            </p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {step === "student" && (
                                    <motion.div
                                        key="student"
                                        initial={{ x: 0, opacity: 1 }}
                                        exit={{ x: -200, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-center">
                                            <InputOtp
                                                autoFocus
                                                length={5}
                                                size="lg"
                                                value={studentCode}
                                                onValueChange={setStudentCode}
                                                variant="bordered"
                                                color="primary"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                                <FaGraduationCap />
                                                <span>ตัวอย่าง: 12345</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === "idcard" && (
                                    <motion.div
                                        key="idcard"
                                        initial={{ x: 200, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <Input
                                            placeholder="กรอกรหัสบัตรประจำตัวประชาชน 13 หลัก"
                                            value={idCard}
                                            onChange={(e) => setIdCard(e.target.value)}
                                            variant="bordered"
                                            size="lg"
                                            startContent={<FaIdCard className="text-gray-400" />}
                                            maxLength={13}
                                        />
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">
                                                กรอกรหัสบัตรประจำตัวประชาชนให้ครบ 13 หลัก
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button 
                                    type="button" 
                                    variant="bordered"
                                    onPress={() => setStep("student")} 
                                    isDisabled={step === "student"}
                                    startContent={<FaAngleLeft />}
                                    className="flex-1"
                                >
                                    ย้อนกลับ
                                </Button>
                                <Button 
                                    color="primary" 
                                    type="submit" 
                                    isLoading={loading}
                                    variant="shadow"
                                    className="flex-1 font-semibold"
                                >
                                    {step === "student" ? "ถัดไป" : "เข้าสู่ระบบ"}
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-500">
                        หากมีปัญหาในการเข้าสู่ระบบ กรุณาติดต่อครูผู้ดูแล
                    </p>
                </div>
            </div>
        </div>
    );
}
