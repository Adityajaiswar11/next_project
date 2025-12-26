import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutProvider } from "@/context/LayoutContext";
import Layout from "@/layout/Layout";
import { LoaderProvider } from "@/context/LoaderContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PaymentProvider } from "@/context/PaymentContext";

const clientId: string | undefined = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
if (!process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID) {
  throw new Error("NEXT_PUBLIC_OAUTH_CLIENT_ID is not defined");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={clientId || ""}>
          <LoaderProvider>
            <AuthProvider>
              <PaymentProvider>
                <LayoutProvider>
                <Toaster position="top-right" duration={3000} richColors />
                <Layout>{children}</Layout>
              </LayoutProvider>
              </PaymentProvider>
            </AuthProvider>
          </LoaderProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
