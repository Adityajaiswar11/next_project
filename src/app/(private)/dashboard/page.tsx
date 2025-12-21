"use client";
import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { setShowHeader } = useLayout();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
    setShowHeader(true);

    return () => {
      setShowHeader(false);
    }
  }, [isAuthenticated]);

    return (
      <div>
        <img
          src={user?.image}
          alt="User"
          width={40}
          height={40}
        />

        <h1>Welcome {user?.firstName}</h1>
      </div>
    );
}
