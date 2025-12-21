"use client";

import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { setShowHeader } = useLayout();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }

    setShowHeader(true);
    return () => setShowHeader(false);
  }, [isAuthenticated]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

        {/* Profile Image */}
        <img
          src={user.image}
          alt={user.firstName}
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />

        {/* Name */}
        <h1 className="text-2xl font-semibold mt-4">
          {user.firstName} {user.lastName}
        </h1>

        {/* Email */}
        <p className="text-gray-500 mt-1">{user.email}</p>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6" />

        {/* Welcome Message */}
        <p className="text-gray-600">
          Welcome to your profile {user.firstName} {user.lastName}!
        </p>
      </div>
    </div>
  );
}
