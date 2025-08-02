export interface AdminData {
    id: number;
    name: string;
    username: string;
    role: string;
    create_at: string;
    update_at: string;
}

export interface UpdateAdminProfileRequest {
    name?: string;
    currentPassword?: string;
    newPassword?: string;
}

export interface AdminProfileResponse {
    status: number;
    message: string;
    data?: AdminData;
    error?: string;
}

export interface TeacherData {
    id: number;
    name: string;
    username: string;
    role: string;
    create_at: string;
    update_at: string;
}

export interface UpdateTeacherProfileRequest {
    name?: string;
    currentPassword?: string;
    newPassword?: string;
}

export interface TeacherProfileResponse {
    status: number;
    message: string;
    data?: TeacherData;
    error?: string;
}