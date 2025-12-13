"use client";

import React, { createContext, useContext, useState } from "react";

interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
}

interface Ichildren {
  children: React.ReactNode;
}

interface AuthContextType {
  user: IUser | null;
  accessToken: string | null;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null); //create context

export const AuthProvider = ({ children }: Ichildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (data: any) => {
    setAccessToken(data.accessToken);
    setUser({
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    });
  };

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
