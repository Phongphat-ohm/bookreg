"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Teacher {
    id: number
    name: string
    username: string
    role: string
    advisingClasses: AdvisingClass[]
    teachingAssignments: TeachingAssignment[]
    create_at: string
    update_at: string
}

export interface AdvisingClass {
    id: number
    grade: string
    name: string
}

export interface TeachingAssignment {
    id: number
    teacher_id: number
    subject_id: number
    class_id: number
}



type TeacherContextType = {
    teacher: Teacher | null;
    setTeacher: (teacher: Teacher | null) => void;
};

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export function TeacherProvider({ children }: { children: ReactNode }) {
    const [teacher, setTeacher] = useState<Teacher | null>(null);

    return (
        <TeacherContext.Provider value={{ teacher, setTeacher }}>
            {children}
        </TeacherContext.Provider>
    );
}

export function useTeacher() {
    const context = useContext(TeacherContext);
    if (!context) {
        throw new Error("useTeacher must be used within a TeacherProvider");
    }
    return context;
}
