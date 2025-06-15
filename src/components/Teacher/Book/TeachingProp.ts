export interface TeachingAssignment {
    id: number
    subject: Subject
}

export interface Subject {
    id: number
    code: string
    grade: string
    name: string
    description: any
    create_at: string
    update_at: string
    subject_group_id: number
}
