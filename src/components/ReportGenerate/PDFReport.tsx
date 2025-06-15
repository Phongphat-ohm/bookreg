"use client";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font
} from '@react-pdf/renderer';
import { formatThaiDate } from '../Student/History/InfoModal';

Font.register({
    family: 'Sarabun',
    src: '/fonts/Sarabun/Sarabun-Regular.ttf',
    fontStyle: 'normal',
    fontWeight: 'normal'
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Sarabun',
        padding: 10,
    },
    header: {
        fontSize: 10,
        marginBottom: 2,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#000',
        alignItems: 'center',
        minHeight: 16,
    },
    colIndex: {
        width: 20,
        fontSize: 8.5,
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRightWidth: 0.5,
        borderColor: '#000',
        textAlign: 'center'
    },
    tableCol: {
        fontSize: 8.5,
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRightWidth: 0.5,
        borderColor: '#000',
        flex: 1,
    },
    lastCol: {
        borderRightWidth: 0,
    },
    lastContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 20,
        width: "100%"
    },
    lastContent: {
        flexDirection: "column",
        alignItems: "center",
        fontSize: 8.5,
    },
    signatureText: {
        marginBottom: 4
    }
});

type Props = {
    group_name: string;
    book_name: string;
    subject_name: string;
    subject_code: string;
    class_name: string;
    students: { name: string; book_code: string; registered_at: string }[];
    teacher: string;
    group_header: string;
};

const PDFReport = ({
    group_name,
    book_name,
    subject_name,
    subject_code,
    class_name,
    students,
    group_header,
    teacher
}: Props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={{ alignItems: "center", marginBottom: 6 }}>
                <Text style={styles.header}>แบบลงทะเบียนการรับหนังสือเรียน</Text>
                <Text style={styles.header}>{group_name}</Text>
                <Text style={styles.header}>รายวิชา: {subject_name} รหัสวิชา: {subject_code}</Text>
                <Text style={styles.header}>ชื่อหนังสือ: {book_name}</Text>
                <Text style={styles.header}>ชั้นมัธยมศึกษาปีที่ {class_name}</Text>
            </View>

            {/* หัวตาราง */}
            <View style={styles.tableRow}>
                <Text style={styles.colIndex}>ที่</Text>
                <Text style={styles.tableCol}>ชื่อ-สกุล</Text>
                <Text style={styles.tableCol}>เลขที่ทะเบียนหนังสือ</Text>
                <Text style={[styles.tableCol, styles.lastCol]}>ลงทะเบียนเมื่อ</Text>
            </View>

            {/* รายชื่อ */}
            {students.slice(0, 40).map((student, idx) => (
                <View key={idx} style={styles.tableRow}>
                    <Text style={styles.colIndex}>{(idx + 1).toString()}</Text>
                    <Text style={styles.tableCol}>{student.name}</Text>
                    <Text style={styles.tableCol}>{student.book_code}</Text>
                    <Text style={[styles.tableCol, styles.lastCol]}>{formatThaiDate(student.registered_at)}</Text>
                </View>
            ))}

            {/* ลายเซ็น */}
            <View style={styles.lastContainer}>
                <View style={styles.lastContent}>
                    <Text style={styles.signatureText}>ลงชื่อ ........................................................................................</Text>
                    <Text style={styles.signatureText}>({teacher})</Text>
                    <Text>ครูผู้สอน</Text>
                </View>
                <View style={styles.lastContent}>
                    <Text style={styles.signatureText}>ลงชื่อ ........................................................................................</Text>
                    <Text style={styles.signatureText}>({group_header})</Text>
                    <Text>หัวหน้ากลุ่มสาระการเรียนรู้</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default PDFReport;
