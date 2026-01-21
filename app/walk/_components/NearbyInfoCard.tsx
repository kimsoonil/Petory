"use client";

import { Landmark, Position } from "@/app/walk/_types";
import { calculateDistance } from "@/app/walk/_utils/distanceCalculator";

type NearbyInfoCardProps = {
  landmarks: Landmark[];
  currentPosition: Position | null;
  onCafeClick: (landmarkId: string) => void;
};

export default function NearbyInfoCard({
  landmarks,
  currentPosition,
  onCafeClick,
}: NearbyInfoCardProps) {
  const cafes = landmarks.filter((l) => l.type === "cafe");
  const hospitals = landmarks.filter((l) => l.type === "hospital");
  const restricted = landmarks.filter((l) => l.type === "restricted");

  const handleCafeClick = () => {
    if (cafes.length > 0 && currentPosition) {
      const closest = cafes.reduce((prev, curr) => {
        const prevDist = calculateDistance(currentPosition, prev.position);
        const currDist = calculateDistance(currentPosition, curr.position);
        return currDist < prevDist ? curr : prev;
      });
      onCafeClick(closest.id);
    }
  };

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-3">주변 정보</h2>
        <div className="space-y-2">
          {cafes.length > 0 && (
            <div className="flex items-center gap-3 p-2 bg-secondary/10 rounded-lg">
              <span className="text-2xl">☕</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">카페 {cafes.length}개</p>
                <p className="text-xs text-gray-500">주변에 포인트 적립 가능한 카페가 있어요!</p>
              </div>
              <button
                onClick={handleCafeClick}
                className="text-primary text-sm font-medium"
              >
                보기
              </button>
            </div>
          )}
          {hospitals.length > 0 && (
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <span className="text-2xl">🏥</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">병원 {hospitals.length}개</p>
                <p className="text-xs text-gray-500">주변 동물병원을 확인해보세요</p>
              </div>
            </div>
          )}
          {restricted.length > 0 && (
            <div className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
              <span className="text-2xl">🚫</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">출입 제한 구역 {restricted.length}개</p>
                <p className="text-xs text-gray-500">반려동물 출입이 제한된 구역이 있어요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

