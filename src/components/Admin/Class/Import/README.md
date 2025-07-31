# Import Components

ชุด components สำหรับการนำเข้าข้อมูลนักเรียนจากไฟล์ CSV

## Components

### FileUploadStep
- รับผิดชอบการอัปโหลดไฟล์ CSV
- ใช้ FileDropZone component ที่แก้ไขแล้วสำหรับการลากวางไฟล์
- มีปุ่มดาวน์โหลดไฟล์ตัวอย่าง

### ColumnMappingStep  
- จับคู่คอลัมน์จากไฟล์ CSV กับฟิลด์ที่ต้องการ
- แสดงตัวอย่างข้อมูลจากไฟล์
- มีการตรวจสอบความถูกต้องของการจับคู่

### PreviewStep
- แสดงตัวอย่างข้อมูลที่จะนำเข้า
- ให้ผู้ใช้ตรวจสอบก่อนการนำเข้าจริง

### ImportProgressStep
- แสดงความคืบหน้าการนำเข้าข้อมูล
- แสดงสถานะของแต่ละรายการ (สำเร็จ/ล้มเหลว)

### ImportResultStep
- แสดงผลสรุปการนำเข้า
- แสดงรายการที่ล้มเหลวพร้อมสาเหตุ

## การใช้งาน

```tsx
import ImportStudentsModal from './ImportStudentsModal';

<ImportStudentsModal
    isOpen={isOpen}
    onClose={handleClose}
    onSuccess={handleSuccess}
    classId={classId}
/>
```

## ข้อดี

1. **แยก Components**: แต่ละ step เป็น component แยกกัน ทำให้จัดการง่าย
2. **Reusable**: สามารถนำไปใช้ในส่วนอื่นได้
3. **Maintainable**: แก้ไขและดูแลรักษาง่าย
4. **Better UX**: ระบบลากวางไฟล์ที่ทำงานได้ดีขึ้น
5. **Error Handling**: จัดการข้อผิดพลาดได้ดีขึ้น