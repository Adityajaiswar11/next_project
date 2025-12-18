"use client";
import React, { createContext, useContext, useState } from "react";

interface LoaderContextType {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

interface LoaderProviderProps {
  children: React.ReactNode;
}

/* ================= CONTEXT ================= */

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider
      value={{
        loading,
        showLoader,
        hideLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }
  return ctx;
};
