"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToFeatures = () => {
    const element = document.getElementById("features");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col md:flex-row bg-white overflow-hidden">
      {/* 텍스트 컨텐츠 (왼쪽/상단) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 z-10 bg-white">
        <div className="max-w-xl mx-auto md:mx-0">
          <div className="inline-block px-3 py-1 bg-orange-100 text-primary font-bold rounded-full text-sm mb-6 animate-fade-in">
            New 2026
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] animate-slide-up tracking-tight">
            반려동물 케어,
            <br />
            <span className="text-primary">펫토리</span>로<br />
            완벽하게.
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed animate-slide-up delay-100 max-w-md">
            산책 기록부터 건강 관리, 일정 알림까지.
            <br className="hidden md:block" />
            사랑하는 반려동물을 위한 모든 기능을 담았습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
            <Link
              href="/splash"
              className="inline-flex justify-center items-center px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all hover:scale-105 shadow-lg group"
            >
              지금 시작하기
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={scrollToFeatures}
              className="inline-flex justify-center items-center px-8 py-4 bg-gray-100 text-gray-900 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
            >
              더 알아보기
            </button>
          </div>
        </div>
      </div>

      {/* 이미지 영역 (오른쪽/하단) */}
      <div className="w-full md:w-1/2 relative h-[50vh] md:h-auto md:min-h-screen bg-[#f8f5f2]">
        <div className="absolute inset-0 flex items-center justify-center p-10 md:p-20">
          {/* 배경 장식 */}
          <div className="absolute w-[80%] h-[80%] bg-white/50 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative w-full h-full max-w-[500px] aspect-[4/5] md:aspect-auto">
            <Image
              src="/leading.png"
              alt="Petory App Preview"
              fill
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* 모바일 스크롤 유도 아이콘 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden animate-bounce text-gray-400 z-20">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
