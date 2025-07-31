import * as XLSX from 'xlsx';

interface Student {
    id: number;
    name: string;
    stu_code: string;
    create_at: string;
}

interface ExportStudentData {
    'ลำดับ': number;
    'ชื่อ-นามสกุล': string;
    'รหัสนักเรียน': string;
    'วันที่เพิ่ม': string;
    'ID': number;
}

// ฟังก์ชันสำหรับทำความสะอาดชื่อ sheet และชื่อไฟล์
const sanitizeSheetName = (name: string): string => {
    // ลบอักขระที่ไม่อนุญาตใน sheet name: : \ / ? * [ ]
    return name.replace(/[:\\\/\?\*\[\]]/g, '_').substring(0, 31); // Excel sheet name จำกัด 31 ตัวอักษร
};

const sanitizeFileName = (name: string): string => {
    // ลบอักขระที่ไม่อนุญาตในชื่อไฟล์
    return name.replace(/[<>:"\/\\|?*]/g, '_');
};

export const exportStudentsToExcel = (students: Student[], className?: string) => {
    // เตรียมข้อมูลสำหรับ export
    const exportData: ExportStudentData[] = students.map((student, index) => ({
        'ลำดับ': index + 1,
        'ชื่อ-นามสกุล': student.name,
        'รหัสนักเรียน': student.stu_code,
        'วันที่เพิ่ม': new Date(student.create_at).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        'ID': student.id
    }));

    // สร้าง workbook และ worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // ตั้งค่าความกว้างของคอลัมน์
    const columnWidths = [
        { wch: 8 },  // ลำดับ
        { wch: 25 }, // ชื่อ-นามสกุล
        { wch: 15 }, // รหัสนักเรียน
        { wch: 20 }, // วันที่เพิ่ม
        { wch: 8 }   // ID
    ];
    worksheet['!cols'] = columnWidths;

    // เพิ่ม worksheet เข้า workbook (ทำความสะอาดชื่อ sheet)
    const cleanClassName = className ? sanitizeSheetName(className) : '';
    const sheetName = cleanClassName ? `รายชื่อนักเรียน ${cleanClassName}` : 'รายชื่อนักเรียน';
    const finalSheetName = sanitizeSheetName(sheetName);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, finalSheetName);

    // สร้างชื่อไฟล์ (ทำความสะอาดชื่อไฟล์)
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const cleanClassNameForFile = className ? sanitizeFileName(className) : '';
    const fileName = cleanClassNameForFile 
        ? `รายชื่อนักเรียน_${cleanClassNameForFile}_${timestamp}.xlsx`
        : `รายชื่อนักเรียน_${timestamp}.xlsx`;

    // ดาวน์โหลดไฟล์
    XLSX.writeFile(workbook, fileName);

    return {
        fileName,
        totalStudents: students.length
    };
};

export const exportSelectedStudentsToExcel = (
    allStudents: Student[], 
    selectedIds: Set<number>, 
    className?: string
) => {
    const selectedStudents = allStudents.filter(student => selectedIds.has(student.id));
    
    const result = exportStudentsToExcel(selectedStudents, className);
    
    return {
        ...result,
        selectedCount: selectedStudents.length
    };
};