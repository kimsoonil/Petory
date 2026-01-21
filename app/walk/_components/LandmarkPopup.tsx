"use client";

import { X } from "lucide-react";
import { Landmark } from "../_types";

interface LandmarkPopupProps {
  landmark: Landmark;
  onClose: () => void;
}

export default function LandmarkPopup({ landmark, onClose }: LandmarkPopupProps) {
  return (
    <div className="absolute top-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl z-20 animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
              landmark.type === "cafe"
                ? "bg-gradient-to-br from-secondary to-secondary-dark"
                : landmark.type === "hospital"
                ? "bg-blue-500"
                : "bg-red-500"
            }`}
          >
            {landmark.icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">
              {landmark.type === "cafe" && "멍! 주변에 포인트 보너스 존"}
              {landmark.type === "hospital" && landmark.name}
              {landmark.type === "restricted" && landmark.name}
            </h3>
            <p className="text-sm text-primary font-medium">{landmark.name}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-3">{landmark.description}</p>
      {landmark.type === "cafe" && (
        <p className="text-xs text-gray-500 mb-3">
          방문 시 500P 적립! 아메리카노 1,000원 할인 쿠폰도 받아가세요 🎁
        </p>
      )}
      <button className="w-full bg-primary text-white py-2 rounded-xl font-medium hover:bg-primary-dark transition-colors">
        {landmark.type === "cafe" ? "지금 방문하기" : "자세히 보기"}
      </button>
    </div>
  );
}

