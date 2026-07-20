import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import AuthHydrator from "@/components/providers/AuthHydrator";
import QueryProvider from "@/components/providers/QueryProvider";
import ThemeInitializer from "@/components/providers/ThemeInitializer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Just TO DO It",
  description: "TO DO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-screen flex-col overflow-hidden">
        <QueryProvider>
          <AuthHydrator />
          <ThemeInitializer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--color-surface-solid)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-border-strong)",
              },
              success: {
                iconTheme: {
                  primary: "#34d399",
                  secondary: "var(--color-surface-solid)",
                },
              },
              error: {
                iconTheme: {
                  primary: "#fb7185",
                  secondary: "var(--color-surface-solid)",
                },
              },
            }}
          />
          <Header />
          <main className="flex-1 overflow-y-auto pt-16">{children}</main>
           <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
