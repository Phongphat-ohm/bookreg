"use client"

import { Input, Button, Textarea, Select, SelectItem } from "@heroui/react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import BarcodeScanner from "../BarcodeScanner"
import AddBook from "@/functions/books/AddBook"
import { AcademicYear } from "@/types/book"
import axios from "axios"

export default function AddBookPage() {
    const params = useParams()
    const router = useRouter()
    const subject_id = params.subject_id as string

    const [formData, setFormData] = useState({
        barcode: "",
        name: "",
        description: "",
        academic_year_id: ""
    })

    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // ดึงข้อมูลปีการศึกษา
    useEffect(() => {
        fetchAcademicYears()
    }, [])

    const fetchAcademicYears = async () => {
        try {
            const response = await axios.get("/api/academic-year")
            if (response.data.status === 200) {
                setAcademicYears(response.data.data)
                // เลือกปีการศึกษาปัจจุบันเป็นค่าเริ่มต้น
                const currentYear = response.data.data.find((year: AcademicYear) => year.is_now)
                if (currentYear) {
                    setFormData(prev => ({ ...prev, academic_year_id: currentYear.id.toString() }))
                }
            }
        } catch (error) {
            console.error("Error fetching academic years:", error)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        // ตรวจสอบข้อมูลที่จำเป็น
        if (!formData.barcode.trim() || !formData.name.trim() || !formData.academic_year_id) {
            return
        }

        setIsLoading(true)

        const bookData = {
            barcode: formData.barcode.trim(),
            name: formData.name.trim(),
            description: formData.description.trim() || undefined,
            subject_id: Number(subject_id),
            academic_year_id: Number(formData.academic_year_id)
        }

        const success = await AddBook(bookData)

        if (success) {
            // รีเซ็ตฟอร์ม
            setFormData({
                barcode: "",
                name: "",
                description: "",
                academic_year_id: academicYears.find(year => year.is_now)?.id.toString() || ""
            })
            // กลับไปหน้าก่อนหน้า
            router.back()
        }

        setIsLoading(false)
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <>
            <div className="w-full bg-white p-5 rounded-xl shadow-xl border border-gray-200">
                <label className="text-gray-500 text-lg font-medium">
                    เพิ่มหนังสือ
                </label>
                <div className="p-2 mt-4">
                    <div className="grid grid-cols-12 gap-4">
                        {/* รหัสบาร์โค้ด */}
                        <div className="col-span-12 md:col-span-6">
                            <div className="flex gap-2 items-end">
                                <Input
                                    label="รหัสบาร์โค้ด"
                                    labelPlacement="outside"
                                    placeholder="กรอกหรือแสกนบาร์โค้ด"
                                    variant="bordered"
                                    value={formData.barcode}
                                    onValueChange={(value) => handleInputChange("barcode", value)}
                                    isRequired
                                />
                                <BarcodeScanner onScan={(barcode) => handleInputChange("barcode", barcode)} />
                            </div>
                        </div>

                        {/* ชื่อหนังสือ */}
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                label="ชื่อหนังสือ"
                                labelPlacement="outside"
                                placeholder="กรอกชื่อหนังสือ"
                                variant="bordered"
                                value={formData.name}
                                onValueChange={(value) => handleInputChange("name", value)}
                                isRequired
                            />
                        </div>

                        {/* ปีการศึกษา */}
                        <div className="col-span-12 md:col-span-6">
                            <Select
                                label="ปีการศึกษา"
                                labelPlacement="outside"
                                placeholder="เลือกปีการศึกษา"
                                variant="bordered"
                                selectedKeys={formData.academic_year_id ? [formData.academic_year_id] : []}
                                onSelectionChange={(keys) => {
                                    const selectedKey = Array.from(keys)[0] as string
                                    handleInputChange("academic_year_id", selectedKey)
                                }}
                                isRequired
                            >
                                {academicYears.map((year) => (
                                    <SelectItem key={year.id.toString()} endContent={year.is_now && "(ปัจจุบัน)"}>
                                        {year.year}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* คำอธิบาย */}
                        <div className="col-span-12">
                            <Textarea
                                label="คำอธิบาย (ไม่บังคับ)"
                                labelPlacement="outside"
                                placeholder="กรอกคำอธิบายเพิ่มเติม"
                                variant="bordered"
                                value={formData.description}
                                onValueChange={(value) => handleInputChange("description", value)}
                                minRows={3}
                            />
                        </div>

                        {/* ปุ่มดำเนินการ */}
                        <div className="col-span-12 flex gap-2 justify-end mt-4">
                            <Button
                                color="default"
                                variant="bordered"
                                onPress={handleCancel}
                                isDisabled={isLoading}
                            >
                                ยกเลิก
                            </Button>
                            <Button
                                color="primary"
                                onPress={handleSubmit}
                                isLoading={isLoading}
                                isDisabled={!formData.barcode || !formData.name || !formData.academic_year_id}
                            >
                                เพิ่มหนังสือ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}