"use client"

import { Input } from "@heroui/react"

export default function AddBookPage() {
    return (
        <>
            <div className="w-full bg-white p-5 rounded-xl shadow-xl border border-gray-200">
                <label className="text-gray-500">
                    เพิ่มหนังสือ
                </label>
                <div className="p-2">
                    <div className="grid grid-cols-12 gap-2">
                        <Input />
                    </div>
                </div>
            </div>
        </>
    )
}