"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { headerConfig } from "@/config/header.config";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* ---------- LEFT---------- */}
        <Link href="/" className="text-xl font-bold">
          MyLogo
        </Link>

        {/* ---------- MIDDLE ---------- */}
        <nav className="hidden md:flex items-center gap-6">
          {headerConfig.links
            .filter((link) => link.show)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        {/* ---------- RIGHT ---------- */}
        <div className="flex items-center gap-3">
          {headerConfig.showAuthButton && (
            isAuthenticated ? (
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-600 hover:text-black"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-black"
              >
                Sign in
              </Link>
            )
          )}

          {headerConfig.showGetStarted && (
            <Link
              href="/get-started"
              className="rounded bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Get Started
            </Link>
          )}

          {/* ---------- HAMBURGER ---------- */}
          {headerConfig.showHamburger && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden lg:hidden xl:hidden"
            >
              ☰
            </button>
          )}
        </div>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          {headerConfig.links
            .filter((link) => link.show)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700"
              >
                {link.label}
              </Link>
            ))}
        </div>
      )}
    </header>
  );
};

export default Header;
