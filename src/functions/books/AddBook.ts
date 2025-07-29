import { addToast } from "@heroui/react";
import axios, { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import { AddBookRequest } from "@/types/book";

export default async function AddBook(bookData: AddBookRequest) {
    try {
        Swal.fire({
            title: "กำลังโหลด",
            text: "กำลังเพิ่มข้อมูลหนังสือ",
            didOpen: () => {
                Swal.showLoading()
            },
            showConfirmButton: false,
            allowOutsideClick: false
        });

        const config: AxiosRequestConfig = {
            method: "POST",
            url: "/api/book/add",
            data: JSON.stringify(bookData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const req_data = await axios(config);
        const response = req_data.data;

        if (response.status !== 200) {
            Swal.close();
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
        });
        return true;
    } catch (error) {
        console.log(error);
        Swal.close();
        addToast({
            color: "danger",
            title: "ผิดพลาด",
            description: "ดูข้อมูลผิดพลาดที่หน้าควบคุม",
            timeout: 3000
        });
        return false;
    }
}