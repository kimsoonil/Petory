import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "펫토리 (Petory) - 반려동물 통합 플랫폼",
  description: "반려동물과 함께하는 따뜻한 일상",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="min-h-screen max-w-[428px] mx-auto ">
          {children}
        </div>
      </body>
    </html>
  );
}
