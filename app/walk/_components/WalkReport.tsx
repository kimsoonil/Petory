"use client";

import { WalkStats } from "../_types";
import { Trophy, MapPin, Clock } from "lucide-react";

interface WalkReportProps {
  stats: WalkStats;
  hasLandmark: boolean;
}

export default function WalkReport({ stats, hasLandmark }: WalkReportProps) {
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(2)}km`;
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
  };

  const totalPoints = hasLandmark
    ? stats.points + 500 // 카페 방문 보너스
    : stats.points;

  return (
    <div className="absolute bottom-32 left-4 right-4 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-xl z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">오늘의 산책 완료! 🎉</h3>
        {hasLandmark && (
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            카페 방문 보너스
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-white/80 mb-1">거리</p>
          <p className="text-xl font-bold">{formatDistance(stats.distance)}</p>
        </div>
        <div>
          <p className="text-xs text-white/80 mb-1">시간</p>
          <p className="text-xl font-bold">{formatTime(stats.time)}</p>
        </div>
        <div>
          <p className="text-xs text-white/80 mb-1">포인트</p>
          <p className="text-xl font-bold">{totalPoints}P</p>
        </div>
      </div>

      {hasLandmark && (
        <div className="bg-white/20 rounded-lg p-3 mb-2">
          <p className="text-sm">
            ☕ 카페 방문으로 <span className="font-bold">+500P</span> 획득!
          </p>
        </div>
      )}

      <button className="w-full bg-white text-primary py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors">
        기록 저장하기
      </button>
    </div>
  );
}

