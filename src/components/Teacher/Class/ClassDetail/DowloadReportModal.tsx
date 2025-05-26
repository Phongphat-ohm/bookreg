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
import { pdf } from "@react-pdf/renderer";
import { FaFileExport, FaFilePdf } from "react-icons/fa6";

export default function DowloadReport() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                <Button
                                    color="success"
                                    className="w-full text-white"
                                    startContent={<FaFilePdf className="text-white" />}
                                    size="lg"
                                >
                                    ส่งออกรายงานการลงทะเบียนแบบ PDF
                                </Button>
                            </ModalBody>
                            <ModalFooter />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
