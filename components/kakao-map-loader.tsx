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
      };
    };
  }
}

export default function KakaoMapLoader({ children }: KakaoMapLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    
    if (!apiKey) {
      setIsLoaded(true);
      return;
    }

    if (apiKey.length !== 32 || !/^[a-f0-9]+$/i.test(apiKey)) {
      setIsLoaded(true);
      return;
    }

    // 이미 로드되어 있는지 확인
    if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
      setIsLoaded(true);
      return;
    }

    // 이미 스크립트가 있는지 확인
    const existingScript = document.querySelector(
      `script[src*="dapi.kakao.com/v2/maps/sdk.js"]`
    );
    
    if (existingScript) {
      // 스크립트가 이미 있으면 로드 완료를 기다림
      const checkLoaded = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            setIsLoaded(true);
            clearInterval(checkLoaded);
          });
        }
      }, 100);

      return () => clearInterval(checkLoaded);
    }

    // Kakao Map SDK 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = false;
    
    script.onload = () => {
      setTimeout(() => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            setIsLoaded(true);
          });
        } else {
          setIsLoaded(true);
        }
      }, 200);
    };

    script.onerror = () => {
      setIsLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // cleanup은 하지 않음 (다른 컴포넌트에서도 사용할 수 있음)
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }


  return <>{children}</>;
}

