"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

export type User = {
    id: number;
    class: {
        id: number;
        name: string;
        grade: string;
    };
    name: string;
    stu_code: string;
    registrations: {
        id: number;
        subject_id: number;
        student_id: number;
        book_id: number;
        register_code: string | null;
        registered_at: Date;
    }[]
};

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser ต้องถูกใช้ภายใต้ <UserProvider>');
    }
    return context;
};
