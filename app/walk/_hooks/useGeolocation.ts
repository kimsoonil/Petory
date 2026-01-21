import { useState, useEffect } from "react";
import { Position } from "../_types";

interface UseGeolocationReturn {
  position: Position | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation(): UseGeolocationReturn {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation이 지원되지 않습니다");
      // 기본 위치 (서울시청)
      setPosition({ lat: 37.5665, lng: 126.978 });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        setPosition({
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        // 기본 위치 (서울시청)
        setPosition({ lat: 37.5665, lng: 126.978 });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { position, loading, error };
}

