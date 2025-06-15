"use client"

import ScanCode from "@/components/ScanCode"
import { Input } from "@heroui/react"
import BarcodeScanner from "./BarcodeScanner"

export default function NewBook() {
    return (
        <>
            <div className="px-4">
                <div className="p-5 rounded-lg shadow-lg border-l-4 border-green-500">
                    <label className="text-gray-400">
                        สร้างหนังสือใหม่
                    </label>
                    <div className="mt-5 grid grid-cols-12 gap-5">
                        <div className="flex gap-2 items-end col-span-4">
                            <Input labelPlacement="outside" label="รหัสบาร์โค้ด" placeholder="กรอกหรือแสกนบาร์โค้ด" variant="bordered" />
                            <BarcodeScanner />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}