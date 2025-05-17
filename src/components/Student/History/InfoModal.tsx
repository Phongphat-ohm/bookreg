"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { FaInfoCircle } from "react-icons/fa";
import { RegisterBook } from "./HistoryTable";

export function formatThaiDate(isoDate: string): string {
    const date = new Date(isoDate);

    // ชื่อเดือนภาษาไทย
    const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // แปลง พ.ศ.
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year} เวลา ${hour}:${minute}`;
}


export default function InfoModal({ book }: { book: RegisterBook }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button color="warning" size="sm" onPress={onOpen} startContent={<FaInfoCircle className="text-white" />} isIconOnly >
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">รายละเอียดการลงทะเบียน</ModalHeader>
                            <ModalBody>
                                <table className="border border-gray-200 rounded-md shadow-sm overflow-hidden mt-2 w-full">
                                    <tbody>
                                        <tr>
                                            <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสการลงทะเบียน</td>
                                            <td className="p-3 border-b border-gray-200 text-red-500">{book.register_code}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสวิชา</td>
                                            <td className="p-3 border-b border-gray-200">{book.subject.code}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ชื่อวิชา</td>
                                            <td className="p-3 border-b border-gray-200">{book.subject.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสหนังสือ</td>
                                            <td className="p-3 border-b border-gray-200">{book.book.barcode}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ชื่อหนังสือ</td>
                                            <td className="p-3 border-b border-gray-200">{book.book.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ลงทะเบียนเมื่อ</td>
                                            <td className="p-3 border-b border-gray-200">{formatThaiDate(book.registered_at)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ปิด
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
