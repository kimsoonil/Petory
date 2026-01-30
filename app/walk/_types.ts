export interface Position {
  lat: number;
  lng: number;
}

export interface Landmark {
  id: string;
  type: "cafe" | "hospital" | "restricted" | "beauty" | "park";
  name: string;
  description: string;
  icon: string;
  position: Position;
}

export interface WalkStats {
  distance: number; // 미터 단위
  time: number; // 초 단위
  points: number;
  steps?: number;
}
