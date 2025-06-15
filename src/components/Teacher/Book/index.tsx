"use client";
import { addToast, Button, Input, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import SubjectCard from "./SubjectCard";
import Link from "next/link";
import axios from "axios";
import { TeachingAssignment } from "./TeachingProp";

export default function Book() {
    const [subjectlist, setSubjectlist] = useState<TeachingAssignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const get_teaching_subject = async () => {
        try {
            const config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "/api/teacher/subject",
            };

            const get_subject = await axios(config);
            const data = get_subject.data;

            if (data.status !== 200) {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: data.message,
                });
                return;
            }

            setSubjectlist(data.data.teachingAssignments);
            setLoading(false);
        } catch (error) {
            console.log(error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "ดูข้อมูลผิดพลาดที่หน้าควบคุม",
            });
        }
    };

    useEffect(() => {
        get_teaching_subject();
    }, []);

    // กรองข้อมูลตามชื่อวิชาและรหัสวิชา
    const filteredSubjects = subjectlist.filter((val) =>
        `${val.subject.name} ${val.subject.code}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-4">
            <div className="flex gap-3 w-full items-end">
                <Link href={"book/new"}>
                    <Button startContent={<FaPlus />} color="success">
                        เพิ่มหนังสือ
                    </Button>
                </Link>
                <Input
                    type="search"
                    placeholder="ค้นหาวิชา (ชื่อหรือรหัส)..."
                    variant="bordered"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="h-80 w-full flex items-center justify-center">
                    <Spinner />
                </div>
            ) : filteredSubjects.length > 0 ? (
                <div className="mt-8 grid grid-cols-6 gap-5">
                    {filteredSubjects.map((val, index) => (
                        <SubjectCard data={val} key={index} />
                    ))}
                </div>
            ) : (
                <div className="mt-8 text-center text-gray-500">
                    ไม่พบวิชาตามคำค้นหา
                </div>
            )}
        </div>
    );
}
