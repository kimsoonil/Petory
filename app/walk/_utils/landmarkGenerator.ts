import { Position, Landmark } from "../_types";

/**
 * 현재 위치 주변의 랜드마크를 생성합니다
 * @param currentPosition 현재 위치
 * @returns 랜드마크 배열
 */
export function generateNearbyLandmarks(currentPosition: Position): Landmark[] {
  const landmarks: Landmark[] = [];

  // 현재 위치 주변에 랜덤하게 랜드마크 생성 (실제 구현에서는 API를 통해 가져올 수 있음)
  const randomOffset = () => (Math.random() - 0.5) * 0.01; // 약 ±500m 범위

  // 카페들
  for (let i = 0; i < 2; i++) {
    landmarks.push({
      id: `cafe-${i}`,
      type: "cafe",
      name: `멍멍카페 ${i + 1}`,
      description: "반려동물 동반 가능한 카페입니다",
      icon: "☕",
      position: {
        lat: currentPosition.lat + randomOffset(),
        lng: currentPosition.lng + randomOffset(),
      },
    });
  }

  // 병원
  landmarks.push({
    id: "hospital-1",
    type: "hospital",
    name: "서울동물병원",
    description: "24시간 응급진료 가능",
    icon: "🏥",
    position: {
      lat: currentPosition.lat + randomOffset(),
      lng: currentPosition.lng + randomOffset(),
    },
  });

  // 출입 제한 구역
  for (let i = 0; i < 1; i++) {
    landmarks.push({
      id: `restricted-${i}`,
      type: "restricted",
      name: `출입 금지 구역 ${i + 1}`,
      description: "반려동물 출입이 제한된 구역입니다",
      icon: "🚫",
      position: {
        lat: currentPosition.lat + randomOffset(),
        lng: currentPosition.lng + randomOffset(),
      },
    });
  }

  // 미용실 추가
  landmarks.push({
    id: "beauty-1",
    type: "beauty",
    name: "스타일멍냥",
    description: "반려동물 전문 미용실",
    icon: "✂️",
    position: {
      lat: currentPosition.lat + randomOffset(),
      lng: currentPosition.lng + randomOffset(),
    },
  });

  // 공원 추가
  landmarks.push({
    id: "park-1",
    type: "park",
    name: "푸른숨 공원",
    description: "목줄 착용 필수 반려견 산책로",
    icon: "🌳",
    position: {
      lat: currentPosition.lat + randomOffset(),
      lng: currentPosition.lng + randomOffset(),
    },
  });

  return landmarks;
}
