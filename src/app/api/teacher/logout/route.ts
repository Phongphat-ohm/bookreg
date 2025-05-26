import { cookies } from "next/headers"

export async function GET() {
    try {
        const cookie = await cookies();

        cookie.delete("teacher_token")

        return Response.json({
            status: 200,
            message: "ออกจากระบบสำเร็จ"
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ทำงานผิดพลาด",
            error
        })
    }
}