"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Select,
    SelectItem,
    Card,
    CardBody,
    Spinner,
    Checkbox,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { BookOpen, Plus, Trash2, GraduationCap, X } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

interface Teacher {
    id: number;
    name: string;
    username: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    grade: string;
    description?: string;
}

interface Class {
    id: number;
    grade: string;
    name: string;
    studentCount?: number;
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

interface CurrentSubject {
    subject: Subject;
    classes: Class[];
}

interface TeachingAssignment {
    id: number;
    teacher: Teacher;
    subject: Subject;
    class: Class;
}

interface TeacherSubjectsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    teacher: Teacher;
    subjectGroupData: SubjectGroupData;
    currentSubjects: CurrentSubject[];
}

export default function TeacherSubjectsModal({
    isOpen,
    onClose,
    onSuccess,
    teacher,
    subjectGroupData,
    currentSubjects
}: TeacherSubjectsModalProps) {
    const [assignments, setAssignments] = useState<TeachingAssignment[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
    const [isLoadingClasses, setIsLoadingClasses] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [deletingAssignmentId, setDeletingAssignmentId] = useState<number | null>(null);
    const [selectedAssignments, setSelectedAssignments] = useState<Set<number>>(new Set());
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);

    // ดึงข้อมูลการสอนปัจจุบัน
    const fetchAssignments = async () => {
        try {
            setIsLoadingAssignments(true);
            const response = await axios.get(`/api/admin/teaching-assignments?teacherId=${teacher.id}&subjectGroupId=${subjectGroupData.id}`);

            if (response.data.status === 200) {
                setAssignments(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching assignments:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "ไม่สามารถดึงข้อมูลการสอนได้"
            });
        } finally {
            setIsLoadingAssignments(false);
        }
    };

    // ดึงข้อมูลห้องเรียน
    const fetchClasses = async () => {
        try {
            setIsLoadingClasses(true);
            const response = await axios.get('/api/admin/classes');

            if (response.data.status === 200) {
                setClasses(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "ไม่สามารถดึงข้อมูลห้องเรียนได้"
            });
        } finally {
            setIsLoadingClasses(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchAssignments();
            fetchClasses();
        }
    }, [isOpen, teacher.id, subjectGroupData.id]);

    // ตรวจสอบว่าระดับชั้นของวิชาตรงกับห้องเรียนหรือไม่
    const isGradeMatching = (subjectGrade: string, classGrade: string) => {
        return subjectGrade === classGrade;
    };

    // กรองห้องเรียนตามวิชาที่เลือก
    const getFilteredClasses = () => {
        if (!selectedSubject) return classes;

        const selectedSubjectData = (subjectGroupData.subjects || []).find(s => s.id.toString() === selectedSubject);
        if (!selectedSubjectData) return classes;

        return classes.filter(classItem => isGradeMatching(selectedSubjectData.grade, classItem.grade));
    };

    const handleAddAssignment = async () => {
        if (!selectedSubject || !selectedClass) {
            addToast({
                color: "danger",
                title: "ข้อมูลไม่ครบ",
                description: "กรุณาเลือกวิชาและห้องเรียน"
            });
            return;
        }

        // ตรวจสอบระดับชั้น
        const selectedSubjectData = (subjectGroupData.subjects || []).find(s => s.id.toString() === selectedSubject);
        const selectedClassData = classes.find(c => c.id.toString() === selectedClass);

        if (selectedSubjectData && selectedClassData && !isGradeMatching(selectedSubjectData.grade, selectedClassData.grade)) {
            addToast({
                color: "danger",
                title: "ระดับชั้นไม่ตรงกัน",
                description: `วิชา ${selectedSubjectData.name} (${selectedSubjectData.grade}) ไม่สามารถสอนในห้อง ${selectedClassData.grade}/${selectedClassData.name} ได้`
            });
            return;
        }

        try {
            setIsAdding(true);
            const response = await axios.post('/api/admin/teaching-assignments', {
                teacher_id: teacher.id,
                subject_id: parseInt(selectedSubject),
                class_id: parseInt(selectedClass)
            });

            if (response.data.status === 201) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "เพิ่มการสอนสำเร็จ"
                });

                setSelectedSubject("");
                setSelectedClass("");
                fetchAssignments();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถเพิ่มการสอนได้"
                });
            }
        } catch (error: any) {
            console.error("Error adding assignment:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มการสอน"
            });
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteAssignment = async (assignment: TeachingAssignment) => {
        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบการสอน<br><strong>${assignment.subject.name}</strong><br>ห้อง ${assignment.class.grade}/${assignment.class.name} หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-lg',
                title: 'text-lg font-semibold',
                htmlContainer: 'text-sm',
                confirmButton: 'rounded-lg px-4 py-2 font-medium',
                cancelButton: 'rounded-lg px-4 py-2 font-medium'
            }
        });

        if (!result.isConfirmed) return;

        try {
            setDeletingAssignmentId(assignment.id);

            // แสดง loading alert
            Swal.fire({
                title: 'กำลังลบการสอน...',
                html: `กำลังลบการสอน <strong>${assignment.subject.name}</strong><br>ห้อง ${assignment.class.grade}/${assignment.class.name}<br>กรุณารอสักครู่`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                customClass: {
                    popup: 'rounded-lg',
                    title: 'text-lg font-semibold',
                    htmlContainer: 'text-sm'
                }
            });

            const response = await axios.delete(`/api/admin/teaching-assignments/${assignment.id}`);

            if (response.data.status === 200) {
                await Swal.fire({
                    title: 'สำเร็จ!',
                    html: `ลบการสอน <strong>${assignment.subject.name}</strong><br>ห้อง ${assignment.class.grade}/${assignment.class.name} สำเร็จ`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-lg',
                        title: 'text-lg font-semibold',
                        htmlContainer: 'text-sm'
                    }
                });

                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: "ลบการสอนสำเร็จ"
                });
                fetchAssignments();
            } else {
                await Swal.fire({
                    title: 'ผิดพลาด!',
                    text: response.data.message || "ไม่สามารถลบการสอนได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        title: 'text-lg font-semibold',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });

                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถลบการสอนได้"
                });
            }
        } catch (error: any) {
            console.error("Error deleting assignment:", error);

            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบการสอน",
                icon: 'error',
                confirmButtonText: 'ตกลง',
                customClass: {
                    popup: 'rounded-lg',
                    title: 'text-lg font-semibold',
                    confirmButton: 'rounded-lg px-4 py-2 font-medium'
                }
            });

            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบการสอน"
            });
        } finally {
            setDeletingAssignmentId(null);
        }
    };

    // ลบการสอนหลายรายการ
    const handleBulkDeleteAssignments = async () => {
        if (selectedAssignments.size === 0) return;

        const selectedAssignmentsList = (assignments || []).filter(assignment => selectedAssignments.has(assignment.id));
        const assignmentNames = selectedAssignmentsList.map(assignment =>
            `${assignment.subject.name} (${assignment.class.grade}/${assignment.class.name})`
        ).join(', ');

        const result = await Swal.fire({
            title: 'ยืนยันการลบ',
            html: `คุณต้องการลบการสอน ${selectedAssignments.size} รายการหรือไม่?<br><br><strong>รายการ:</strong><br>${assignmentNames}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'ลบทั้งหมด',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-lg',
                title: 'text-lg font-semibold',
                htmlContainer: 'text-sm',
                confirmButton: 'rounded-lg px-4 py-2 font-medium',
                cancelButton: 'rounded-lg px-4 py-2 font-medium'
            }
        });

        if (!result.isConfirmed) return;

        try {
            setIsBulkDeleting(true);

            // แสดง loading alert
            Swal.fire({
                title: 'กำลังลบการสอน...',
                html: `กำลังลบการสอน ${selectedAssignments.size} รายการ<br>กรุณารอสักครู่`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                customClass: {
                    popup: 'rounded-lg',
                    title: 'text-lg font-semibold',
                    htmlContainer: 'text-sm'
                }
            });

            const response = await axios.delete('/api/admin/teaching-assignments', {
                data: { assignmentIds: Array.from(selectedAssignments).map(id => id.toString()) }
            });

            if (response.data.status === 200) {
                const result = response.data.data;

                await Swal.fire({
                    title: 'สำเร็จ!',
                    html: `ลบการสอนสำเร็จ ${result.deletedCount} รายการ`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-lg',
                        title: 'text-lg font-semibold',
                        htmlContainer: 'text-sm'
                    }
                });

                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: `ลบการสอนสำเร็จ ${result.deletedCount} รายการ`
                });

                setSelectedAssignments(new Set());
                fetchAssignments();
            } else {
                await Swal.fire({
                    title: 'ผิดพลาด!',
                    text: response.data.message || "ไม่สามารถลบการสอนได้",
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    customClass: {
                        popup: 'rounded-lg',
                        title: 'text-lg font-semibold',
                        confirmButton: 'rounded-lg px-4 py-2 font-medium'
                    }
                });

                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message || "ไม่สามารถลบการสอนได้"
                });
            }
        } catch (error: any) {
            console.error("Error bulk deleting assignments:", error);

            await Swal.fire({
                title: 'ผิดพลาด!',
                text: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบการสอน",
                icon: 'error',
                confirmButtonText: 'ตกลง',
                customClass: {
                    popup: 'rounded-lg',
                    title: 'text-lg font-semibold',
                    confirmButton: 'rounded-lg px-4 py-2 font-medium'
                }
            });

            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบการสอน"
            });
        } finally {
            setIsBulkDeleting(false);
        }
    };

    // จัดการการเลือกรายการ
    const handleSelectAssignment = (assignmentId: number, isSelected: boolean) => {
        const newSelected = new Set(selectedAssignments);
        if (isSelected) {
            newSelected.add(assignmentId);
        } else {
            newSelected.delete(assignmentId);
        }
        setSelectedAssignments(newSelected);
    };

    // เลือกทั้งหมด
    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            const allIds = new Set((assignments || []).map(assignment => assignment.id));
            setSelectedAssignments(allIds);
        } else {
            setSelectedAssignments(new Set());
        }
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('ป.')) return 'primary';
        if (grade.startsWith('ม.')) return 'secondary';
        return 'default';
    };

    const handleClose = () => {
        setSelectedSubject("");
        setSelectedClass("");
        setDeletingAssignmentId(null);
        setSelectedAssignments(new Set());
        setIsBulkDeleting(false);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="4xl"
            scrollBehavior="inside"
            classNames={{
                base: "bg-white",
                header: "border-b border-gray-200",
                footer: "border-t border-gray-200"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-2 rounded-lg">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">จัดการวิชาที่สอน</h2>
                        <p className="text-sm text-gray-600">
                            ครู: {teacher.name} • กลุ่มสาระ: {subjectGroupData.name}
                        </p>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6">
                    <div className="space-y-6">
                        {/* Add New Assignment */}
                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-800 mb-4">เพิ่มการสอนใหม่</h3>

                                {/* แสดงข้อมูลวิชาที่เลือก */}
                                {selectedSubject && (
                                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        {(() => {
                                            const selectedSubjectData = (subjectGroupData.subjects || []).find(s => s.id.toString() === selectedSubject);
                                            const filteredClasses = getFilteredClasses();
                                            return selectedSubjectData ? (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-blue-600" />
                                                        <span className="text-sm font-medium text-blue-800">
                                                            {selectedSubjectData.name} ({selectedSubjectData.code})
                                                        </span>
                                                        <Chip size="sm" variant="flat" color={getGradeColor(selectedSubjectData.grade)}>
                                                            {selectedSubjectData.grade}
                                                        </Chip>
                                                    </div>
                                                    <span className="text-xs text-blue-600">
                                                        ห้องที่เลือกได้: {filteredClasses.length} ห้อง
                                                    </span>
                                                </div>
                                            ) : null;
                                        })()}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Select
                                        label="วิชา"
                                        placeholder="เลือกวิชา"
                                        selectedKeys={selectedSubject ? [selectedSubject] : []}
                                        onSelectionChange={(keys) => {
                                            const selectedKey = Array.from(keys)[0] as string;
                                            setSelectedSubject(selectedKey || '');
                                            // รีเซ็ตห้องเรียนเมื่อเปลี่ยนวิชา
                                            setSelectedClass('');
                                        }}
                                        startContent={<BookOpen className="w-4 h-4 text-gray-400" />}
                                    >
                                        {(subjectGroupData.subjects || []).map((subject) => (
                                            <SelectItem key={subject.id.toString()} textValue={subject.name}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-medium">{subject.name}</span>
                                                        <span className="text-xs text-gray-500 ml-2">({subject.code})</span>
                                                    </div>
                                                    <Chip
                                                        size="sm"
                                                        variant="flat"
                                                        color={getGradeColor(subject.grade)}
                                                    >
                                                        {subject.grade}
                                                    </Chip>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="ห้องเรียน"
                                        placeholder={selectedSubject ? "เลือกห้องเรียน" : "เลือกวิชาก่อน"}
                                        selectedKeys={selectedClass ? [selectedClass] : []}
                                        onSelectionChange={(keys) => {
                                            const selectedKey = Array.from(keys)[0] as string;
                                            setSelectedClass(selectedKey || '');
                                        }}
                                        startContent={<GraduationCap className="w-4 h-4 text-gray-400" />}
                                        isDisabled={!selectedSubject || isLoadingClasses}
                                        isLoading={isLoadingClasses}
                                    >
                                        {getFilteredClasses().length > 0 ? (
                                            getFilteredClasses().map((classItem) => (
                                                <SelectItem key={classItem.id.toString()} textValue={`${classItem.grade}/${classItem.name}`}>
                                                    <div className="flex items-center justify-between">
                                                        <span>{classItem.grade}/{classItem.name}</span>
                                                        <span className="text-xs text-gray-500">
                                                            {classItem.studentCount} คน
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))
                                        ) : selectedSubject ? (
                                            <SelectItem key="no-classes" textValue="ไม่มีห้องเรียนที่ตรงกัน" isDisabled>
                                                <span className="text-gray-400">ไม่มีห้องเรียนที่ตรงกับระดับชั้นของวิชานี้</span>
                                            </SelectItem>
                                        ) : (
                                            <SelectItem key="select-subject" textValue="เลือกวิชาก่อน" isDisabled>
                                                <span className="text-gray-400">กรุณาเลือกวิชาก่อน</span>
                                            </SelectItem>
                                        )}
                                    </Select>

                                    <Button
                                        color="primary"
                                        startContent={<Plus className="w-4 h-4" />}
                                        onPress={handleAddAssignment}
                                        isLoading={isAdding}
                                        disabled={!selectedSubject || !selectedClass || isAdding || isLoadingAssignments || isLoadingClasses || getFilteredClasses().length === 0 || isBulkDeleting || deletingAssignmentId !== null}
                                        className="bg-gradient-to-r from-cyan-500 to-cyan-600"
                                    >
                                        เพิ่ม
                                    </Button>
                                </div>

                                {/* แสดงข้อความเตือนเมื่อไม่มีห้องเรียนที่ตรงกัน */}
                                {selectedSubject && getFilteredClasses().length === 0 && (
                                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                        <p className="text-sm text-amber-700">
                                            <strong>ไม่มีห้องเรียนที่ตรงกัน:</strong> วิชานี้เป็นระดับ {
                                                (subjectGroupData.subjects || []).find(s => s.id.toString() === selectedSubject)?.grade
                                            } แต่ไม่มีห้องเรียนระดับเดียวกันในระบบ
                                        </p>
                                    </div>
                                )}
                            </CardBody>
                        </Card>

                        {/* Current Assignments */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-gray-800">
                                    วิชาที่สอนปัจจุบัน ({(assignments || []).length} วิชา)
                                    {selectedAssignments.size > 0 && (
                                        <span className="text-blue-600 ml-2">
                                            • เลือกแล้ว {selectedAssignments.size} รายการ
                                        </span>
                                    )}
                                </h3>

                                {selectedAssignments.size > 0 && (
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            onPress={() => setSelectedAssignments(new Set())}
                                            startContent={<X className="w-3 h-3" />}
                                        >
                                            ยกเลิกการเลือก
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                            onPress={handleBulkDeleteAssignments}
                                            startContent={<Trash2 className="w-3 h-3" />}
                                            isLoading={isBulkDeleting}
                                            disabled={isBulkDeleting}
                                        >
                                            ลบที่เลือก ({selectedAssignments.size})
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {isLoadingAssignments ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="text-center">
                                        <Spinner size="lg" />
                                        <p className="text-gray-500 mt-4">กำลังโหลดข้อมูลการสอน...</p>
                                    </div>
                                </div>
                            ) : (assignments || []).length > 0 ? (
                                <Table
                                    aria-label="รายการวิชาที่สอน"
                                    classNames={{
                                        wrapper: "shadow-none border border-gray-200 rounded-lg",
                                        th: "bg-gray-50 text-gray-700 font-semibold",
                                        td: "py-3"
                                    }}
                                >
                                    <TableHeader>
                                        <TableColumn width={50}>
                                            <Checkbox
                                                isSelected={(assignments || []).length > 0 && (assignments || []).every(assignment => selectedAssignments.has(assignment.id))}
                                                isIndeterminate={(assignments || []).some(assignment => selectedAssignments.has(assignment.id)) && !(assignments || []).every(assignment => selectedAssignments.has(assignment.id))}
                                                onValueChange={handleSelectAll}
                                                disabled={isBulkDeleting || deletingAssignmentId !== null}
                                                aria-label="เลือกทั้งหมด"
                                            />
                                        </TableColumn>
                                        <TableColumn>วิชา</TableColumn>
                                        <TableColumn>รหัสวิชา</TableColumn>
                                        <TableColumn>ระดับชั้น</TableColumn>
                                        <TableColumn>ห้องเรียน</TableColumn>
                                        <TableColumn width={80}>จัดการ</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {(assignments || []).map((assignment) => (
                                            <TableRow key={assignment.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        isSelected={selectedAssignments.has(assignment.id)}
                                                        onValueChange={(isSelected) => handleSelectAssignment(assignment.id, isSelected)}
                                                        disabled={isBulkDeleting || deletingAssignmentId !== null}
                                                        aria-label={`เลือก ${assignment.subject.name}`}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="bg-gradient-to-r from-blue-400 to-green-400 p-1.5 rounded">
                                                            <BookOpen className="w-3 h-3 text-white" />
                                                        </div>
                                                        <span className="font-medium">{assignment.subject.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="sm" variant="flat" color="default" className="font-mono">
                                                        {assignment.subject.code}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="sm"
                                                        variant="flat"
                                                        color={getGradeColor(assignment.subject.grade)}
                                                    >
                                                        {assignment.subject.grade}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="sm"
                                                        variant="flat"
                                                        color="secondary"
                                                        startContent={<GraduationCap className="w-3 h-3" />}
                                                    >
                                                        {assignment.class.grade}/{assignment.class.name}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        size="sm"
                                                        variant="flat"
                                                        color="danger"
                                                        isIconOnly
                                                        onPress={() => handleDeleteAssignment(assignment)}
                                                        isLoading={deletingAssignmentId === assignment.id}
                                                        disabled={deletingAssignmentId !== null || isBulkDeleting}
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">ยังไม่มีการสอนในกลุ่มสาระนี้</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="bordered"
                        onPress={handleClose}
                    >
                        ปิด
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}