"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaFileExcel, FaFileExport, FaFilePdf } from "react-icons/fa6";

export default function DowloadReport() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { class_id } = useParams();

    return (
        <>
            <Button
                onPress={onOpen}
                color="primary"
                startContent={<FaFileExport className="text-9xl text-white" />}
            >
                ส่งออกข้อมูล
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ส่งออกรายงาน</ModalHeader>
                            <ModalBody>
                                <Link href={`./${class_id}/dowload/pdf`}>
                                    <Button color="danger" size="lg" startContent={<FaFilePdf />} className="w-full">
                                        ดาวน์โหลดรายงาน PDF
                                    </Button>
                                </Link>
                                <div className="mt-3">
                                    <Link href={`./${class_id}/dowload/excel`}>
                                        <Button color="success" size="lg" startContent={<FaFileExcel />} className="w-full text-white">
                                            ส่งออกข้อมูลแบบ Excel
                                        </Button>
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
