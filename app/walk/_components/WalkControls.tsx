"use client";

import { Play, Square } from "lucide-react";
import { Position } from "../_types";

interface WalkControlsProps {
  isWalking: boolean;
  map: any;
  currentPosition: Position;
  onStartWalk: () => void;
  onStopWalk: () => void;
}

export default function WalkControls({
  isWalking,
  onStartWalk,
  onStopWalk,
}: WalkControlsProps) {
  return (
    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10">
      <button
        onClick={isWalking ? onStopWalk : onStartWalk}
        className={`${
          isWalking
            ? "bg-red-500 hover:bg-red-600"
            : "bg-primary hover:bg-primary-dark"
        } text-white rounded-full p-6 shadow-2xl transition-all duration-300 flex items-center justify-center ${
          isWalking ? "animate-pulse" : ""
        }`}
      >
        {isWalking ? (
          <Square className="w-8 h-8 fill-white" />
        ) : (
          <Play className="w-8 h-8 fill-white ml-1" />
        )}
      </button>
    </div>
  );
}

