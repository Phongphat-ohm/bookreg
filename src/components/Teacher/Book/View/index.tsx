"use client";
import { useParams } from "next/navigation";
import {} from "react-icons/fa6"

export default function GetBookView() {
    const { subject_id } = useParams();

    return (
        <>
            <div className="flex w-full justify-center">
                <div className="p-5 rounded-lg shadow-lg w-96 bg-white">
                    <div className="flex justify-center">
                        <label>ข้อมูลวิชา</label>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-gray-400 mt-2 text-sm">
                        <label>รหัสวิชา: </label>
                        <label>ชื่อวิชา: </label>
                    </div>
                </div>
            </div>
        </>
    )
}