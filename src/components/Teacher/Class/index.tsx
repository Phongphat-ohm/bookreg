"use client";
import { addToast, Spinner } from "@heroui/react";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ClassesProp } from "./ClassesProp";
import { FaChalkboardTeacher } from "react-icons/fa";
import Link from "next/link";

export default function ClassPage() {
    const [classes, setClasses] = useState<ClassesProp[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errorText, setErrorText] = useState<string>("");

    const get_classes = async () => {
        try {
            const config: AxiosRequestConfig = {
                url: "/api/teacher/my-class",
                method: "GET",
                responseType: "json"
            }

            const res = await axios(config);
            const data = res.data;
            console.log(data);

            if (data.status === 200) {
                setClasses(data.data);
                setLoading(false);
                return;
            }

            setErrorText(data.message);
            addToast({
                color: "warning",
                title: data.message
            })
            return

        } catch (error) {
            console.error("Error fetching classes:", error);
            addToast({
                color: "danger",
                title: "เกิดข้อผิดพลาด",
            })
        }
    }

    useEffect(() => {
        get_classes();
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="w-full h-96 flex flex-col items-center justify-center">
                    <Spinner />
                    <label className="text-red-500 font-bold">{errorText}</label>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-5">
                        {classes.map((class_item, index) => (
                            <Link
                                href={`/teacher/class/${class_item.id}`}
                                key={index}
                            >
                                <div className="p-6 w-full bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 hover:scale-[1.02]">
                                    <div className="flex flex-col gap-4">
                                        {/* Header */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 text-2xl flex items-center justify-center shadow-inner">
                                                <FaChalkboardTeacher />
                                            </div>
                                            <div>
                                                <h1 className="text-lg font-semibold text-gray-800">
                                                    ห้อง ม.{class_item.class.grade}/{class_item.class.name}
                                                </h1>
                                                <p className="text-sm text-gray-500">วิชา: {class_item.subject.name}</p>
                                            </div>
                                        </div>

                                        {/* Advisor Section */}
                                        <div className="text-sm text-gray-600 pl-1">
                                            <p className="font-medium text-gray-500 mb-1">👩‍🏫 ที่ปรึกษา:</p>
                                            <ul className="list-disc list-inside">
                                                {class_item.class.advisors.map((advisor, index) => (
                                                    <li key={index}>{advisor.name}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex justify-end">
                                            <span className="text-sm text-gray-500">👥 จำนวนนักเรียน: {class_item.class._count.students}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )
            }
        </>
    )
}