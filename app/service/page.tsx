"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, Clock, Users, Car, Baby, Dog, Home, Heart, Calendar } from "lucide-react";

const filters = [
  { id: "parking", label: "주차 가능", icon: Car },
  { id: "large", label: "대형견 가능", icon: Dog },
  { id: "nokids", label: "노키즈존", icon: Baby },
];

const places = [
  {
    id: 1,
    name: "멍멍 미용실",
    type: "미용",
    rating: 4.8,
    distance: "0.5km",
    image: "✂️",
    available: true,
    slots: [
      { time: "10:00", available: true },
      { time: "11:00", available: false },
      { time: "14:00", available: true },
      { time: "15:00", available: true },
    ],
    features: ["주차 가능", "대형견 가능"],
  },
  {
    id: 2,
    name: "펫동물병원",
    type: "병원",
    rating: 4.9,
    distance: "1.2km",
    image: "🏥",
    available: true,
    slots: [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "14:00", available: false },
      { time: "15:00", available: true },
    ],
    features: ["주차 가능", "노키즈존"],
  },
  {
    id: 3,
    name: "카페 멍멍",
    type: "카페",
    rating: 4.7,
    distance: "0.8km",
    image: "☕",
    available: true,
    slots: [],
    features: ["주차 가능", "대형견 가능", "노키즈존"],
  },
];

const nearbyDogs = [
  { id: 1, name: "뽀삐", distance: "50m", emoji: "🐕" },
  { id: 2, name: "구름이", distance: "120m", emoji: "🐶" },
  { id: 3, name: "코코", distance: "200m", emoji: "🦮" },
];

export default function ServicePage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">예약 & 커뮤니티</h1>
          <Link href="/" className="text-primary font-medium text-sm">닫기</Link>
        </div>

        {/* 검색 바 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="병원, 미용실, 카페 검색..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6">
        {/* 필터 시스템 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-sm font-bold text-gray-900">필터</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 동네 친구 (커뮤니티) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">동네 친구</h2>
            <button
              onClick={() => setShowMap(!showMap)}
              className="text-sm text-primary font-medium"
            >
              {showMap ? "목록 보기" : "지도 보기"}
            </button>
          </div>
          {showMap ? (
            <div className="relative h-48 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center">
              <p className="text-sm text-gray-600">지도에 현재 산책 중인 강아지들이 표시됩니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {nearbyDogs.map((dog) => (
                <div
                  key={dog.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-2xl">
                    {dog.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{dog.name}</p>
                    <p className="text-xs text-gray-500">현재 산책 중 • {dog.distance} 거리</p>
                  </div>
                  <button className="text-primary text-sm font-medium">만나기</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 예약 가능한 장소들 */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">예약 가능한 곳</h2>
          <div className="space-y-4">
            {places.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {place.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{place.name}</h3>
                        <p className="text-sm text-gray-500">{place.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">⭐ {place.rating}</p>
                        <p className="text-xs text-gray-500">{place.distance}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {place.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    {place.available && (
                      <button
                        onClick={() =>
                          setSelectedPlace(selectedPlace === place.id ? null : place.id)
                        }
                        className="w-full bg-primary text-white py-2 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                      >
                        {selectedPlace === place.id ? "시간 선택 닫기" : "예약하기"}
                      </button>
                    )}
                  </div>
                </div>

                {/* 실시간 예약 현황 */}
                {selectedPlace === place.id && place.slots.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-medium text-gray-900">예약 가능한 시간</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {place.slots.map((slot, idx) => (
                        <button
                          key={idx}
                          disabled={!slot.available}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                            slot.available
                              ? "bg-primary text-white hover:bg-primary-dark"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
          <Link href="/health" className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-gray-400 hover:text-primary transition-colors">
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">건강</span>
          </Link>
          <Link href="/service" className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-primary">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">예약</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

