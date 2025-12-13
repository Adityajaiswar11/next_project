import type { Metadata } from "next";
import { Login } from "@/components/Features/auth/Login";

export const metadata: Metadata = {
  title: "Login | My App",
  description: "Login to My App to securely access your dashboard and manage your account.",
};

export default function LoginPage() {
  return <Login />;
}
