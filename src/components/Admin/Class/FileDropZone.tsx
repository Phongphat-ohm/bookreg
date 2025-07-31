"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button, addToast } from "@heroui/react";
import { Upload, FileText, X } from "lucide-react";

interface FileDropZoneProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    maxSize?: number; // in MB
    className?: string;
    disabled?: boolean;
}

export default function FileDropZone({ 
    onFileSelect, 
    accept = ".csv", 
    maxSize = 10,
    className = "",
    disabled = false
}: FileDropZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const validateFile = useCallback((file: File): boolean => {
        // Check file type
        const fileExtension = file.name.toLowerCase().split('.').pop();
        const acceptedExtension = accept.replace('.', '').toLowerCase();
        
        if (accept && fileExtension !== acceptedExtension) {
            addToast({
                color: "danger",
                title: "ไฟล์ไม่ถูกต้อง",
                description: `กรุณาเลือกไฟล์ ${accept.toUpperCase()} เท่านั้น`
            });
            return false;
        }

        // Check file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSize) {
            addToast({
                color: "danger",
                title: "ไฟล์ใหญ่เกินไป",
                description: `ขนาดไฟล์ต้องไม่เกิน ${maxSize} MB`
            });
            return false;
        }

        return true;
    }, [accept, maxSize]);

    const handleFileSelect = useCallback((file: File) => {
        if (disabled) return;
        
        if (validateFile(file)) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    }, [validateFile, onFileSelect, disabled]);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (disabled) return;
        
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragOver(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (disabled) return;
        
        // Only set drag over to false if we're leaving the drop zone itself
        if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
            setIsDragOver(false);
        }
    }, [disabled]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (disabled) return;
        
        // Ensure drag over state is maintained
        if (!isDragOver) {
            setIsDragOver(true);
        }
    }, [disabled, isDragOver]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (disabled) return;
        
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    }, [handleFileSelect, disabled]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    }, [handleFileSelect, disabled]);

    const clearFile = useCallback(() => {
        if (disabled) return;
        
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [disabled]);

    // Reset drag state on component unmount or when disabled
    useEffect(() => {
        if (disabled) {
            setIsDragOver(false);
        }
    }, [disabled]);

    // Add global drag event listeners to handle drag leave properly
    useEffect(() => {
        const handleGlobalDragLeave = (e: DragEvent) => {
            if (!dropZoneRef.current?.contains(e.target as Node)) {
                setIsDragOver(false);
            }
        };

        const handleGlobalDrop = () => {
            setIsDragOver(false);
        };

        document.addEventListener('dragleave', handleGlobalDragLeave);
        document.addEventListener('drop', handleGlobalDrop);

        return () => {
            document.removeEventListener('dragleave', handleGlobalDragLeave);
            document.removeEventListener('drop', handleGlobalDrop);
        };
    }, []);

    return (
        <div className={`space-y-4 ${className}`}>
            <div
                ref={dropZoneRef}
                className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
                    ${disabled 
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50' 
                        : isDragOver 
                            ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                            : selectedFile 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }
                `}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !disabled && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="hidden"
                />

                {selectedFile ? (
                    <div className="space-y-3">
                        <div className="flex items-center justify-center gap-3">
                            <FileText className="w-8 h-8 text-green-600" />
                            <div className="text-left">
                                <p className="font-medium text-gray-800">{selectedFile.name}</p>
                                <p className="text-sm text-gray-600">
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>
                            {!disabled && (
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={clearFile}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                        <p className="text-sm text-green-600">ไฟล์พร้อมใช้งาน</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <FileText className={`w-12 h-12 mx-auto transition-colors ${
                            disabled 
                                ? 'text-gray-300' 
                                : isDragOver 
                                    ? 'text-blue-500' 
                                    : 'text-gray-400'
                        }`} />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                {disabled 
                                    ? 'ไม่สามารถเลือกไฟล์ได้' 
                                    : isDragOver 
                                        ? 'วางไฟล์ที่นี่' 
                                        : 'เลือกไฟล์หรือลากมาวาง'
                                }
                            </h3>
                            <p className="text-gray-500 mb-4">
                                รองรับไฟล์ {accept.toUpperCase()} ขนาดไม่เกิน {maxSize} MB
                            </p>
                        </div>
                        <Button
                            color="primary"
                            onPress={() => fileInputRef.current?.click()}
                            startContent={<Upload className="w-4 h-4" />}
                            disabled={disabled}
                        >
                            เลือกไฟล์
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}