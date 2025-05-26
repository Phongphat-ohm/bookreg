"use client";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Pagination,
} from "@heroui/react";
import { Registration } from "./props";
import { FaInfo } from "react-icons/fa6";
import { formatThaiDate } from "@/components/Student/History/InfoModal";
import { useState } from "react";

export default function RegisterationDetailModal({ registeration }: { registeration: Registration[] }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [page, setPage] = useState(1);
    const totalPages = registeration.length;

    const currentRegister = registeration[page - 1];

    return (
        <>
            <Button color="primary" isIconOnly size="sm" onPress={onOpen}>
                <FaInfo />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">การลงทะเบียนหนังสือ</ModalHeader>
                            <ModalBody>
                                {currentRegister && (
                                    <table className="border border-gray-200 rounded-md shadow-sm overflow-hidden mt-2 w-full">
                                        <tbody>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสการลงทะเบียน</td>
                                                <td className="p-3 border-b border-gray-200 text-red-500">{currentRegister.register_code}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสวิชา</td>
                                                <td className="p-3 border-b border-gray-200">{currentRegister.subject.code}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ชื่อวิชา</td>
                                                <td className="p-3 border-b border-gray-200">{currentRegister.subject.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">รหัสหนังสือ</td>
                                                <td className="p-3 border-b border-gray-200">{currentRegister.book.barcode}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ชื่อหนังสือ</td>
                                                <td className="p-3 border-b border-gray-200">{currentRegister.book.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-gray-700 border-b border-gray-200">ลงทะเบียนเมื่อ</td>
                                                <td className="p-3 border-b border-gray-200">{formatThaiDate(currentRegister.registered_at)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </ModalBody>
                            <ModalFooter className="justify-between">
                                <span className="text-sm text-gray-400">รายการที่ {page} / {totalPages}</span>
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="secondary"
                                    page={page}
                                    total={totalPages}
                                    onChange={(page) => setPage(page)}
                                />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
