import WhatsAppButton from "@/components/Common/Whatsapp/Whatsapp";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page for users",
};

export default async function DashboardPage() {
    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <WhatsAppButton />
        </div>
    );
}
