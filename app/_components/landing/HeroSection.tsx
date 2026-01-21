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
    <section className="relative min-h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src="/leading.png"
        alt="펫토리 랜딩 배경"
        fill
        priority
        className="pt-20 bg-[#9f6f34]"
        sizes="(max-width: 768px) 100vw, 428px"
      />

      {/* 가독성 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/40" />

      {/* 컨텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-4 py-20 ">
        <div className="text-center max-w-2xl mx-auto">
          {/* 메인 타이틀 */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 animate-slide-up drop-shadow">
            펫토리
          </h1>
          <p className="text-base md:text-lg text-white/85 mb-8 animate-slide-up drop-shadow">
            Petory
          </p>

        {/* 서브 타이틀 */}
        <p className="text-xl md:text-2xl text-white mb-4 font-medium animate-slide-up drop-shadow">
          반려동물과 함께하는
          <span className="text-white">스마트한 일상</span>
        </p>

        <p className="text-lg text-white/85 mb-12 animate-slide-up drop-shadow">
          산책부터 건강 관리까지,
          모든 것을 한 곳에서
        </p>

       
        </div>

      {/* 스크롤 인디케이터 */}
       {/* CTA 버튼들 */}
       <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link
            href="/walk"
            className="group bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 hover:scale-[1.03]"
          >
            시작하기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      <button
        onClick={scrollToFeatures}
        className="absolute bottom-8 animate-bounce hover:scale-110 transition-transform z-10"
        aria-label="더 알아보기"
      >
        <ChevronDown className="w-6 h-6 text-white/80 drop-shadow" />
      </button>
      </div>
    </section>
  );
}

