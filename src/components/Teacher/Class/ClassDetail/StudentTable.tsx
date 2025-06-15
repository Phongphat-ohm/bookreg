"use client";
import { useMemo, useState } from "react";
import { Student } from "./props";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    TableColumn,
    Button,
    Chip,
    Input,
    Select,
    SelectItem
} from "@heroui/react";
import { FaCircle, FaFileExport, FaInfo } from "react-icons/fa6";
import RegisterationDetailModal from "./RegisterationDetail";
import DowloadReport from "./DowloadReportModal";

export default function StudentTable({ students, subject }: { students: Student[], subject: string }) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const rowsPerPage = 8;

    const matchedRegistrations = (item: Student) => {
        return item.registrations.filter((reg) => reg.subject.name === subject);
    };

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const regCount = matchedRegistrations(student).length;

            const matchesSearch = student.name.includes(searchTerm) || student.stu_code.includes(searchTerm);

            const matchesFilter =
                filterStatus === "all" ||
                (filterStatus === "registered" && regCount > 0) ||
                (filterStatus === "unregistered" && regCount === 0);

            return matchesSearch && matchesFilter;
        });
    }, [students, searchTerm, filterStatus, subject]);

    const pages = Math.ceil(filteredStudents.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredStudents.slice(start, start + rowsPerPage);
    }, [page, filteredStudents]);

    return (
        <>
            <div className="flex w-full mb-4 gap-2 items-end">
                <Input
                    placeholder="ค้นหาชื่อหรือรหัสนักเรียน"
                    label="ค้นหานักเรียน"
                    labelPlacement="outside"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="bordered"
                />
                <Select
                    label="กรองสถานะ"
                    selectedKeys={[filterStatus]}
                    onChange={(e) => {
                        if (!e.target.value) {
                            setFilterStatus("all")
                            return;
                        }

                        setFilterStatus(e.target.value)
                    }}
                    className="w-[200px]"
                    labelPlacement="outside"
                    variant="bordered"
                    isRequired
                >
                    <SelectItem startContent={<FaCircle className="text-yellow-500" />} key="all">ทั้งหมด</SelectItem>
                    <SelectItem startContent={<FaCircle className="text-green-500" />} key="registered">ลงทะเบียนแล้ว</SelectItem>
                    <SelectItem startContent={<FaCircle className="text-red-500" />} key="unregistered">ยังไม่ลงทะเบียน</SelectItem>
                </Select>
            </div>

            <Table
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={setPage}
                        />
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>รหัสเรียน</TableColumn>
                    <TableColumn>ชื่อนักเรียน</TableColumn>
                    <TableColumn>ลงทะเบียนหนังสือ</TableColumn>
                    <TableColumn>ข้อมูล</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {(item) => {
                        const reg = matchedRegistrations(item);
                        return (
                            <TableRow key={item.id} className="hover:bg-gray-50">
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.stu_code}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    {reg.length > 0 ? (
                                        <Chip size="sm" radius="sm" className="text-white" color="success">
                                            ลงทะเบียนแล้ว ({reg.length} เล่ม)
                                        </Chip>
                                    ) : (
                                        <Chip size="sm" radius="sm" className="text-white" color="danger">
                                            ยังไม่ได้ลงทะเบียน
                                        </Chip>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {reg.length > 0 ? (
                                        <RegisterationDetailModal registeration={reg} />
                                    ) : (
                                        <Button disabled isDisabled color="primary" isIconOnly size="sm">
                                            <FaInfo />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    }}
                </TableBody>
            </Table>
        </>
    );
}
