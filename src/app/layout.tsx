import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Startup Validation",
  description: "Platforma za validaciju startap ideja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen px-6 py-8">{children}</main>
      </body>
    </html>
  );
}