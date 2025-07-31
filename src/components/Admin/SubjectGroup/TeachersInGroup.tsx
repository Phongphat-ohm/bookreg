"use client";
import {
    Card,
    CardBody,
    CardHeader,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Avatar,
    Button,
    Pagination
} from "@heroui/react";
import { useState, useMemo } from "react";
import { Users, User, BookOpen, Eye, UserMinus, UserPlus, Crown } from "lucide-react";
import TeacherSubjectsModal from "./TeacherSubjectsModal";
import AddMemberModal from "./AddMemberModal";
import axios from "axios";
import Swal from "sweetalert2";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface Class {
    id: number;
    grade: string;
    name: string;
}

interface TeachingAssignment {
    id: number;
    teacher: Teacher;
    class: Class;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    grade: string;
    description?: string;
    teachingAssignments?: TeachingAssignment[];
}

interface SubjectGroupMember {
    id: number;
    role: string;
    joined_at: string;
    teacher: Teacher;
}

interface SubjectGroupData {
    id: number;
    name: string;
    members: SubjectGroupMember[];
    subjects: Subject[];
}

interface TeachersInGroupProps {
    subjectGroupData: SubjectGroupData;
    onUpdate: () => void;
}

interface TeacherWithSubjects {
    teacher: Teacher;
    subjects: {
        subject: Subject;
        classes: Class[];
    }[];
    totalSubjects: number;
    totalClasses: number;
}

export default function TeachersInGroup({ subjectGroupData, onUpdate }: TeachersInGroupProps) {
    const [page, setPage] = useState(1);
    const [isSubjectsModalOpen, setIsSubjectsModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<TeacherWithSubjects | null>(null);
    const [removingMemberId, setRemovingMemberId] = useState<number | null>(null);
    
    const rowsPerPage = 10;

    // จัดกลุ่มข้อมูลครูและวิชาที่สอน
    const teachersWithSubjects = useMemo(() => {
        const teacherMap = new Map<number, TeacherWithSubjects>();

        // เพิ่มสมาชิกกลุ่มสาระก่อน
        subjectGroupData.members.forEach(member => {
            teacherMap.set(member.teacher.id, {
                teacher: member.teacher,
                subjects: [],
                totalSubjects: 0,
                totalClasses: 0
            });
        });

        // วนลูปผ่านวิชาทั้งหมดในกลุ่มสาระ
        subjectGroupData.subjects.forEach(subject => {
            (subject.teachingAssignments || []).forEach(assignment => {
                const teacherId = assignment.teacher.id;
                
                if (!teacherMap.has(teacherId)) {
                    teacherMap.set(teacherId, {
                        teacher: assignment.teacher,
                        subjects: [],
                        totalSubjects: 0,
                        totalClasses: 0
                    });
                }

                const teacherData = teacherMap.get(teacherId)!;
                
                // ตรวจสอบว่ามีวิชานี้แล้วหรือไม่
                let subjectEntry = teacherData.subjects.find(s => s.subject.id === subject.id);
                
                if (!subjectEntry) {
                    subjectEntry = {
                        subject: subject,
                        classes: []
                    };
                    teacherData.subjects.push(subjectEntry);
                }

                // เพิ่มห้องเรียน
                if (!subjectEntry.classes.find(c => c.id === assignment.class.id)) {
                    subjectEntry.classes.push(assignment.class);
                }
            });
        });

        // คำนวณสถิติ
        teacherMap.forEach(teacherData => {
            teacherData.totalSubjects = teacherData.subjects.length;
            teacherData.totalClasses = teacherData.subjects.reduce((total, s) => total + s.classes.length, 0);
        });

        return Array.from(teacherMap.values()).sort((a, b) => {
            // หัวหน้ากลุ่มสาระขึ้นก่อน
            const aIsHeader = subjectGroupData.members.find(m => m.teacher.id === a.teacher.id)?.role === 'header';
            const bIsHeader = subjectGroupData.members.find(m => m.teacher.id === b.teacher.id)?.role === 'header';
            
            if (aIsHeader && !bIsHeader) return -1;
            if (!aIsHeader && bIsHeader) return 1;
            return a.teacher.name.localeCompare(b.teacher.name);
        });
    }, [subjectGroupData]);

    const paginatedTeachers = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return teachersWithSubjects.slice(start, end);
    }, [teachersWithSubjects, page]);

    const totalPages = Math.ceil(teachersWithSubjects.length / rowsPerPage);

    const handleViewSubjects = (teacher: TeacherWithSubjects) => {
        setSelectedTeacher(teacher);
        setIsSubjectsModalOpen(true);
    };

    const handleSubjectsUpdate = () => {
        setIsSubjectsModalOpen(false);
        setSelectedTeacher(null);
        onUpdate(); // Refresh data from parent
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">ครูในกลุ่มสาระ</h3>
                        <p className="text-sm text-gray-600">
                            ทั้งหมด {teachersWithSubjects.length} คน • 
                            สอน {subjectGroupData.subjects.length} วิชา • 
                            รวม {teachersWithSubjects.reduce((total, t) => total + t.totalClasses, 0)} ห้องเรียน
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardBody>
                {teachersWithSubjects.length > 0 ? (
                    <>
                        <Table
                            aria-label="รายการครูในกลุ่มสาระ"
                            classNames={{
                                wrapper: "shadow-none border border-gray-200 rounded-lg",
                                th: "bg-gray-50 text-gray-700 font-semibold",
                                td: "py-4"
                            }}
                        >
                            <TableHeader>
                                <TableColumn>ครู</TableColumn>
                                <TableColumn>สถานะ</TableColumn>
                                <TableColumn>วิชาที่สอน</TableColumn>
                                <TableColumn>ห้องเรียน</TableColumn>
                                <TableColumn width={120}>จัดการ</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {paginatedTeachers.map((teacherData) => (
                                    <TableRow key={teacherData.teacher.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    name={teacherData.teacher.name.charAt(0)}
                                                    size="sm"
                                                    className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800">{teacherData.teacher.name}</p>
                                                    <p className="text-xs text-gray-500">@{teacherData.teacher.username}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {(() => {
                                                const membership = subjectGroupData.members.find(m => m.teacher.id === teacherData.teacher.id);
                                                if (membership?.role === 'header') {
                                                    return (
                                                        <Chip
                                                            size="sm"
                                                            variant="flat"
                                                            color="success"
                                                            startContent={<User className="w-3 h-3" />}
                                                        >
                                                            หัวหน้ากลุ่มสาระ
                                                        </Chip>
                                                    );
                                                } else if (membership?.role === 'member') {
                                                    return (
                                                        <Chip
                                                            size="sm"
                                                            variant="flat"
                                                            color="primary"
                                                            startContent={<User className="w-3 h-3" />}
                                                        >
                                                            สมาชิกกลุ่มสาระ
                                                        </Chip>
                                                    );
                                                } else {
                                                    return (
                                                        <Chip
                                                            size="sm"
                                                            variant="flat"
                                                            color="secondary"
                                                            startContent={<BookOpen className="w-3 h-3" />}
                                                        >
                                                            ครูผู้สอน
                                                        </Chip>
                                                    );
                                                }
                                            })()}
                                        </TableCell>
                                        <TableCell>
                                            <Chip size="sm" variant="flat" color="primary">
                                                {teacherData.totalSubjects} วิชา
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <Chip size="sm" variant="flat" color="secondary">
                                                {teacherData.totalClasses} ห้อง
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="primary"
                                                    startContent={<Eye className="w-3 h-3" />}
                                                    onPress={() => handleViewSubjects(teacherData)}
                                                >
                                                    ดูวิชา
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-4">
                                <Pagination
                                    total={totalPages}
                                    page={page}
                                    onChange={setPage}
                                    showControls
                                    classNames={{
                                        cursor: "bg-cyan-500 text-white"
                                    }}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-600 mb-2">ไม่มีครูในกลุ่มสาระนี้</h3>
                        <p className="text-gray-500">ยังไม่มีครูที่ได้รับมอบหมายให้สอนวิชาในกลุ่มสาระนี้</p>
                    </div>
                )}
            </CardBody>

            {/* Modal */}
            {selectedTeacher && (
                <TeacherSubjectsModal
                    isOpen={isSubjectsModalOpen}
                    onClose={() => {
                        setIsSubjectsModalOpen(false);
                        setSelectedTeacher(null);
                    }}
                    onSuccess={handleSubjectsUpdate}
                    teacher={selectedTeacher.teacher}
                    subjectGroupData={subjectGroupData}
                    currentSubjects={selectedTeacher.subjects}
                />
            )}
        </Card>
    );
}