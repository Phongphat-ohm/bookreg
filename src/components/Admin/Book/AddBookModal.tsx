"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
    Textarea,
    Autocomplete,
    AutocompleteItem,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Plus, BookOpen, FileText, GraduationCap, Calendar, Camera } from "lucide-react";
import BarcodeScanner from "@/components/Common/BarcodeScanner";
import axios from "axios";

interface Subject {
    id: number;
    name: string;
    code: string;
    grade: string;
}

interface AcademicYear {
    id: number;
    year: string;
}

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    subjects: Subject[];
    academicYears: AcademicYear[];
}

export default function AddBookModal({
    isOpen,
    onClose,
    onSuccess,
    subjects,
    academicYears
}: AddBookModalProps) {
    const [formData, setFormData] = useState({
        barcode: "",
        name: "",
        description: "",
        subject_id: "",
        academic_year_id: ""
    });
    const [subjectInputValue, setSubjectInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleSubmit = async () => {
        if (!formData.barcode.trim() || !formData.name.trim() || !formData.subject_id || !formData.academic_year_id) {
            addToast({
                color: "warning",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน"
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post("/api/admin/books", {
                barcode: formData.barcode.trim(),
                name: formData.name.trim(),
                description: formData.description.trim() || null,
                subject_id: parseInt(formData.subject_id),
                academic_year_id: parseInt(formData.academic_year_id)
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "เพิ่มหนังสือสำเร็จ"
                });
                handleClose();
                onSuccess();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเพิ่มหนังสือได้"
                });
            }
        } catch (error: any) {
            console.error("Error creating book:", error);
            const errorMessage = error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มหนังสือ";
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            barcode: "",
            name: "",
            description: "",
            subject_id: "",
            academic_year_id: ""
        });
        setSubjectInputValue("");
        onClose();
    };

    const getSelectedSubject = () => {
        return subjects.find(s => s.id.toString() === formData.subject_id);
    };

    const getSelectedAcademicYear = () => {
        return academicYears.find(y => y.id.toString() === formData.academic_year_id);
    };

    const handleBarcodeScanned = (barcode: string) => {
        setFormData(prev => ({ ...prev, barcode }));
        setIsScannerOpen(false);
        addToast({
            color: "success",
            title: "สแกนสำเร็จ",
            description: `ได้รับรหัสบาร์โค้ด: ${barcode}`
        });
    };

    // Reset input value when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setSubjectInputValue("");
        }
    }, [isOpen]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                size="2xl"
                scrollBehavior="inside"
                classNames={{
                    base: "bg-white",
                    header: "border-b border-gray-200",
                    footer: "border-t border-gray-200"
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
                            <Plus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">เพิ่มหนังสือใหม่</h2>
                            <p className="text-sm text-gray-600">กรอกข้อมูลหนังสือเรียน</p>
                        </div>
                    </ModalHeader>

                    <ModalBody className="py-6">
                        <div className="space-y-6">
                            {/* Barcode */}
                            <div>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <Input
                                            label="รหัสหนังสือ (บาร์โค้ด)"
                                            placeholder="เช่น 9780123456789, BK001"
                                            value={formData.barcode}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, barcode: value }))}
                                            isRequired
                                            startContent={<BookOpen className="w-4 h-4 text-gray-400" />}
                                            className="flex-1"
                                        />
                                        <div className="flex flex-col justify-end">
                                            <Button
                                                isIconOnly
                                                variant="bordered"
                                                onPress={() => setIsScannerOpen(true)}
                                                className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 h-14"
                                                title="สแกนบาร์โค้ด"
                                            >
                                                <Camera className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-600">รหัสบาร์โค้ดหนังสือที่ไม่ซ้ำกัน</span>
                                        <span className="text-emerald-600">•</span>
                                        <span className="text-emerald-600">คลิกปุ่มกล้องเพื่อสแกน</span>
                                        {formData.barcode && (
                                            <>
                                                <span className="text-green-600">•</span>
                                                <span className="text-green-600 font-medium">✓ มีรหัสแล้ว</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Book Name */}
                            <div>
                                <Input
                                    label="ชื่อหนังสือ"
                                    placeholder="เช่น คณิตศาสตร์ ม.1 เล่ม 1"
                                    value={formData.name}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                                    isRequired
                                    startContent={<FileText className="w-4 h-4 text-gray-400" />}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <Textarea
                                    label="คำอธิบาย (ไม่บังคับ)"
                                    placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับหนังสือ"
                                    value={formData.description}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                                    minRows={3}
                                    maxRows={5}
                                />
                            </div>

                            {/* Subject Selection */}
                            <div>
                                <Autocomplete
                                    label="วิชา"
                                    placeholder="ค้นหาและเลือกวิชา"
                                    selectedKey={formData.subject_id}
                                    onSelectionChange={(key) => {
                                        const subjectId = key as string || "";
                                        setFormData(prev => ({ ...prev, subject_id: subjectId }));
                                        
                                        // อัปเดต input value เมื่อเลือกแล้ว
                                        if (subjectId) {
                                            const selectedSubject = subjects.find(s => s.id.toString() === subjectId);
                                            if (selectedSubject) {
                                                setSubjectInputValue(`${selectedSubject.code} - ${selectedSubject.name}`);
                                            }
                                        } else {
                                            setSubjectInputValue("");
                                        }
                                    }}
                                    inputValue={subjectInputValue}
                                    onInputChange={(value) => {
                                        setSubjectInputValue(value);
                                        // ถ้าเคลียร์ input ให้เคลียร์ selection ด้วย
                                        if (!value) {
                                            setFormData(prev => ({ ...prev, subject_id: "" }));
                                        }
                                    }}
                                    isRequired
                                    startContent={<GraduationCap className="w-4 h-4 text-gray-400" />}
                                    description="พิมพ์เพื่อค้นหาวิชา หรือเลือกจากรายการ"
                                    allowsCustomValue={false}
                                    menuTrigger="input"
                                    items={subjects}
                                    noOptionsText="ไม่พบวิชาที่ค้นหา"
                                >
                                    {(subject) => (
                                        <AutocompleteItem 
                                            key={subject.id.toString()} 
                                            textValue={`${subject.code} - ${subject.name}`}
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-800">{subject.code}</span>
                                                    <span className="text-gray-600">-</span>
                                                    <span className="font-medium text-gray-800">{subject.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                                        ม.{subject.grade}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        รหัสวิชา: {subject.code}
                                                    </span>
                                                </div>
                                            </div>
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            </div>

                            {/* Academic Year Selection */}
                            <div>
                                <Select
                                    label="ปีการศึกษา"
                                    placeholder="เลือกปีการศึกษา"
                                    selectedKeys={formData.academic_year_id ? [formData.academic_year_id] : []}
                                    onSelectionChange={(keys) => {
                                        const yearId = Array.from(keys)[0] as string || "";
                                        setFormData(prev => ({ ...prev, academic_year_id: yearId }));
                                    }}
                                    isRequired
                                    startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                                >
                                    {academicYears.map((year) => (
                                        <SelectItem key={year.id.toString()} textValue={year.year}>
                                            {year.year}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            {/* Preview */}
                            {(getSelectedSubject() || getSelectedAcademicYear()) && (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                                    <p className="text-sm text-emerald-600 mb-2">ตัวอย่างข้อมูลหนังสือ:</p>
                                    <div className="space-y-1 text-sm">
                                        {formData.name && (
                                            <p><span className="font-medium">ชื่อ:</span> {formData.name}</p>
                                        )}
                                        {getSelectedSubject() && (
                                            <p><span className="font-medium">วิชา:</span> {getSelectedSubject()?.code} - {getSelectedSubject()?.name} (ม.{getSelectedSubject()?.grade})</p>
                                        )}
                                        {getSelectedAcademicYear() && (
                                            <p><span className="font-medium">ปีการศึกษา:</span> {getSelectedAcademicYear()?.year}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Info */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h4 className="font-medium text-blue-800 mb-2">ข้อมูลเพิ่มเติม</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                    <p>• รหัสหนังสือต้องไม่ซ้ำกับหนังสือที่มีอยู่แล้ว</p>
                                    <p>• หนังสือจะถูกเชื่อมโยงกับวิชาและปีการศึกษาที่เลือก</p>
                                    <p>• นักเรียนสามารถลงทะเบียนหนังสือได้หลังจากสร้างแล้ว</p>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="light"
                            onPress={handleClose}
                            isDisabled={isLoading}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            color="primary"
                            onPress={handleSubmit}
                            isLoading={isLoading}
                            startContent={!isLoading && <Plus className="w-4 h-4" />}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600"
                        >
                            {isLoading ? "กำลังเพิ่ม..." : "เพิ่มหนังสือ"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <BarcodeScanner
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleBarcodeScanned}
                title="สแกนรหัสหนังสือ"
            />
        </>
    );
}