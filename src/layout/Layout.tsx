"use client";

import Header from "@/components/Common/Header/Header";
import Footer from "@/components/Common/Footer/Footer";
import { useLayout } from "@/context/LayoutContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showHeader, showFooter } = useLayout();
  return (
    <>
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}
