"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // 2초 후 홈 화면으로 자동 이동
    const timer = setTimeout(() => {
      router.push("/app");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary overflow-hidden relative">
      {/* 배경 이미지 */}
      <Image
        src="/leading.png"
        alt="Petory Splash"
        fill
        className="object-cover opacity-20"
        priority
      />

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary-dark/90" />

      {/* 로고 및 브랜드 */}
      <div className="text-center z-10 animate-fade-in relative">
        {/* 아이콘 */}
        <div className="mb-6 animate-bounce-gentle">
          <div className="w-24 h-24 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center text-6xl transform hover:rotate-12 transition-transform duration-300">
            🐾
          </div>
        </div>

        {/* 브랜드명 */}
        <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg animate-slide-up">
          펫토리
        </h1>
        <p
          className="text-xl text-white/90 font-medium drop-shadow-md animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Petory
        </p>

        {/* 로딩 인디케이터 */}
        <div
          className="mt-12 flex gap-2 justify-center animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* 하단 텍스트 */}
      <div
        className="absolute bottom-12 text-center animate-fade-in z-10"
        style={{ animationDelay: "0.6s" }}
      >
        <p className="text-white/80 text-sm">
          반려동물과 함께하는 스마트한 일상
        </p>
      </div>
    </div>
  );
}
