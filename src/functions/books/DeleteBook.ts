import { addToast } from "@heroui/react";
import axios, { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";

export default async function DeleteBook(book_id: number) {
    try {
        const confirm = await Swal.fire({
            title: "ยืนยัน",
            text: "ยืนยันการลบหรือไม่",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            cancelButtonText: "ยกเลิก",
            denyButtonText: "ยืนยัน"
        })

        if (!confirm.isDenied) {
            return false;
        }

        Swal.fire({
            title: "กำลังโหลด",
            text: "กำลังลบข้อมูลหนังสือ",
            didOpen: () => {
                Swal.showLoading()
            },
            showConfirmButton: false,
            allowOutsideClick: false
        });

        const config: AxiosRequestConfig = {
            method: "POST",
            url: "/api/book/delete",
            data: JSON.stringify({
                book_id: book_id
            })
        }

        const req_data = await axios(config);
        const response = req_data.data;

        if (response.status !== 200) {
            addToast({
                color: "warning",
                title: "ระวัง",
                description: response.message,
                timeout: 3000
            });
            return false;
        }

        Swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: response.message,
            confirmButtonText: "ยืนยัน"
        })
        return true;
    } catch (error) {
        console.log(error);
        addToast({
            color: "danger",
            title: "ผิดพลาด",
            description: "ดูข้อมูลผิดพลาดที่หน้าควบคุม",
            timeout: 3000
        });
        return false;
    }
}