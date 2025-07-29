"use client";
import { GraduationCap, RefreshCw, Plus } from "lucide-react";
import { Button } from "@heroui/react";

interface ClassHeaderProps {
    onRefresh?: () => void;
    onAddClass?: () => void;
    isLoading?: boolean;
}

export default function ClassHeader({ onRefresh, onAddClass, isLoading = false }: ClassHeaderProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl shadow-lg">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">ข้อมูลห้องเรียน</h1>
                        <p className="text-gray-600">จัดการและดูข้อมูลห้องเรียนทั้งหมดในระบบ</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <Button
                        variant="bordered"
                        startContent={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
                        onPress={onRefresh}
                        isDisabled={isLoading}
                        className="border-gray-300 hover:border-gray-400"
                    >
                        รีเฟรช
                    </Button>
                    
                    <Button
                        color="primary"
                        startContent={<Plus className="w-4 h-4" />}
                        onPress={onAddClass}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 font-semibold"
                    >
                        เพิ่มห้องเรียน
                    </Button>
                </div>
            </div>
        </div>
    );
}