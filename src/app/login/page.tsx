"use client";
import { Login } from "@/components/Features/auth/Login";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return null;
  }

  return <Login />;
}
