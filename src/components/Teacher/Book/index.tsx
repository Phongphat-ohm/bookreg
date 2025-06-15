"use client";
import { addToast, Button, Input, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import BookCard from "./BookCard";
import Link from "next/link";
import axios from "axios";
import { TeachingAssignment } from "./TeachingProp";

export default function Book() {
    const [subjectlist, setSubjectlist] = useState<TeachingAssignment[]>([]);
    const [loading, setLoading] = useState(true);

    const get_teaching_subject = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/api/teacher/subject',
            };

            const get_subject = await axios(config);
            const data = get_subject.data;

            if (data.status !== 200) {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: data.message
                })
                return;
            }

            setSubjectlist(data.data.teachingAssignments);
            setLoading(false);
            return;
        } catch (error) {
            console.log(error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "ดูข้อมูลผิดพลาดที่หน้าควบคุม"
            })
            return;
        }
    }

    useEffect(() => {
        get_teaching_subject();
    }, [])

    return (
        <>
            <div className="px-4">
                <div className="flex gap-3 w-full items-end">
                    <Link href={"book/new"}>
                        <Button startContent={<FaPlus />} color="success">
                            เพิ่มหนังสือ
                        </Button>
                    </Link>
                    <Input type="search" placeholder="ค้นหาหนังสือ..." variant="bordered" />
                </div >

                {loading ? (
                    <div className="h-80 w-full flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-6 gap-5">
                        {subjectlist.map((val, index) => (
                            <BookCard data={val} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}