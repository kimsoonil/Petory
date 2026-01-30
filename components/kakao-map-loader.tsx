"use client";

import { useEffect, useState } from "react";

interface KakaoMapLoaderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: any;
        MapMarker: any;
        Polyline: any;
        Circle: any;
        Size: any;
        Point: any;
        MarkerImage: any;
        Marker: any;
        event: any;
      };
    };
  }
}

export default function KakaoMapLoader({ children }: KakaoMapLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    console.log(
      "[KakaoMapLoader] API Key Check:",
      apiKey ? "Exists" : "Missing",
    );

    if (!apiKey) {
      setError("Kakao Map API 키가 설정되지 않았습니다.");
      setIsLoaded(true);
      return;
    }

    if (apiKey.length !== 32 || !/^[a-f0-9]+$/i.test(apiKey)) {
      console.error("[KakaoMapLoader] Invalid API Key format:", apiKey);
      setError("유효하지 않은 Kakao Map API 키입니다.");
      setIsLoaded(true);
      return;
    }

    // 이미 로드되어 있는지 확인
    if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
      console.log("[KakaoMapLoader] Kakao Maps already loaded");
      setIsLoaded(true);
      return;
    }

    // 이미 스크립트가 있는지 확인
    const existingScript = document.querySelector(
      `script[src*="dapi.kakao.com/v2/maps/sdk.js"]`,
    );

    if (existingScript) {
      console.log(
        "[KakaoMapLoader] Script already exists, waiting for load...",
      );
      // 스크립트가 이미 있으면 로드 완료를 기다림
      const checkLoaded = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            console.log(
              "[KakaoMapLoader] Kakao Maps loaded (from existing script)",
            );
            setIsLoaded(true);
            clearInterval(checkLoaded);
          });
        }
      }, 100);

      // 10초 타임아웃
      setTimeout(() => {
        clearInterval(checkLoaded);
        if (!window.kakao?.maps) {
          console.error("[KakaoMapLoader] Timeout waiting for existing script");
          setError("지도 로드 시간이 초과되었습니다.");
          setIsLoaded(true);
        }
      }, 10000);

      return () => clearInterval(checkLoaded);
    }

    // Kakao Map SDK 로드
    console.log("[KakaoMapLoader] Loading new script...");
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = false;

    script.onload = () => {
      console.log("[KakaoMapLoader] Script onload triggered");
      setTimeout(() => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            console.log("[KakaoMapLoader] Kakao Maps fully loaded");
            setIsLoaded(true);
          });
        } else {
          console.error("[KakaoMapLoader] window.kakao not found after load");
          // 로드 실패 처리?
          setError("Kakao Map 객체를 찾을 수 없습니다.");
          setIsLoaded(true);
        }
      }, 200);
    };

    script.onerror = () => {
      console.error("[KakaoMapLoader] Script load failed");
      setError("Kakao Map 스크립트 로드에 실패했습니다.");
      setIsLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // cleanup은 하지 않음
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-100 rounded-xl">
        <div className="text-center p-6">
          <p className="text-red-500 font-bold mb-2">지도 로드 오류</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
