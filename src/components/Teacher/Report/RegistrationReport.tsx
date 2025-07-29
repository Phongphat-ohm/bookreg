"use client"

import { useState, useEffect } from "react"
import { Select, SelectItem, Button, Input, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react"
import { PDFDownloadLink } from '@react-pdf/renderer'
import axios from "axios"
import RegistrationPDFReport from "./RegistrationPDFReport"
import { Class, Subject, Book, ReportData, CustomHeader } from "@/types/report"

export default function RegistrationReport() {
    const [classes, setClasses] = useState<Class[]>([])
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("")
    const [selectedBook, setSelectedBook] = useState("")
    const [reportData, setReportData] = useState<ReportData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [customHeader, setCustomHeader] = useState({
        school_name: "โรงเรียนนางรอง",
        report_title: "รายงานการลงทะเบียนหนังสือเรียน"
    })

    useEffect(() => {
        fetchClasses()
        fetchSubjects()
    }, [])

    // ดึงข้อมูลหนังสือเมื่อเลือกวิชา
    useEffect(() => {
        if (selectedSubject) {
            fetchBooks()
            setSelectedBook("") // รีเซ็ตการเลือกหนังสือ
        } else {
            setBooks([])
            setSelectedBook("")
        }
    }, [selectedSubject])

    const fetchClasses = async () => {
        try {
            const response = await axios.get("/api/report/classes")
            if (response.data.status === 200) {
                setClasses(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching classes:", error)
        }
    }

    const fetchSubjects = async () => {
        try {
            const response = await axios.get("/api/report/subjects")
            if (response.data.status === 200) {
                setSubjects(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching subjects:", error)
        }
    }

    const fetchBooks = async () => {
        if (!selectedSubject) return

        try {
            const response = await axios.get(`/api/report/books?subject_id=${selectedSubject}`)
            if (response.data.status === 200) {
                setBooks(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching books:", error)
        }
    }

    const fetchReportData = async () => {
        if (!selectedClass || !selectedSubject) return

        setIsLoading(true)
        try {
            let url = `/api/report/registration?class_id=${selectedClass}&subject_id=${selectedSubject}`
            if (selectedBook) {
                url += `&book_id=${selectedBook}`
            }

            const response = await axios.get(url)
            if (response.data.status === 200) {
                setReportData(response.data.data)
            } else {
                console.error("Error:", response.data.message)
                setReportData(null)
            }
        } catch (error) {
            console.error("Error fetching report data:", error)
            setReportData(null)
        }
        setIsLoading(false)
    }

    const handleGenerateReport = () => {
        fetchReportData()
    }

    return (
        <div className="space-y-6">
            {/* ส่วนหัวและการตั้งค่า */}
            <Card>
                <CardBody>
                    <h2 className="text-xl font-semibold mb-4">รายงานการลงทะเบียนหนังสือเรียน</h2>

                    {/* การปรับแต่งส่วนหัว */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Input
                            label="ชื่อโรงเรียน"
                            value={customHeader.school_name}
                            onValueChange={(value) => setCustomHeader(prev => ({ ...prev, school_name: value }))}
                            variant="bordered"
                        />
                        <Input
                            label="หัวข้อรายงาน"
                            value={customHeader.report_title}
                            onValueChange={(value) => setCustomHeader(prev => ({ ...prev, report_title: value }))}
                            variant="bordered"
                        />
                    </div>

                    {/* เลือกห้อง วิชา และหนังสือ */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <Select
                            label="เลือกห้องเรียน"
                            placeholder="เลือกห้องเรียน"
                            variant="bordered"
                            selectedKeys={selectedClass ? [selectedClass] : []}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as string
                                setSelectedClass(selectedKey)
                            }}
                            items={classes}
                        >
                            {(cls) => (
                                <SelectItem key={cls.id.toString()} textValue={`ม.${cls.grade}/${cls.name}`}>
                                    ม.{cls.grade}/{cls.name}
                                </SelectItem>
                            )}
                        </Select>

                        <Select
                            label="เลือกวิชา"
                            placeholder="เลือกวิชา"
                            variant="bordered"
                            selectedKeys={selectedSubject ? [selectedSubject] : []}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as string
                                setSelectedSubject(selectedKey)
                            }}
                        >
                            {subjects.map((subject) => (
                                <SelectItem key={subject.id.toString()} textValue={`${subject.code} - ${subject.name}`}>
                                    {subject.code} - {subject.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="เลือกหนังสือ (ไม่บังคับ)"
                            placeholder="ทุกหนังสือ"
                            variant="bordered"
                            selectedKeys={selectedBook ? [selectedBook] : []}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as string
                                setSelectedBook(selectedKey || "")
                            }}
                            isDisabled={!selectedSubject || books.length === 0}
                        >
                            {books.map((book) => (
                                <SelectItem key={book.id.toString()} textValue={`${book.name} (${book.AcademicYear.year})`}>
                                    {book.name} ({book.AcademicYear.year})
                                </SelectItem>
                            ))}
                        </Select>

                        <Button
                            color="primary"
                            onPress={handleGenerateReport}
                            isLoading={isLoading}
                            isDisabled={!selectedClass || !selectedSubject || !selectedBook}
                        >
                            สร้างรายงาน
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* แสดงผลรายงาน */}
            {reportData && (
                <Card>
                    <CardBody className="p-5">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    รายงาน ม.{reportData.class.grade}/{reportData.class.name} - {reportData.subject.code} {reportData.subject.name}
                                </h3>
                                {selectedBook && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        หนังสือ: {books.find(b => b.id.toString() === selectedBook)?.name}
                                    </p>
                                )}
                            </div>
                            <PDFDownloadLink
                                document={
                                    <RegistrationPDFReport
                                        reportData={reportData}
                                        customHeader={customHeader}
                                        selectedBookName={selectedBook ? books.find(b => b.id.toString() === selectedBook)?.name : undefined}
                                    />
                                }
                                fileName={`รายงานลงทะเบียน_ม${reportData.class.grade}-${reportData.class.name}_${reportData.subject.code}${selectedBook ? `_${books.find(b => b.id.toString() === selectedBook)?.name}` : ''}.pdf`}
                            >
                                {({ loading }) => (
                                    <Button
                                        color="success"
                                        isLoading={loading}
                                    >
                                        {loading ? 'กำลังสร้าง PDF...' : 'ดาวน์โหลด PDF'}
                                    </Button>
                                )}
                            </PDFDownloadLink>
                        </div>

                        <div className="mb-4 text-sm text-gray-600">
                            <p>กลุ่มสาระ: {reportData.subject.group_name}</p>
                            <p>หัวหน้ากลุ่มสาระ: {reportData.subject.group_header}</p>
                            {selectedBook && (
                                <p>หนังสือที่เลือก: {books.find(b => b.id.toString() === selectedBook)?.name}</p>
                            )}
                            <p>จำนวนนักเรียนทั้งหมด: {reportData.students.length} คน</p>
                            <p>จำนวนนักเรียนที่ลงทะเบียน: {reportData.students.filter(s => s.registrations.length > 0).length} คน</p>
                        </div>

                        <Table aria-label="รายงานการลงทะเบียนหนังสือ">
                            <TableHeader>
                                <TableColumn>ที่</TableColumn>
                                <TableColumn>รหัสนักเรียน</TableColumn>
                                <TableColumn>ชื่อ-สกุล</TableColumn>
                                <TableColumn>สถานะการลงทะเบียน</TableColumn>
                                <TableColumn>รหัสหนังสือ</TableColumn>
                                <TableColumn>ชื่อหนังสือ</TableColumn>
                                <TableColumn>วันที่ลงทะเบียน</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {reportData.students.map((student, index) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{student.stu_code}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${student.registrations.length > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {student.registrations.length > 0 ? 'ลงทะเบียนแล้ว' : 'ยังไม่ลงทะเบียน'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {student.registrations.length > 0 ? student.registrations[0].book_code : '-'}
                                        </TableCell>
                                        <TableCell>
                                            {student.registrations.length > 0 ? student.registrations[0].book_name : '-'}
                                        </TableCell>
                                        <TableCell>
                                            {student.registrations.length > 0
                                                ? new Date(student.registrations[0].registered_at).toLocaleDateString('th-TH')
                                                : '-'
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            )}
        </div>
    )
}