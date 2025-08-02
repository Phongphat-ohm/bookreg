"use client";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Divider,
    Spinner,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import {
    User,
    Lock,
    Save,
    Eye,
    EyeOff,
    Shield,
    Edit3
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminData, UpdateAdminProfileRequest } from "@/types/admin";

export default function ProfileSettings() {
    const [adminData, setAdminData] = useState<AdminData | null>(null);
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
    const hasUnsavedNameChanges = isEditingName && adminData && name.trim() !== adminData.name;
    const hasUnsavedPasswordChanges = isChangingPassword && (currentPassword || newPassword || confirmPassword);

    // Fetch admin data
    const fetchAdminData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/admin/me');
            
            if (response.data.status === 200) {
                setAdminData(response.data.data);
                setName(response.data.data.name);
            } else {
                addToast({
                    color: "danger",
                    title: "ผิดพลาด",
                    description: response.data.message
                });
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
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
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'อัปเดต',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        try {
            setIsSaving(true);

            const updateData: UpdateAdminProfileRequest = {};
            
            if (isEditingName) {
                updateData.name = name.trim();
            }
            
            if (isChangingPassword) {
                updateData.currentPassword = currentPassword;
                updateData.newPassword = newPassword;
            }

            const response = await axios.put('/api/admin/me/update', updateData);

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
                await fetchAdminData();
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
        if (adminData) {
            setName(adminData.name);
        }
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsEditingName(false);
        setIsChangingPassword(false);
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                    <User className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">ข้อมูลส่วนตัว</h1>
                    <p className="text-sm text-gray-600">จัดการข้อมูลส่วนตัวและความปลอดภัยของบัญชี</p>
                </div>
            </div>

            {/* Profile Info Card */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <h2 className="text-lg font-semibold text-gray-800">ข้อมูลบัญชี</h2>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600">ชื่อผู้ใช้</label>
                            <p className="font-medium text-gray-800">{adminData?.username}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">บทบาท</label>
                            <p className="font-medium text-blue-600">ผู้ดูแลระบบ</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">วันที่สร้างบัญชี</label>
                            <p className="font-medium text-gray-800">
                                {adminData?.create_at ? new Date(adminData.create_at).toLocaleDateString('th-TH') : '-'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">อัปเดตล่าสุด</label>
                            <p className="font-medium text-gray-800">
                                {adminData?.update_at ? new Date(adminData.update_at).toLocaleDateString('th-TH') : '-'}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Edit Name Card */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-green-500" />
                            <h2 className="text-lg font-semibold text-gray-800">แก้ไขชื่อ</h2>
                        </div>
                        <Button
                            size="sm"
                            variant={isEditingName ? "solid" : "bordered"}
                            color={isEditingName ? "danger" : "primary"}
                            onPress={() => {
                                if (isEditingName) {
                                    setName(adminData?.name || "");
                                }
                                setIsEditingName(!isEditingName);
                            }}
                        >
                            {isEditingName ? "ยกเลิก" : "แก้ไข"}
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Input
                        label="ชื่อ"
                        placeholder="ใส่ชื่อของคุณ"
                        value={name}
                        onValueChange={setName}
                        startContent={<User className="w-4 h-4 text-gray-400" />}
                        isReadOnly={!isEditingName}
                        variant={isEditingName ? "bordered" : "flat"}
                        classNames={{
                            input: isEditingName ? "" : "text-gray-600"
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
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-orange-500" />
                            <h2 className="text-lg font-semibold text-gray-800">เปลี่ยนรหัสผ่าน</h2>
                        </div>
                        <Button
                            size="sm"
                            variant={isChangingPassword ? "solid" : "bordered"}
                            color={isChangingPassword ? "danger" : "warning"}
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
                    <CardBody className="space-y-4">
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
                        />
                    </CardBody>
                )}
            </Card>

            {/* Action Buttons */}
            {(isEditingName || isChangingPassword) && (
                <Card>
                    <CardBody>
                        {(hasUnsavedNameChanges || hasUnsavedPasswordChanges) && (
                            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <div className="flex items-center gap-2 text-amber-700">
                                    <Edit3 className="w-4 h-4" />
                                    <span className="text-sm font-medium">มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก</span>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="bordered"
                                onPress={resetForm}
                                isDisabled={isSaving}
                            >
                                รีเซ็ต
                            </Button>
                            <Button
                                color="success"
                                onPress={handleUpdateProfile}
                                isLoading={isSaving}
                                isDisabled={!hasUnsavedNameChanges && !hasUnsavedPasswordChanges}
                                startContent={!isSaving && <Save className="w-4 h-4" />}
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