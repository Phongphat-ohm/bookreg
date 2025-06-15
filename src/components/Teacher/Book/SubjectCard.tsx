"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Link from "next/link";
import { FaCalculator, FaPencil, FaTrash } from "react-icons/fa6";
import { TeachingAssignment } from "./TeachingProp";

export default function SubjectCard({ data }: { data: TeachingAssignment }) {
    return (
        <Link
            href={`/teacher/book/${data.subject.id}`}
            className="relative h-50 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
            <div className="absolute bottom-0 w-full p-4 bg-black/40 backdrop-blur-md">
                <h3 className="text-white text-md font-semibold leading-tight">
                    {data.subject.name}
                </h3>
                <p className="text-gray-200 text-sm mt-1">รหัสวิชา: {data.subject.code}</p>
            </div>
        </Link>
    );
}
