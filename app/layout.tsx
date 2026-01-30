"use client";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import "./globals.css";

// metadata는 Client Component에서 export할 수 없으므로 별도 처리 필요
// 대신 각 페이지에서 개별적으로 metadata를 설정하거나
// layout을 Server Component로 유지하고 내부에 Client Component를 생성

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const isLanding = pathname === "/landing";

  return (
    <html lang="ko">
      <head>
        <title>펫토리 (Petory) - 반려동물 통합 플랫폼</title>
        <meta name="description" content="반려동물과 함께하는 따뜻한 일상" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="antialiased">
        <div
          className={
            isLanding ? "min-h-screen" : "min-h-screen max-w-[428px] mx-auto"
          }
        >
          {children}
        </div>
      </body>
    </html>
  );
}
