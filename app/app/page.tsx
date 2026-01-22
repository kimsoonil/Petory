"use client";

import Link from "next/link";
import { Bell, Settings, PawPrint, Calendar as CalendarIcon, MapPin, ChevronRight, Activity } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

export default function DashboardPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
            {/* 헤더 영역 */}
            <header className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                    <span className="text-primary text-2xl">🐾</span> 펫토리
                </h1>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <Settings className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <main className="flex-1 px-4 py-6 space-y-6">
                {/* 반려동물 프로필 카드 */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl overflow-hidden border-2 border-primary">
                                🐶
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">초코</h2>
                                    <p className="text-sm text-gray-500">골든 리트리버 · 2살</p>
                                </div>
                                <Link href="#" className="p-2 text-gray-400 hover:text-primary transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full">
                                    행복함 😊
                                </span>
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                    건강함 💪
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-2xl text-center">
                            <p className="text-xs text-gray-500 mb-1">오늘의 산책</p>
                            <p className="text-lg font-bold text-gray-900">0분</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-2xl text-center">
                            <p className="text-xs text-gray-500 mb-1">다음 접종</p>
                            <p className="text-lg font-bold text-gray-900">D-15</p>
                        </div>
                    </div>
                </div>

                {/* 퀵 액션 버튼 */}
                <Link
                    href="/walk"
                    className="block w-full bg-gradient-to-r from-primary to-primary-dark text-white p-5 rounded-3xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] group relative overflow-hidden"
                >
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                <PawPrint className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">산책 시작하기</h3>
                                <p className="text-white/90 text-sm mt-0.5">오늘도 신나게 달려볼까요?</p>
                            </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                </Link>

                {/* 현황 대시보드 */}
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/health" className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:border-primary/30 transition-colors group">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Activity className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">건강 기록</h3>
                        <p className="text-xs text-gray-500">최근 몸무게 5.2kg</p>
                    </Link>

                    <Link href="/service" className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:border-primary/30 transition-colors group">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <CalendarIcon className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">예약 관리</h3>
                        <p className="text-xs text-gray-500">이번 달 예약 1건</p>
                    </Link>
                </div>

                {/* 날씨/정보 카드 (Placeholder) */}
                <div className="bg-blue-500 rounded-3xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-1">오늘 산책하기 딱 좋아요! ☀️</h3>
                        <p className="text-white/90 text-sm">미세먼지 '좋음', 기온 24°C</p>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-xl translate-x-1/2 translate-y-1/2"></div>
                </div>

            </main>

            <BottomNavigation />
        </div>
    );
}
