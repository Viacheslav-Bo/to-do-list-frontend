import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import AuthHydrator from "@/components/providers/AuthHydrator";
import QueryProvider from "@/components/providers/QueryProvider";

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
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthHydrator />
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="text-center text-xs text-slate-600 py-4">
            <p>
              Created <time dateTime="2026">2026</time>
            </p>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
