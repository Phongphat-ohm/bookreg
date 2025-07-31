# Bulk Delete Students API

API สำหรับการลบนักเรียนหลายคนพร้อมกัน

## Endpoint
```
DELETE /api/admin/students/bulk-delete
```

## Request Body
```json
{
  "studentIds": [1, 2, 3, 4, 5]
}
```

## Response

### Success Response
```json
{
  "status": 200,
  "message": "ลบนักเรียนเสร็จสิ้น",
  "data": {
    "total": 5,
    "success": 3,
    "failed": 2,
    "errors": [
      {
        "id": 4,
        "name": "นายสมชาย ใจดี",
        "error": "มีการลงทะเบียนหนังสือ"
      },
      {
        "id": 5,
        "name": "นางสาวสมหญิง รักเรียน", 
        "error": "เกิดข้อผิดพลาดในการลบ"
      }
    ]
  }
}
```

### Error Response
```json
{
  "status": 400,
  "message": "กรุณาระบุรายการนักเรียนที่ต้องการลบ"
}
```

## Features

1. **Bulk Operation**: ลบนักเรียนหลายคนในคำขอเดียว
2. **Validation**: ตรวจสอบข้อมูลก่อนการลบ
3. **Constraint Checking**: ตรวจสอบว่านักเรียนมีการลงทะเบียนหนังสือหรือไม่
4. **Detailed Results**: ส่งคืนผลลัพธ์ที่ละเอียด รวมถึงข้อผิดพลาด
5. **Fallback**: หากการลบแบบ bulk ล้มเหลว จะลองลบทีละคน

## Error Handling

- นักเรียนที่มีการลงทะเบียนหนังสือจะไม่ถูกลบ
- ส่งคืนรายละเอียดข้อผิดพลาดสำหรับแต่ละรายการที่ล้มเหลว
- ใช้ transaction เพื่อความปลอดภัยของข้อมูล