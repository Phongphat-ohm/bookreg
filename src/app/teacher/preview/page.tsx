"use client";
import { PDFViewer } from '@react-pdf/renderer';
import PDFReport from '@/components/ReportGenerate/PDFReport';

export default function PreviewPage() {
    return (
        <div className="flex justify-center p-5 w-full">
            <div className='w-1/2'>
                <PDFViewer width="100%" height="600">
                    <PDFReport
                        book_name='หนังสือแบบเรียนวิชาวิทยาการคอมพิวเตอร์'
                        class_name='1/1'
                        group_name="กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี"
                        subject_code='ว12201'
                        subject_name='วิยาการคอมพิวเตอร์'
                        group_header='นายสมชาย ใจดี'
                        teacher='นางสาวสมดี มากะใจ'
                        students={[
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                            { name: "สมชาย ใจดี", book_code: "B001", registered_at: "2025-05-28" },
                            { name: "สุดา เก่งดี", book_code: "B002", registered_at: "2025-05-28" },
                        ]}
                    />
                </PDFViewer>
            </div>
        </div>
    );
}
