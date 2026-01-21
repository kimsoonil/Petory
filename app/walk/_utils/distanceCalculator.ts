import { Position } from "../_types";

/**
 * 두 지점 간의 거리를 계산합니다 (Haversine 공식 사용)
 * @param pos1 첫 번째 위치
 * @param pos2 두 번째 위치
 * @returns 거리 (미터 단위)
 */
export function calculateDistance(pos1: Position, pos2: Position): number {
  const R = 6371e3; // 지구 반지름 (미터)
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

