import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function CheckSignin() {
    const cookie = await cookies();
    const env = process.env.JWT_SECRET || "jwtpasswordissoveryharadnaakubtuaeng";

    const get_token = cookie.get("teacher_token");

    if (!get_token) {
        return {
            status: 404,
            message: "กรุณาเข้าสู่ระบบ"
        }
    }

    const vertify_token: any = jwt.verify(get_token.value, env);

    if (!vertify_token) {
        return {
            status: 400,
            message: "กรุณาเข้าสู่ระบบ(ยืนยันตัวตนผิดพลาด)"
        }
    }

    const uid = vertify_token.uid;

    if (!uid) {
        return {
            status: 400,
            message: "กรุณาเข้าสู่ระบบ(ไม่พบข้อมูล)"
        }
    }

    return {
        status: 200,
        message: "พบการเข้าสู่ระบบ",
        data: {
            uid: uid
        }
    }
}