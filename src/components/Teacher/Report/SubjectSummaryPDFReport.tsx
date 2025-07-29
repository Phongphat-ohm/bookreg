"use client";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font
} from '@react-pdf/renderer';
import { SummaryReportData } from "@/types/report";

Font.register({
    family: 'Sarabun',
    src: '/fonts/Sarabun/Sarabun-Regular.ttf',
    fontStyle: 'normal',
    fontWeight: 'normal'
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Sarabun',
        padding: 20,
        fontSize: 10,
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 3,
    },
    info: {
        fontSize: 10,
        marginBottom: 2,
    },
    summaryBox: {
        marginBottom: 20,
        padding: 10,
        border: '1px solid #000',
    },
    summaryTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    summaryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    summaryNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    summaryLabel: {
        fontSize: 9,
        textAlign: 'center',
    },
    table: {
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#000',
        minHeight: 25,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    col1: { width: '20%', padding: 3, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center' },
    col2: { width: '15%', padding: 3, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center' },
    col3: { width: '15%', padding: 3, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center' },
    col4: { width: '15%', padding: 3, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center' },
    col5: { width: '15%', padding: 3, borderRightWidth: 0.5, borderColor: '#000', textAlign: 'center' },
    col6: { width: '20%', padding: 3, textAlign: 'center' },
    signature: {
        marginTop: 30,
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
        marginBottom: 5,
        paddingBottom: 20,
    },
});

interface Props {
    reportData: SummaryReportData;
}

const SubjectSummaryPDFReport = ({ reportData }: Props) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* ส่วนหัว */}
                <View style={styles.header}>
                    <Text style={styles.title}>รายงานสรุปการลงทะเบียนหนังสือเรียน</Text>
                    <Text style={styles.subtitle}>วิชา: {reportData.subject.code} - {reportData.subject.name}</Text>
                    <Text style={styles.info}>กลุ่มสาระการเรียนรู้: {reportData.subject.group_name}</Text>
                    <Text style={styles.info}>วันที่พิมพ์: {new Date().toLocaleDateString('th-TH')}</Text>
                </View>

                {/* สรุปภาพรวม */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>สรุปภาพรวม</Text>
                    <View style={styles.summaryGrid}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>{reportData.summary.total_students}</Text>
                            <Text style={styles.summaryLabel}>นักเรียนทั้งหมด</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>{reportData.summary.registered_students}</Text>
                            <Text style={styles.summaryLabel}>ลงทะเบียนแล้ว</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>{reportData.summary.unregistered_students}</Text>
                            <Text style={styles.summaryLabel}>ยังไม่ลงทะเบียน</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>
                                {((reportData.summary.registered_students / reportData.summary.total_students) * 100).toFixed(1)}%
                            </Text>
                            <Text style={styles.summaryLabel}>เปอร์เซ็นต์การลงทะเบียน</Text>
                        </View>
                    </View>
                </View>

                {/* ตารางรายละเอียดตามห้อง */}
                <View style={styles.table}>
                    {/* หัวตาราง */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.col1}>ห้องเรียน</Text>
                        <Text style={styles.col2}>ทั้งหมด</Text>
                        <Text style={styles.col3}>ลงทะเบียน</Text>
                        <Text style={styles.col4}>ยังไม่ลงทะเบียน</Text>
                        <Text style={styles.col5}>เปอร์เซ็นต์</Text>
                        <Text style={styles.col6}>สถานะ</Text>
                    </View>

                    {/* ข้อมูลแต่ละห้อง */}
                    {reportData.classes.map((classData) => {
                        const percentage = (classData.registered / classData.total) * 100
                        const status = percentage >= 80 ? 'ดีเยี่ยม' : percentage >= 50 ? 'ปานกลาง' : 'ต้องปรับปรุง'
                        
                        return (
                            <View key={classData.class_id} style={styles.tableRow}>
                                <Text style={styles.col1}>ม.{classData.grade}/{classData.name}</Text>
                                <Text style={styles.col2}>{classData.total}</Text>
                                <Text style={styles.col3}>{classData.registered}</Text>
                                <Text style={styles.col4}>{classData.unregistered}</Text>
                                <Text style={styles.col5}>{percentage.toFixed(1)}%</Text>
                                <Text style={styles.col6}>{status}</Text>
                            </View>
                        )
                    })}
                </View>

                {/* ลายเซ็น */}
                <View style={styles.signature}>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine}></View>
                        <Text>ครูผู้สอน</Text>
                        <Text>วันที่ ........................</Text>
                    </View>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine}></View>
                        <Text>({reportData.subject.group_header})</Text>
                        <Text>หัวหน้ากลุ่มสาระการเรียนรู้</Text>
                        <Text>วันที่ ........................</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default SubjectSummaryPDFReport;