import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quản lý Cán bộ",
  description: "Bài thi chuyên môn Next.js - quản lý danh sách cán bộ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
