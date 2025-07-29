export interface Book {
    id: number;
    barcode: string;
    name: string;
    description?: string;
    subject_id: number;
    academic_year_id: number;
    create_at: Date;
    update_at: Date;
}

export interface AddBookRequest {
    barcode: string;
    name: string;
    description?: string;
    subject_id: number;
    academic_year_id: number;
}

export interface AcademicYear {
    id: number;
    year: string;
    is_now: boolean;
    create_at: Date;
    update_at: Date;
}