"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClassDetailProp, Student } from "./props";
import { addToast, Spinner } from "@heroui/react";
import axios from "axios";
import StudentTable from "./StudentTable";
export default function ClassDetail() {
    const { class_id } = useParams();
    const [classDetail, setClassDetail] = useState<ClassDetailProp>();
    const [loading, setLoading] = useState<boolean>(true);

    const get_class_detail = async () => {
        try {

            const get_class_detail = await axios.get("/api/class?class_id=" + class_id);
            const data = get_class_detail.data;

            if (data.status !== 200) {
                addToast({
                    color: "warning",
                    title: data.message,
                    timeout: 3000,
                });
                return;
            }

            setClassDetail(data.data);
            setLoading(false);
            return;
        } catch (error) {
            console.error("Error fetching class detail:", error);
            addToast({
                color: "danger",
                title: "เกิดข้อผิดพลาดในการดึงข้อมูลชั้นเรียน",
                description: "กรุณาลองใหม่อีกครั้งในภายหลัง",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
            return;
        }
    }

    useEffect(() => {
        if (!class_id) {
            addToast({
                color: "warning",
                title: "ไม่พบรหัสชั้นเรียน",
                timeout: 3000,
            });
            return;
        }

        get_class_detail();
    }, []);

    return (
        <>
            {loading ? (
                <div className="w-full h-96 flex items-center justify-center">
                    <Spinner variant="dots" />
                </div>
            ) : (
                <div className="px-4">
                    <div className="flex justify-center">
                        <div className="p-6 bg-white w-1/3 rounded-2xl shadow-lg">
                            <h1 className="text-blue-500 pb-2 font-extrabold text-center">
                                ข้อมูลชั้นเรียน
                            </h1>
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="flex gap-2">
                                    <label className=" text-gray-500">รหัสชั้นเรียน: </label>
                                    <label className="text-gray-500">{classDetail?.id}</label>
                                </div>
                                <div className="flex gap-2">
                                    <label className=" text-gray-500">วิชา: </label>
                                    <label className="text-gray-500">{classDetail?.subject.name}</label>
                                </div>
                                <div className="flex gap-2">
                                    <label className=" text-gray-500">จำนวนนักเรียน: </label>
                                    <label className="text-gray-500">{classDetail?.class.students.length}</label>
                                </div>
                                <div className="flex gap-2">
                                    <label className=" text-gray-500">ที่ปรึกษา: </label>
                                    <ul className="flex flex-col">
                                        {classDetail?.class.advisors.map((advisor, index) => (
                                            <li key={index} className="text-gray-500">
                                                {(Number(index) + 1).toString()}.{advisor.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <StudentTable students={classDetail?.class?.students ?? []} subject={classDetail?.subject?.name ?? ""} />
                    </div>
                </div >
            )}
        </>
    )
}