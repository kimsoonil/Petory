"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, AlertCircle, ChevronRight, X, Home, MapPin, Heart, CheckCircle2, Syringe, Pill } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// 건강 점수 데이터
const healthScore = 85;

// 체중 변화 데이터 (월별)
const weightData = [
  { month: "7월", weight: 4.5 },
  { month: "8월", weight: 4.6 },
  { month: "9월", weight: 4.8 },
  { month: "10월", weight: 4.9 },
  { month: "11월", weight: 5.0 },
  { month: "12월", weight: 5.2 },
];

// 예정된 건강 일정
const scheduledEvents = [
  {
    id: 1,
    type: "접종",
    title: "연간 종합 백신 접종",
    date: "2025.03.15",
    icon: Syringe,
    color: "blue",
  },
  {
    id: 2,
    type: "약 복용",
    title: "심장사상충 약 복용",
    date: "2024.12.20",
    icon: Pill,
    color: "yellow",
    urgent: true,
  },
];

// 건강 기록
const healthRecords = [
  {
    id: 1,
    type: "접종",
    title: "종합 백신 접종",
    location: "서울동물병원",
    date: "2024.12.05",
    icon: "💉",
  },
  {
    id: 2,
    type: "진료",
    title: "정기 건강검진",
    location: "강남 펫 클리닉",
    date: "2024.11.28",
    icon: "❤️",
  },
  {
    id: 3,
    type: "체중",
    title: "체중 측정",
    location: "집",
    date: "2024.11.15",
    icon: "⚖️",
  },
  {
    id: 4,
    type: "약 복용",
    title: "심장사상충 약 복용",
    location: "집",
    date: "2024.10.20",
    icon: "💊",
  },
];

export default function HealthPage() {
  const [showAlert, setShowAlert] = useState(false);

  // 건강 점수에 따른 메시지
  const getHealthMessage = (score: number) => {
    if (score >= 90) return "건강 상태가 매우 좋습니다!";
    if (score >= 80) return "건강 상태가 좋습니다!";
    if (score >= 70) return "건강 상태가 양호합니다.";
    if (score >= 60) return "건강 관리를 더 신경 쓰세요.";
    return "건강 관리를 시작하세요.";
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">건강 대시보드</h1>
          <Link href="/" className="text-primary font-medium text-sm">닫기</Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {/* 종합 건강 점수 */}
        <div className="relative bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-white mb-4">종합 건강 점수</h2>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-bold text-white">{healthScore}</span>
              <span className="text-2xl font-medium text-white/80 mb-1">/ 100</span>
            </div>
            <p className="text-base text-white font-medium">{getHealthMessage(healthScore)}</p>
          </div>
          {/* 하트 아이콘 */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30">
            <Heart className="w-24 h-24 text-white stroke-white fill-none" strokeWidth={1.5} />
          </div>
        </div>

        {/* 예정된 건강 일정 */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">예정된 건강 일정</h2>
          <div className="space-y-3">
            {scheduledEvents.map((event) => {
              const IconComponent = event.icon;
              return (
                <div
                  key={event.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${
                    event.color === "blue"
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-yellow-500 bg-yellow-50/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        event.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-gray-900">{event.title}</h3>
                        {event.urgent && (
                          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 ml-2">
                            <AlertCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 체중 변화 추이 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">체중 변화 추이</h2>
            <button className="text-sm text-primary font-medium">기록하기</button>
          </div>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  domain={[4, 6]}
                  tickCount={5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#FF9F43"
                  strokeWidth={3}
                  dot={{ fill: "#FF9F43", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
            <span>현재 체중: 5.2kg</span>
            <span className="text-primary font-medium">(정상 범위)</span>
          </div>
        </div>

        {/* 건강 기록 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">건강 기록</h2>
          <div className="space-y-3">
            {healthRecords.map((record) => (
              <div key={record.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl border-2 border-primary/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {record.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1">{record.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{record.location}</span>
                    <span className="text-gray-400">•</span>
                    <span>{record.date}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <Link href="/" className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-gray-400 hover:text-primary transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">홈</span>
          </Link>
          <Link href="/walk" className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-gray-400 hover:text-primary transition-colors">
            <MapPin className="w-6 h-6" />
            <span className="text-xs font-medium">산책</span>
          </Link>
          <Link href="/health" className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-primary">
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">건강</span>
          </Link>
          <Link href="/service" className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-gray-400 hover:text-primary transition-colors">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">예약</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
