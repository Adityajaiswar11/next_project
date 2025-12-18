import Dashboard from "@/components/pages/Dashboard/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page for users",
};

export default async function DashboardPage() {
    return (
        <Dashboard />
    );
}
