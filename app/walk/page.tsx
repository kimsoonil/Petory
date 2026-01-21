"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import { useGeolocation } from "./_hooks/useGeolocation";
import { useWalkTracking } from "./_hooks/useWalkTracking";
import { generateNearbyLandmarks } from "./_utils/landmarkGenerator";
import { calculateDistance } from "./_utils/distanceCalculator";
import WalkMap from "./_components/WalkMap";
import LandmarkPopup from "./_components/LandmarkPopup";
import WalkControls from "./_components/WalkControls";
import WalkStatsPanel from "./_components/WalkStatsPanel";
import NearbyInfoCard from "./_components/NearbyInfoCard";
import WalkReport from "./_components/WalkReport";
import { Landmark } from "./_types";
import { WALK_CONFIG } from "./_constants";

export default function WalkPage() {
  const [showLandmarkPopup, setShowLandmarkPopup] = useState<string | null>(null);
  const [map, setMap] = useState<any>(null);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);

  const { position: currentPosition, loading } = useGeolocation();
  const { isWalking, walkPath, walkStats, toggleWalk } = useWalkTracking(currentPosition);

  // 랜드마크 생성
  useEffect(() => {
    if (currentPosition) {
      const generatedLandmarks = generateNearbyLandmarks(currentPosition);
      setLandmarks(generatedLandmarks);
    }
  }, [currentPosition]);

  // 랜드마크 근처 확인 (산책 중일 때)
  useEffect(() => {
    if (!currentPosition || !isWalking) return;

    landmarks.forEach((landmark) => {
      if (landmark.type === "cafe") {
        const distance = calculateDistance(currentPosition, landmark.position);
        if (distance < WALK_CONFIG.landmarkPopupDistance && showLandmarkPopup !== landmark.id) {
          setShowLandmarkPopup(landmark.id);
        }
      }
    });
  }, [currentPosition, isWalking, landmarks, showLandmarkPopup]);

  if (loading || !currentPosition) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">위치 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const selectedLandmark = landmarks.find((l) => l.id === showLandmarkPopup);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-[10]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">산책</h1>
          <Link href="/" className="text-primary font-medium text-sm">닫기</Link>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* 지도 영역 */}
        <WalkMap
          currentPosition={currentPosition}
          walkPath={walkPath}
          landmarks={landmarks}
          map={map}
          setMap={setMap}
          onLandmarkClick={setShowLandmarkPopup}
        />

        {/* 랜드마크 팝업 */}
        {selectedLandmark && (
          <LandmarkPopup
            landmark={selectedLandmark}
            onClose={() => setShowLandmarkPopup(null)}
          />
        )}

        {/* 산책 컨트롤 */}
        <WalkControls
          isWalking={isWalking}
          map={map}
          currentPosition={currentPosition}
          onStartWalk={toggleWalk}
          onStopWalk={toggleWalk}
        />

        {/* 주변 랜드마크 정보 카드 */}
        {landmarks.length > 0 && !isWalking && !showLandmarkPopup && (
          <NearbyInfoCard
            landmarks={landmarks}
            currentPosition={currentPosition}
            onCafeClick={setShowLandmarkPopup}
          />
        )}

        {/* 산책 정보 패널 */}
        {isWalking && <WalkStatsPanel stats={walkStats} />}

        {/* 오늘의 산책 리포트 */}
        {!isWalking && walkPath.length > 0 && (
          <WalkReport stats={walkStats} hasLandmark={!!showLandmarkPopup} />
        )}
      </main>

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  );
}
