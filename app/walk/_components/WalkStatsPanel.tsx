"use client";

import { WalkStats } from "../_types";
import { Activity, Clock, Trophy } from "lucide-react";

interface WalkStatsPanelProps {
  stats: WalkStats;
}

export default function WalkStatsPanel({ stats }: WalkStatsPanelProps) {
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(2)}km`;
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    if (minutes > 0) {
      return `${minutes}분 ${secs}초`;
    }
    return `${secs}초`;
  };

  return (
    <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg z-10">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <Activity className="w-5 h-5 text-primary mb-1" />
          <p className="text-xs text-gray-500 mb-1">거리</p>
          <p className="text-lg font-bold text-gray-900">
            {formatDistance(stats.distance)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Clock className="w-5 h-5 text-primary mb-1" />
          <p className="text-xs text-gray-500 mb-1">시간</p>
          <p className="text-lg font-bold text-gray-900">
            {formatTime(stats.time)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Trophy className="w-5 h-5 text-primary mb-1" />
          <p className="text-xs text-gray-500 mb-1">포인트</p>
          <p className="text-lg font-bold text-primary">{stats.points}P</p>
        </div>
      </div>
    </div>
  );
}

