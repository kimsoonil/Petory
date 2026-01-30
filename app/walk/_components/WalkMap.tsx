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

// 실제 지도 로직을 담당하는 내부 컴포넌트
function MapContent({
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
    console.log("[MapContent] Initializing map...", {
      mapRef: !!mapRef.current,
      kakao: !!window.kakao,
    });

    if (!mapRef.current || !window.kakao?.maps) {
      console.error(
        "[MapContent] CRITICAL: Map container or Kakao SDK missing inside MapContent",
        {
          mapRef: mapRef.current,
          kakao: window.kakao,
        },
      );
      return;
    }

    if (!map) {
      // 지도 초기화
      console.log("[MapContent] Creating new map instance");
      const kakao = window.kakao;
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
        level: 5, // 한눈에 보이게 축소 (숫자가 클수록 축소됨)
      };
      const kakaoMap = new kakao.maps.Map(container, options);
      console.log("[MapContent] Map created successfully");
      setMap(kakaoMap);
    } else {
      // 지도 중심 이동
      console.log("[MapContent] Updating map center");
      const moveLatLon = new window.kakao!.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng,
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
      imageOption,
    );

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
      image: markerImage,
    });
    marker.setMap(map);
    markersRef.current.push(marker);

    // 랜드마크 마커
    landmarks.forEach((landmark) => {
      // 마커 이미지 URL 설정
      let markerImageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 기본 (카페 - 노란색 별)

      if (landmark.type === "cafe") {
        markerImageSrc = "https://t1.daumcdn.net/mapjsapi/images/marker.png"; // 파란색 기본 마커
      }
      if (landmark.type === "hospital") {
        markerImageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png"; // 파란 점
      }
      if (landmark.type === "beauty") {
        // 미용실: 임시로 붉은색 핀 사용 (구분을 위해)
        markerImageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
      }
      if (landmark.type === "park") {
        // 공원: 파란색 B 마커 (구분을 위해)
        markerImageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png";
      }
      if (landmark.type === "restricted") {
        markerImageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 빨간색 마커
      }

      // 이미지 크기
      const mkImageSize = new kakao.maps.Size(24, 35);
      const mkImageOption = { offset: new kakao.maps.Point(12, 35) };

      const mkImage = new kakao.maps.MarkerImage(
        markerImageSrc,
        mkImageSize,
        mkImageOption,
      );

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          landmark.position.lat,
          landmark.position.lng,
        ),
        map: map,
        title: landmark.name,
        image: mkImage, // 커스텀 이미지 적용
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
            landmark.position.lng,
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
    const path = walkPath.map((pos) => new kakao.maps.LatLng(pos.lat, pos.lng));

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

  return <div ref={mapRef} className="absolute inset-0 w-full h-full" />;
}

export default function WalkMap(props: WalkMapProps) {
  return (
    // [Flow 5-1] 카카오 지도 스크립트 로더
    // KakaoMapLoader가 로딩을 완료하고 children을 렌더링할 때 MapContent가 마운트됨
    // 따라서 MapContent 내부의 useEffect가 실행될 때는 이미 window.kakao가 로드된 상태임
    <KakaoMapLoader>
      <MapContent {...props} />
    </KakaoMapLoader>
  );
}
