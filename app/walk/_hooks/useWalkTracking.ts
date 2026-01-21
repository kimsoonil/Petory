import { useState, useEffect, useRef } from "react";
import { Position, WalkStats } from "../_types";
import { WALK_CONFIG } from "../_constants";
import { calculateDistance } from "../_utils/distanceCalculator";

interface UseWalkTrackingReturn {
  isWalking: boolean;
  walkPath: Position[];
  walkStats: WalkStats;
  toggleWalk: () => void;
}

export function useWalkTracking(
  currentPosition: Position | null
): UseWalkTrackingReturn {
  const [isWalking, setIsWalking] = useState(false);
  const [walkPath, setWalkPath] = useState<Position[]>([]);
  const [walkStats, setWalkStats] = useState<WalkStats>({
    distance: 0,
    time: 0,
    points: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastPositionRef = useRef<Position | null>(null);

  useEffect(() => {
    if (!isWalking || !currentPosition) {
      return;
    }

    // 위치 업데이트 간격으로 산책 경로 추가
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (currentPosition) {
        setWalkPath((prev) => {
          const newPath = [...prev, currentPosition];
          
          // 거리 계산
          let totalDistance = 0;
          for (let i = 1; i < newPath.length; i++) {
            totalDistance += calculateDistance(newPath[i - 1], newPath[i]);
          }

          // 시간 계산
          const elapsedTime = startTimeRef.current
            ? Math.floor((Date.now() - startTimeRef.current) / 1000)
            : 0;

          // 포인트 계산 (거리 기반 + 카페 방문 포인트는 별도로 추가)
          const distancePoints = Math.floor(totalDistance * WALK_CONFIG.pointPerMeter);
          
          setWalkStats({
            distance: totalDistance,
            time: elapsedTime,
            points: distancePoints,
          });

          return newPath;
        });
      }
    }, WALK_CONFIG.updateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWalking, currentPosition]);

  const toggleWalk = () => {
    if (!isWalking) {
      // 산책 시작
      setIsWalking(true);
      setWalkPath(currentPosition ? [currentPosition] : []);
      startTimeRef.current = Date.now();
      lastPositionRef.current = currentPosition;
      setWalkStats({
        distance: 0,
        time: 0,
        points: 0,
      });
    } else {
      // 산책 종료
      setIsWalking(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  return {
    isWalking,
    walkPath,
    walkStats,
    toggleWalk,
  };
}

