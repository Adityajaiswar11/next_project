"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { storageService } from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/config/storage.config";
import { decodeToken } from "@/lib/jwtDecode";
import { IUser } from "@/types/user.types";
import { useRouter } from "next/navigation";

interface Ichildren {
  children: React.ReactNode;
}

interface AuthContextType {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
  googleLogin: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null); //create context

export const AuthProvider = ({ children }: Ichildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter();

  // Restore auth on refresh
  useEffect(() => {
    const storedToken = storageService.getAccessToken();
    const storedGoogleToken = storageService.getRawData(STORAGE_KEYS.GOOGLE_ACCESS_TOKEN);
    const storedUser = storageService.getUser<IUser>();

    // check if user is authenticated 
    if ((storedToken || storedGoogleToken) && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (data: any) => {
    storageService.setAccessToken(data.accessToken);
    storageService.setRawData(STORAGE_KEYS.IS_AUTHENTICATED, true);
    storageService.setUser(data);
    setIsAuthenticated(true);
  };

  const googleLogin = (data: any) => {
    const token = data?.credential;
    if (!token) return;
    // Save raw token
    storageService.setRawData(STORAGE_KEYS.GOOGLE_ACCESS_TOKEN, token);
    storageService.setRawData(STORAGE_KEYS.IS_AUTHENTICATED, true);
    // Decode user info
    const decodedToken: any = decodeToken(token);
    if (!decodedToken) return;
    // Set user data
    const userData = {
      id: decodedToken?.sub,
      email: decodedToken?.email ?? "",
      firstName: decodedToken?.given_name ?? "",
      lastName: decodedToken?.family_name ?? "",
      image: decodedToken?.picture ?? "",
    }
    storageService.setUser(userData);
    setUser(userData);
    setIsAuthenticated(true);
  };
  // Logout
  const logout = async () => {
    storageService.clearAuth();
    storageService.removeRawData(STORAGE_KEYS.GOOGLE_ACCESS_TOKEN)
    storageService.removeRawData(STORAGE_KEYS.IS_AUTHENTICATED)
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        googleLogin,
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
