import Layout from "@/components/Teacher/Layout";
import RegistrationReport from "@/components/Teacher/Report/RegistrationReport";

export default function Report() {
    return (
        <Layout>
            <div className="p-6">
                <RegistrationReport />
            </div>
        </Layout>
    )
}