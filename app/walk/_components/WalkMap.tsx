"use client";

import { useEffect, useRef } from "react";
import KakaoMapLoader from "@/components/kakao-map-loader";
import { Position, Landmark } from "../_types";

interface WalkMapProps {
  currentPosition: Position;
  walkPath: Position[];
  landmarks: Landmark[];
  map: any;
  setMap: (map: any) => void;
  onLandmarkClick: (landmarkId: string) => void;
}

export default function WalkMap({
  currentPosition,
  walkPath,
  landmarks,
  map,
  setMap,
  onLandmarkClick,
}: WalkMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const circlesRef = useRef<any[]>([]);

  // [Flow 6] 지도 초기화 및 설정
  useEffect(() => {
    // 지도가 로드되지 않았거나 window.kakao 객체가 없으면 중단
    if (!mapRef.current || !window.kakao?.maps) return;

    if (!map) {
      // 지도 초기화
      const kakao = window.kakao;
      const container = mapRef.current;
      // [Flow 7] 지도 생성 (중심 좌표 및 확대 레벨 설정)
      const options = {
        center: new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(container, options);
      setMap(kakaoMap);
    } else {
      // 지도 중심 이동
      const moveLatLon = new window.kakao!.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng
      );
      map.setCenter(moveLatLon);
    }
  }, [currentPosition, map, setMap]);

  // 현재 위치 마커 표시
  useEffect(() => {
    if (!map || !window.kakao?.maps) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 현재 위치 마커
    const kakao = window.kakao;
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const imageOption = { offset: new kakao.maps.Point(12, 35) };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng
      ),
      image: markerImage,
    });
    marker.setMap(map);
    markersRef.current.push(marker);

    // 랜드마크 마커
    landmarks.forEach((landmark) => {
      let markerColor = "#FF9F43"; // 기본 (카페)
      if (landmark.type === "hospital") markerColor = "#3B82F6";
      if (landmark.type === "restricted") markerColor = "#EF4444";

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          landmark.position.lat,
          landmark.position.lng
        ),
        map: map,
        title: landmark.name,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        onLandmarkClick(landmark.id);
      });

      markersRef.current.push(marker);

      // 출입 제한 구역은 원형 오버레이 표시
      if (landmark.type === "restricted") {
        const circle = new kakao.maps.Circle({
          center: new kakao.maps.LatLng(
            landmark.position.lat,
            landmark.position.lng
          ),
          radius: 100,
          strokeWeight: 2,
          strokeColor: "#EF4444",
          strokeOpacity: 0.8,
          fillColor: "#EF4444",
          fillOpacity: 0.2,
        });
        circle.setMap(map);
        circlesRef.current.push(circle);
      }
    });

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      circlesRef.current.forEach((circle) => circle.setMap(null));
    };
  }, [map, currentPosition, landmarks, onLandmarkClick]);

  // 산책 경로 그리기
  useEffect(() => {
    if (!map || !window.kakao?.maps || walkPath.length < 2) {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
      return;
    }

    const kakao = window.kakao;
    const path = walkPath.map(
      (pos) => new kakao.maps.LatLng(pos.lat, pos.lng)
    );

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const polyline = new kakao.maps.Polyline({
      path: path,
      strokeWeight: 5,
      strokeColor: "#FF9F43",
      strokeOpacity: 0.8,
      strokeStyle: "solid",
    });

    polyline.setMap(map);
    polylineRef.current = polyline;

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, walkPath]);

  return (
    // [Flow 5-1] 카카오 지도 스크립트 로더 (스크립트 로드 완료 후 자식 컴포넌트 렌더링)
    <KakaoMapLoader>
      <div ref={mapRef} className="absolute inset-0 w-full h-full" />
    </KakaoMapLoader>
  );
}

