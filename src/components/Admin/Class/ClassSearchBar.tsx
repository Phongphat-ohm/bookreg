"use client";
import { Input, Select, SelectItem, Button, Chip } from "@heroui/react";
import { Search, X, Filter, SortAsc } from "lucide-react";
import { useState } from "react";

interface SearchFilters {
    searchTerm: string;
    gradeFilter: string;
    sortBy: string;
    hasAdvisor: string;
    studentCountRange: string;
}

interface ClassSearchBarProps {
    onSearch: (filters: SearchFilters) => void;
    totalResults: number;
    isFiltered: boolean;
    onClearFilters: () => void;
}

export default function ClassSearchBar({ 
    onSearch, 
    totalResults, 
    isFiltered, 
    onClearFilters 
}: ClassSearchBarProps) {
    const [filters, setFilters] = useState<SearchFilters>({
        searchTerm: "",
        gradeFilter: "",
        sortBy: "grade",
        hasAdvisor: "",
        studentCountRange: ""
    });

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const handleFilterChange = (key: keyof SearchFilters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onSearch(newFilters);
    };

    const handleClearAll = () => {
        const clearedFilters = {
            searchTerm: "",
            gradeFilter: "",
            sortBy: "grade",
            hasAdvisor: "",
            studentCountRange: ""
        };
        setFilters(clearedFilters);
        onSearch(clearedFilters);
        onClearFilters();
        setShowAdvancedFilters(false);
    };

    const gradeOptions = [
        { key: "", label: "ทุกระดับชั้น" },
        { key: "1", label: "ม.1" },
        { key: "2", label: "ม.2" },
        { key: "3", label: "ม.3" },
        { key: "4", label: "ม.4" },
        { key: "5", label: "ม.5" },
        { key: "6", label: "ม.6" }
    ];

    const sortOptions = [
        { key: "grade", label: "เรียงตามระดับชั้น" },
        { key: "name", label: "เรียงตามชื่อห้อง" },
        { key: "studentCount", label: "เรียงตามจำนวนนักเรียน" },
        { key: "advisorCount", label: "เรียงตามจำนวนครูที่ปรึกษา" }
    ];

    const advisorOptions = [
        { key: "", label: "ทั้งหมด" },
        { key: "has", label: "มีครูที่ปรึกษา" },
        { key: "none", label: "ไม่มีครูที่ปรึกษา" }
    ];

    const studentCountOptions = [
        { key: "", label: "ทั้งหมด" },
        { key: "0-20", label: "0-20 คน" },
        { key: "21-30", label: "21-30 คน" },
        { key: "31-40", label: "31-40 คน" },
        { key: "40+", label: "มากกว่า 40 คน" }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <Input
                        placeholder="ค้นหาห้องเรียน เช่น 1/1, 2/3, ห้อง A..."
                        value={filters.searchTerm}
                        onValueChange={(value) => handleFilterChange("searchTerm", value)}
                        startContent={<Search className="w-4 h-4 text-gray-400" />}
                        classNames={{
                            input: "text-sm",
                            inputWrapper: "border-gray-300 hover:border-gray-400 focus-within:border-blue-500"
                        }}
                        size="lg"
                    />
                </div>
                
                <div className="flex gap-2">
                    <Select
                        placeholder="ระดับชั้น"
                        selectedKeys={filters.gradeFilter ? [filters.gradeFilter] : []}
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string || "";
                            handleFilterChange("gradeFilter", value);
                        }}
                        className="w-32"
                        size="lg"
                    >
                        {gradeOptions.map((option) => (
                            <SelectItem key={option.key} textValue={option.label}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <Button
                        variant={showAdvancedFilters ? "solid" : "bordered"}
                        color={showAdvancedFilters ? "primary" : "default"}
                        onPress={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        startContent={<Filter className="w-4 h-4" />}
                        size="lg"
                    >
                        ตัวกรอง
                    </Button>
                </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Select
                            label="เรียงลำดับ"
                            selectedKeys={[filters.sortBy]}
                            onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0] as string;
                                handleFilterChange("sortBy", value);
                            }}
                            startContent={<SortAsc className="w-4 h-4" />}
                        >
                            {sortOptions.map((option) => (
                                <SelectItem key={option.key} textValue={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="ครูที่ปรึกษา"
                            selectedKeys={filters.hasAdvisor ? [filters.hasAdvisor] : []}
                            onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0] as string || "";
                                handleFilterChange("hasAdvisor", value);
                            }}
                        >
                            {advisorOptions.map((option) => (
                                <SelectItem key={option.key} textValue={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="จำนวนนักเรียน"
                            selectedKeys={filters.studentCountRange ? [filters.studentCountRange] : []}
                            onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0] as string || "";
                                handleFilterChange("studentCountRange", value);
                            }}
                        >
                            {studentCountOptions.map((option) => (
                                <SelectItem key={option.key} textValue={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            )}

            {/* Results Info and Clear Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        พบ <span className="font-semibold text-blue-600">{totalResults}</span> ห้องเรียน
                    </span>
                    {isFiltered && (
                        <Chip size="sm" color="primary" variant="flat">
                            กำลังกรอง
                        </Chip>
                    )}
                </div>

                {isFiltered && (
                    <Button
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={handleClearAll}
                        startContent={<X className="w-3 h-3" />}
                    >
                        ล้างตัวกรองทั้งหมด
                    </Button>
                )}
            </div>
        </div>
    );
}