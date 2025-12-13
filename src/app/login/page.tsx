import type { Metadata } from "next";
import { Login } from "@/components/Features/auth/Login";

export const metadata: Metadata = {
  title: "Login | My App",
  description: "Login to My App to securely access your dashboard and manage your account.",

  // 🔗 Canonical URL
  alternates: {
    canonical: "https://myapp.com/login",
  },

  // 🤖 Search Engine Rules
  robots: {
    index: true,
    follow: true,
  },

  // 🌍 Open Graph (WhatsApp, LinkedIn, Facebook)
  openGraph: {
    title: "Login | My App",
    description:
      "Secure login to access your My App dashboard and manage your account.",
    url: "https://myapp.com/login",
    siteName: "My App",
    images: [
      {
        url: "https://myapp.com/og/login.png",
        width: 1200,
        height: 630,
        alt: "My App Login Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "Login | My App",
    description:
      "Secure login to access your My App dashboard and manage your account.",
    images: ["https://myapp.com/og/login.png"],
    creator: "@myapp",
  },

  // 🖼 App Icons & Favicon
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // 📱 PWA / Mobile
  manifest: "/site.webmanifest",

  // 🔎 Extra SEO keywords (optional)
  keywords: [
    "login",
    "secure login",
    "my app login",
    "dashboard login",
    "user authentication",
  ],

  // 📌 Metadata base (important for images)
  metadataBase: new URL("https://myapp.com"),
};

export default function LoginPage() {
  return <Login />;
}
