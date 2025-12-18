"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { storageService } from "@/services/storage/storage";

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
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null); //create context

export const AuthProvider = ({ children }: Ichildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  /* Restore auth on refresh */
  useEffect(() => {
    const storedUser = storageService.getUser<IUser>();
    const storedToken = storageService.getAccessToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setAccessToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (data: any) => {
    storageService.setAccessToken(data.accessToken);
    storageService.setUser(data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    storageService.clearAuth();
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isAuthenticated,
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
