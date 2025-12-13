"use client";

import React, { createContext, useContext, useState } from "react";

interface LayoutContextType {
  showHeader: boolean;
  showFooter: boolean;
  setShowHeader: (value: boolean) => void;
  setShowFooter: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showHeader, setShowHeader] = useState(true)
  const [showFooter, setShowFooter] = useState(true);

  return (
    <LayoutContext.Provider
      value={{
        showHeader,
        showFooter,
        setShowHeader,
        setShowFooter,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
};
