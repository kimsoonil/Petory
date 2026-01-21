import type { Metadata } from "next";
import type { ReactNode } from "react";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "펫토리 (Petory) - 반려동물 통합 플랫폼",
  description: "반려동물과 함께하는 따뜻한 일상",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
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
