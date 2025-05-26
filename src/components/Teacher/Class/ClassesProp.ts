export interface ClassesProp {
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
    _count: Count
    advisors: Advisor[]
}

export interface Count {
    students: number
}

export interface Advisor {
    id: number
    name: string
}
