"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
          지금 바로 <br className="md:hidden" />
          시작해보세요
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          사랑하는 반려동물과의 더 행복한 일상, <br className="md:hidden" />
          펫토리가 함께합니다.
        </p>

        <Link
          href="/splash"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-xl"
        >
          무료로 시작하기
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* 배경 장식 */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    </section>
  );
}
