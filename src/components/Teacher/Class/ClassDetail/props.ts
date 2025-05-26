export interface ClassDetailProp {
    id: number
    subject: Subject
    class: Class
}

export interface Subject {
    name: string
}

export interface Class {
    id: number
    name: string
    grade: string
    students: Student[]
    _count: Count
    advisors: Advisor[]
}

export interface Student {
    id: number
    stu_code: string
    name: string
    class_id: number
    registrations: Registration[]
}

export interface Registration {
    register_code: string;
    book: Book
    subject: Subject2
    registered_at: string
}

export interface Book {
    id: number
    barcode: string
    name: string
    description: any
    subject_id: number
    academic_year_id: number
    create_at: string
    update_at: string
}

export interface Subject2 {
    name: string
    code: string;
}

export interface Count {
    students: number
}

export interface Advisor {
    id: number
    name: string
}