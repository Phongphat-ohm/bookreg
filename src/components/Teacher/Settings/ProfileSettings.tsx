"use client";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Divider,
    Spinner,
    addToast,
    Image
} from "@heroui/react";
import { useState, useEffect } from "react";
import {
    User,
    Lock,
    Save,
    Eye,
    EyeOff,
    Shield,
    Edit3,
    GraduationCap,
    Calendar,
    UserCheck
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { TeacherData, UpdateTeacherProfileRequest } from "@/types/admin";

export default function TeacherProfileSettings() {
    const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Form states
    const [name, setName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // UI states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Check if there are unsaved changes
    const hasUnsavedNameChanges = isEditingName && teacherData && name.trim() !== teacherData.name;
    const hasUnsavedPasswordChanges = isChangingPassword && (currentPassword || newPassword || confirmPassword);

    // Fetch teacher data
    const fetchTeacherData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/teacher/me');
            
            if (response.data.status === 200) {
                setTeacherData(response.data.data);
                setName(response.data.data.name);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message
                });
            }
        } catch (error) {
            console.error("Error fetching teacher data:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: "ไม่สามารถโหลดข้อมูลได้"
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Update profile
    const handleUpdateProfile = async () => {
        // Validation
        if (isEditingName && (!name || name.trim() === "")) {
            addToast({
                color: "warning",
                title: "คำเตือน",
                description: "กรุณาใส่ชื่อ"
            });
            return;
        }

        if (isEditingName && name.trim().length < 2) {
            addToast({
                color: "warning",
                title: "คำเตือน",
                description: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"
            });
            return;
        }

        if (isEditingName && name.trim().length > 100) {
            addToast({
                color: "warning",
                title: "คำเตือน",
                description: "ชื่อต้องไม่เกิน 100 ตัวอักษร"
            });
            return;
        }

        if (isChangingPassword) {
            if (!currentPassword) {
                addToast({
                    color: "warning",
                    title: "คำเตือน",
                    description: "กรุณาใส่รหัสผ่านเดิม"
                });
                return;
            }

            if (!newPassword || newPassword.length < 6) {
                addToast({
                    color: "warning",
                    title: "คำเตือน",
                    description: "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร"
                });
                return;
            }

            if (newPassword !== confirmPassword) {
                addToast({
                    color: "warning",
                    title: "คำเตือน",
                    description: "รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน"
                });
                return;
            }
        }

        // Confirm update
        const result = await Swal.fire({
            title: 'ยืนยันการอัปเดต',
            text: 'คุณต้องการอัปเดตข้อมูลส่วนตัวหรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1e40af',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'อัปเดต',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        try {
            setIsSaving(true);

            const updateData: UpdateTeacherProfileRequest = {};
            
            if (isEditingName) {
                updateData.name = name.trim();
            }
            
            if (isChangingPassword) {
                updateData.currentPassword = currentPassword;
                updateData.newPassword = newPassword;
            }

            const response = await axios.put('/api/teacher/me/update', updateData);

            if (response.data.status === 200) {
                addToast({
                    color: "success",
                    title: "สำเร็จ",
                    description: response.data.message
                });

                // Reset form
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setIsEditingName(false);
                setIsChangingPassword(false);
                
                // Refresh data
                await fetchTeacherData();
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message
                });
            }
        } catch (error: any) {
            console.error("Error updating profile:", error);
            addToast({
                color: "danger",
                title: "ผิดพลาด",
                description: error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดต"
            });
        } finally {
            setIsSaving(false);
        }
    };

    const resetForm = () => {
        if (teacherData) {
            setName(teacherData.name);
        }
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsEditingName(false);
        setIsChangingPassword(false);
    };

    useEffect(() => {
        fetchTeacherData();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-96 flex flex-col items-center justify-center">
                <Spinner size="lg" color="primary" />
                <h1 className="text-lg text-blue-500 mt-3">กำลังโหลดข้อมูล</h1>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Logo - Similar to Teacher Home */}
            <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-6 shadow-lg">
                <Image src={"/images/logo.png"} className="w-24 mb-4" />
                <h1 className="text-3xl font-bold text-blue-900 text-center">ตั้งค่าข้อมูลส่วนตัว</h1>
                <p className="text-blue-700 text-center mt-2 text-lg">จัดการข้อมูลส่วนตัวและความปลอดภัยของบัญชีครู</p>
                <div className="mt-4 px-4 py-2 bg-blue-200 rounded-full">
                    <span className="text-blue-800 text-sm font-medium">
                        👋 สวัสดี {teacherData?.name || 'ครู'}
                    </span>
                </div>
            </div>

            {/* Profile Info Card */}
            <Card className="shadow-lg border-0">
                <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-blue-600">
                    <div className="flex items-center gap-3 w-full">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">ข้อมูลบัญชีครู</h2>
                            <p className="text-blue-100 text-sm">ข้อมูลพื้นฐานของบัญชีผู้ใช้</p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 font-medium">ชื่อผู้ใช้</label>
                                <p className="font-semibold text-gray-800 text-lg">{teacherData?.username}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <GraduationCap className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 font-medium">บทบาท</label>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-green-600 text-lg">
                                        {teacherData?.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ครูผู้สอน'}
                                    </p>
                                    {teacherData?.role === 'admin' && (
                                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                                            Admin
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 font-medium">วันที่สร้างบัญชี</label>
                                <p className="font-semibold text-gray-800">
                                    {teacherData?.create_at ? new Date(teacherData.create_at).toLocaleDateString('th-TH') : '-'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <UserCheck className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 font-medium">อัปเดตล่าสุด</label>
                                <p className="font-semibold text-gray-800">
                                    {teacherData?.update_at ? new Date(teacherData.update_at).toLocaleDateString('th-TH') : '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Edit Name Card */}
            <Card className="shadow-lg border-0">
                <CardHeader className="pb-3 bg-gradient-to-r from-green-500 to-green-600">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Edit3 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">แก้ไขชื่อ</h2>
                                <p className="text-green-100 text-sm">เปลี่ยนชื่อที่แสดงในระบบ</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant={isEditingName ? "solid" : "bordered"}
                            color={isEditingName ? "danger" : "default"}
                            className={isEditingName ? "bg-white text-red-600" : "bg-white/20 text-white border-white/30"}
                            onPress={() => {
                                if (isEditingName) {
                                    setName(teacherData?.name || "");
                                }
                                setIsEditingName(!isEditingName);
                            }}
                        >
                            {isEditingName ? "ยกเลิก" : "แก้ไข"}
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="p-6">
                    <Input
                        label="ชื่อ"
                        placeholder="ใส่ชื่อของคุณ"
                        value={name}
                        onValueChange={setName}
                        startContent={<User className="w-4 h-4 text-gray-400" />}
                        isReadOnly={!isEditingName}
                        variant={isEditingName ? "bordered" : "flat"}
                        classNames={{
                            input: isEditingName ? "" : "text-gray-600",
                            inputWrapper: isEditingName ? "border-green-300 focus-within:border-green-500" : ""
                        }}
                        description={isEditingName ? "ชื่อต้องมี 2-100 ตัวอักษร" : ""}
                        color={
                            isEditingName && name && (name.trim().length < 2 || name.trim().length > 100)
                                ? "danger"
                                : "default"
                        }
                        errorMessage={
                            isEditingName && name && name.trim().length < 2
                                ? "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"
                                : isEditingName && name && name.trim().length > 100
                                ? "ชื่อต้องไม่เกิน 100 ตัวอักษร"
                                : ""
                        }
                    />
                </CardBody>
            </Card>

            {/* Change Password Card */}
            <Card className="shadow-lg border-0">
                <CardHeader className="pb-3 bg-gradient-to-r from-orange-500 to-orange-600">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Lock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">เปลี่ยนรหัสผ่าน</h2>
                                <p className="text-orange-100 text-sm">อัปเดตรหัสผ่านเพื่อความปลอดภัย</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant={isChangingPassword ? "solid" : "bordered"}
                            color={isChangingPassword ? "danger" : "default"}
                            className={isChangingPassword ? "bg-white text-red-600" : "bg-white/20 text-white border-white/30"}
                            onPress={() => {
                                if (isChangingPassword) {
                                    setCurrentPassword("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                }
                                setIsChangingPassword(!isChangingPassword);
                            }}
                        >
                            {isChangingPassword ? "ยกเลิก" : "เปลี่ยน"}
                        </Button>
                    </div>
                </CardHeader>
                {isChangingPassword && (
                    <CardBody className="space-y-4 p-6">
                        <Input
                            label="รหัสผ่านเดิม"
                            placeholder="ใส่รหัสผ่านเดิม"
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onValueChange={setCurrentPassword}
                            startContent={<Lock className="w-4 h-4 text-gray-400" />}
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="focus:outline-none"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <Eye className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>
                            }
                            classNames={{
                                inputWrapper: "border-orange-300 focus-within:border-orange-500"
                            }}
                        />
                        
                        <Input
                            label="รหัสผ่านใหม่"
                            placeholder="ใส่รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onValueChange={setNewPassword}
                            startContent={<Lock className="w-4 h-4 text-gray-400" />}
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="focus:outline-none"
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <Eye className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>
                            }
                            classNames={{
                                inputWrapper: "border-orange-300 focus-within:border-orange-500"
                            }}
                        />
                        
                        <Input
                            label="ยืนยันรหัสผ่านใหม่"
                            placeholder="ใส่รหัสผ่านใหม่อีกครั้ง"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onValueChange={setConfirmPassword}
                            startContent={<Lock className="w-4 h-4 text-gray-400" />}
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <Eye className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>
                            }
                            color={
                                confirmPassword && newPassword && confirmPassword !== newPassword 
                                    ? "danger" 
                                    : "default"
                            }
                            errorMessage={
                                confirmPassword && newPassword && confirmPassword !== newPassword 
                                    ? "รหัสผ่านไม่ตรงกัน" 
                                    : ""
                            }
                            classNames={{
                                inputWrapper: confirmPassword && newPassword && confirmPassword !== newPassword 
                                    ? "border-red-300 focus-within:border-red-500"
                                    : "border-orange-300 focus-within:border-orange-500"
                            }}
                        />
                    </CardBody>
                )}
            </Card>

            {/* Action Buttons */}
            {(isEditingName || isChangingPassword) && (
                <Card className="shadow-lg border-0">
                    <CardBody className="p-6">
                        {(hasUnsavedNameChanges || hasUnsavedPasswordChanges) && (
                            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                <div className="flex items-center gap-3 text-amber-700">
                                    <Edit3 className="w-5 h-5" />
                                    <div>
                                        <span className="text-sm font-medium">มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก</span>
                                        <p className="text-xs text-amber-600 mt-1">กรุณาบันทึกการเปลี่ยนแปลงก่อนออกจากหน้านี้</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="bordered"
                                onPress={resetForm}
                                isDisabled={isSaving}
                                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                                รีเซ็ต
                            </Button>
                            <Button
                                color="primary"
                                onPress={handleUpdateProfile}
                                isLoading={isSaving}
                                isDisabled={!hasUnsavedNameChanges && !hasUnsavedPasswordChanges}
                                startContent={!isSaving && <Save className="w-4 h-4" />}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {isSaving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}