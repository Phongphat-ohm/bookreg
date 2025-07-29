"use client";
import { AcademicYear } from "@/generated/prisma";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea,
    addToast,
    Autocomplete,
    AutocompleteItem,
    Form,
} from "@heroui/react";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { FaCircle, FaPencil, FaX } from "react-icons/fa6";

interface Book {
    id: number;
    barcode: string;
    name: string;
    description: any;
    subject_id: number;
    academic_year_id: number;
    create_at: string;
    update_at: string;
    AcademicYear: {
        id: number;
        year: string;
        is_now: boolean;
        create_at: string;
        update_at: string;
    };
}

export default function EditModal({ book, reloadBook }: { book: Book, reloadBook: () => void }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [AcademicYear, setAcademicYear] = useState<AcademicYear[]>([]);
    const [AcademicYearLoading, setAcademicYearLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const getAcademicYears = async () => {
        try {
            const req = await axios.get("/api/academic-year");
            const data = req.data.data;
            setAcademicYear(data);
            setAcademicYearLoading(false);
            return
        } catch (error) {
            console.error("Error fetching academic years:", error);
            addToast({
                title: "Error",
                description: "ไม่สามารถดึงข้อมูลปีการศึกษาได้",
                color: "danger",
            });
            return
        }
    }

    useEffect(() => {
        if (isOpen) {
            getAcademicYears();
        }
    }, [isOpen])

    const editBook = async (formData: FormData) => {
        setLoading(true);
        try {
            const reqConfig: AxiosRequestConfig = {
                method: 'post',
                url: '/api/book/edit',
                data: {
                    id: formData.get("id"),
                    barcode: formData.get("barcode"),
                    name: formData.get("name"),
                    description: formData.get("description"),
                    academic_year: formData.get("academic_year"),
                },
            }

            const res = await axios(reqConfig);
            const resData = res.data;

            if (resData.status !== 200) {
                addToast({
                    color: "warning",
                    title: "ระวัง",
                    description: resData.message,
                });
                setLoading(false);
                return;
            }

            addToast({
                color: "success",
                title: "สำเร็จ",
                description: resData.message,
            });
            onClose();
            reloadBook();
        } catch (error) {
            console.log(error);
            addToast({
                color: "danger",
                title: "เกิดข้อผิดพลาด",
                description: "ไม่สามารถแก้ไขข้อมูลหนังสือได้",
            });
        }
    }

    return (
        <>
            <Button size="sm" onPress={onOpen} isIconOnly color="warning">
                <FaPencil />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">แก้ไขข้อมูลหนังสือ</ModalHeader>
                            <ModalBody>
                                <Form action={editBook} className="grid grid-cols-4 gap-3">
                                    <Input name="id" id="id" defaultValue={book.id.toString()} readOnly labelPlacement="outside" label="ID" className="col-span-1" />
                                    <Input name="barcode" id="barcode" defaultValue={book.barcode} labelPlacement="outside" label="รหัสบารืโค้ด" className="col-span-3" />
                                    <Input name="name" id="name" defaultValue={book.name} labelPlacement="outside" label="ชื่อ" className="col-span-4" />
                                    <Textarea name="description" id="description" className="col-span-4" defaultValue={book.description || ""} labelPlacement="outside" label="คำอธิบาย" />
                                    <Autocomplete
                                        name="academic_year"
                                        id="academic_year"
                                        isLoading={AcademicYearLoading}
                                        className="col-span-4"
                                        label="ปีการศึกษา"
                                        placeholder="เลือกปีการศึกษา"
                                        defaultSelectedKey={book.AcademicYear.id}
                                        labelPlacement="outside"
                                        defaultItems={AcademicYear}
                                        defaultInputValue={book.AcademicYear.year.toString()}
                                    >
                                        {(item) => (
                                            <AutocompleteItem key={item.id} startContent={<FaCircle className={item.is_now ? "text-green-500" : "text-gray-500"} />} textValue={item.year}>
                                                {item.year}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                    <span></span>
                                    <Button isLoading={loading} color="warning" type="submit">
                                        ยืนยันการแก้ไข
                                    </Button>
                                    <Button color="primary" type="button" onPress={onClose}>
                                        ยกเลิก
                                    </Button>
                                </Form>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent >
            </Modal >
        </>
    );
}
