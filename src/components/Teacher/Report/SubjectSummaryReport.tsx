"use client"

import { useState, useEffect } from "react"
import { Select, SelectItem, Button, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Progress } from "@heroui/react"
import { PDFDownloadLink } from '@react-pdf/renderer'
import axios from "axios"
import SubjectSummaryPDFReport from "./SubjectSummaryPDFReport"
import { Subject, SummaryReportData } from "@/types/report"

export default function SubjectSummaryReport() {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [selectedSubject, setSelectedSubject] = useState("")
    const [reportData, setReportData] = useState<SummaryReportData | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchSubjects()
    }, [])

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

    const fetchReportData = async () => {
        if (!selectedSubject) return

        setIsLoading(true)
        try {
            const response = await axios.get(`/api/report/subject-summary?subject_id=${selectedSubject}`)
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
                    <h2 className="text-xl font-semibold mb-4">รายงานสรุปการลงทะเบียนตามวิชา</h2>

                    {/* เลือกวิชา */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                                <SelectItem key={subject.id.toString()}>
                                    {subject.code} - {subject.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <Button
                            color="primary"
                            onPress={handleGenerateReport}
                            isLoading={isLoading}
                            isDisabled={!selectedSubject}
                        >
                            สร้างรายงาน
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* แสดงผลรายงาน */}
            {reportData && (
                <Card>
                    <CardBody>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                รายงานสรุป {reportData.subject.code} - {reportData.subject.name}
                            </h3>
                            <PDFDownloadLink
                                document={
                                    <SubjectSummaryPDFReport reportData={reportData} />
                                }
                                fileName={`รายงานสรุป_${reportData.subject.code}.pdf`}
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

                        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardBody className="text-center">
                                    <h4 className="text-lg font-semibold text-blue-600">
                                        {reportData.summary.total_students}
                                    </h4>
                                    <p className="text-sm text-gray-600">นักเรียนทั้งหมด</p>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody className="text-center">
                                    <h4 className="text-lg font-semibold text-green-600">
                                        {reportData.summary.registered_students}
                                    </h4>
                                    <p className="text-sm text-gray-600">ลงทะเบียนแล้ว</p>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody className="text-center">
                                    <h4 className="text-lg font-semibold text-red-600">
                                        {reportData.summary.unregistered_students}
                                    </h4>
                                    <p className="text-sm text-gray-600">ยังไม่ลงทะเบียน</p>
                                </CardBody>
                            </Card>
                        </div>

                        <Table aria-label="รายงานสรุปการลงทะเบียนตามห้อง">
                            <TableHeader>
                                <TableColumn>ห้องเรียน</TableColumn>
                                <TableColumn>นักเรียนทั้งหมด</TableColumn>
                                <TableColumn>ลงทะเบียนแล้ว</TableColumn>
                                <TableColumn>ยังไม่ลงทะเบียน</TableColumn>
                                <TableColumn>เปอร์เซ็นต์</TableColumn>
                                <TableColumn>สถานะ</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {reportData.classes.map((classData) => {
                                    const percentage = (classData.registered / classData.total) * 100
                                    return (
                                        <TableRow key={classData.class_id}>
                                            <TableCell>ม.{classData.grade}/{classData.name}</TableCell>
                                            <TableCell>{classData.total}</TableCell>
                                            <TableCell>{classData.registered}</TableCell>
                                            <TableCell>{classData.unregistered}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress
                                                        value={percentage}
                                                        color={percentage >= 80 ? "success" : percentage >= 50 ? "warning" : "danger"}
                                                        className="max-w-md"
                                                    />
                                                    <span className="text-sm">{percentage.toFixed(1)}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    percentage >= 80 
                                                        ? 'bg-green-100 text-green-800'
                                                        : percentage >= 50 
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {percentage >= 80 ? 'ดีเยี่ยม' : percentage >= 50 ? 'ปานกลาง' : 'ต้องปรับปรุง'}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            )}
        </div>
    )
}