"use client";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font
} from '@react-pdf/renderer';
import { ReportData, CustomHeader } from "@/types/report";

Font.register({
    family: 'Sarabun',
    src: '/fonts/Sarabun/Sarabun-Regular.ttf',
    fontStyle: 'normal',
    fontWeight: 'normal'
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Sarabun',
        padding: 15,
        fontSize: 8,
    },
    header: {
        textAlign: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    subtitle: {
        fontSize: 10,
        marginBottom: 2,
    },
    info: {
        fontSize: 8,
        marginBottom: 1,
    },
    table: {
        marginTop: 8,
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#000',
        minHeight: 16,
    },
    tableHeader: {
        fontWeight: 'bold',
        minHeight: 18,
    },
    col1: { width: '5%', padding: 1, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center', alignItems: "center", fontSize: 8 },
    col2: { width: '12%', padding: 1, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center', alignItems: "center", fontSize: 8 },
    col3: { width: '25%', padding: 1, borderRightWidth: 0.5, borderColor: '#000', alignItems: "center", fontSize: 8 },
    col4: { width: '12%', padding: 1, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center', alignItems: "center", fontSize: 8 },
    col5: { width: '35%', padding: 1, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center', alignItems: "center", fontSize: 8 },
    col6: { width: '20%', padding: 1, borderRightWidth: 0.5, borderColor: '#000', fontSize: 8 },
    col7: { width: '11%', padding: 1, textAlign: 'center', fontSize: 8 },
    summary: {
        marginTop: 12,
        padding: 6,
        border: '1px solid #000',
    },
    summaryTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    summaryItem: {
        fontSize: 8,
        marginBottom: 1,
    },
    signature: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    signatureBox: {
        alignItems: 'center',
        width: '40%',
    },
    signatureLine: {
        borderBottomWidth: 1,
        borderColor: '#000',
        width: '100%',
        marginBottom: 3,
        paddingBottom: 12,
    },
});

interface Props {
    reportData: ReportData;
    customHeader: CustomHeader;
    selectedBookName?: string;
}

const RegistrationPDFReport = ({ reportData, customHeader, selectedBookName }: Props) => {
    const registeredCount = reportData.students.filter(s => s.registrations.length > 0).length;
    const totalCount = reportData.students.length;
    const unregisteredCount = totalCount - registeredCount;

    // แบ่งข้อมูลนักเรียนเป็นหน้า ๆ ละ 40 คน
    const studentsPerPage = 40;
    const pages = [];
    for (let i = 0; i < reportData.students.length; i += studentsPerPage) {
        pages.push(reportData.students.slice(i, i + studentsPerPage));
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.title}>{customHeader.school_name}</Text>
            <Text style={styles.subtitle}>{customHeader.report_title} ห้อง: ม.{reportData.class.grade}/{reportData.class.name}</Text>
            <Text style={styles.info}>วิชา: {reportData.subject.code} - {reportData.subject.name} {selectedBookName && `หนังสือ: ${selectedBookName}`}</Text>
            <Text style={styles.info}>กลุ่มสาระการเรียนรู้: {reportData.subject.group_name}</Text>
            <Text style={styles.info}>วันที่พิมพ์: {new Date().toLocaleDateString('th-TH')}</Text>
        </View>
    );

    const renderTableHeader = () => (
        <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.col1}>ที่</Text>
            <Text style={styles.col2}>รหัสนักเรียน</Text>
            <Text style={styles.col3}>ชื่อ-สกุล</Text>
            <Text style={styles.col5}>รหัสลงทะเบียนหนังสือ</Text>
            <Text style={styles.col7}>วันที่ลงทะเบียน</Text>
        </View>
    );

    return (
        <Document>
            {pages.map((pageStudents, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    {renderHeader()}

                    {/* ตาราง */}
                    <View style={styles.table}>
                        {renderTableHeader()}

                        {/* ข้อมูลนักเรียน */}
                        {pageStudents.map((student, index) => {
                            const globalIndex = pageIndex * studentsPerPage + index;
                            return (
                                <View key={student.id} style={styles.tableRow}>
                                    <Text style={styles.col1}>{globalIndex + 1}</Text>
                                    <Text style={styles.col2}>{student.stu_code}</Text>
                                    <Text style={styles.col3}>{student.name}</Text>
                                    <Text style={styles.col5}>
                                        {student.registrations.length > 0 ? student.registrations[0].book_code : 'ยังไม่ลงทะเบียน'}
                                    </Text>
                                    <Text style={styles.col7}>
                                        {student.registrations.length > 0
                                            ? new Date(student.registrations[0].registered_at).toLocaleDateString('th-TH', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })
                                            : 'ยังไม่ลงทะเบียน'
                                        }
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    {/* แสดงสรุปผลและลายเซ็นเฉพาะหน้าสุดท้าย */}
                    {pageIndex === pages.length - 1 && (
                        <>
                            {/* ลายเซ็น */}
                            <View style={styles.signature}>
                                <View style={styles.signatureBox}>
                                    <View style={styles.signatureLine}></View>
                                    <Text style={{ fontSize: 8 }}>ครูผู้สอน</Text>
                                    <Text style={{ fontSize: 8 }}>วันที่ ........................</Text>
                                </View>
                                <View style={styles.signatureBox}>
                                    <View style={styles.signatureLine}></View>
                                    <Text style={{ fontSize: 8 }}>({reportData.subject.group_header})</Text>
                                    <Text style={{ fontSize: 8 }}>หัวหน้ากลุ่มสาระการเรียนรู้</Text>
                                    <Text style={{ fontSize: 8 }}>วันที่ ........................</Text>
                                </View>
                            </View>
                        </>
                    )}
                </Page>
            ))}
        </Document>
    );
};

export default RegistrationPDFReport;