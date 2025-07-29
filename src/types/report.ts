export interface Class {
    id: number;
    name: string;
    grade: string;
}

export interface Subject {
    id: number;
    code: string;
    name: string;
    description?: string;
}

export interface Book {
    id: number;
    barcode: string;
    name: string;
    description?: string;
    subject_id: number;
    academic_year_id: number;
    AcademicYear: {
        id: number;
        year: string;
        is_now: boolean;
    };
}

export interface Registration {
    id: number;
    book_code: string;
    book_name: string;
    book_barcode: string;
    registered_at: string;
}

export interface Student {
    id: number;
    name: string;
    stu_code: string;
    registrations: Registration[];
}

export interface ReportData {
    class: {
        id: number;
        name: string;
        grade: string;
    };
    subject: {
        id: number;
        code: string;
        name: string;
        group_name: string;
        group_header: string;
    };
    students: Student[];
}

export interface CustomHeader {
    school_name: string;
    report_title: string;
}

export interface ClassSummary {
    class_id: number;
    name: string;
    grade: string;
    total: number;
    registered: number;
    unregistered: number;
}

export interface SummaryReportData {
    subject: {
        id: number;
        code: string;
        name: string;
        group_name: string;
        group_header: string;
    };
    summary: {
        total_students: number;
        registered_students: number;
        unregistered_students: number;
    };
    classes: ClassSummary[];
}