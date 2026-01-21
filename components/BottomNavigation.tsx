"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Heart, Calendar } from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
            isActive("/")
              ? "text-primary"
              : "text-gray-400 hover:text-primary"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">홈</span>
        </Link>
        <Link
          href="/walk"
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
            isActive("/walk")
              ? "text-primary"
              : "text-gray-400 hover:text-primary"
          }`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs font-medium">산책</span>
        </Link>
        <Link
          href="/health"
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
            isActive("/health")
              ? "text-primary"
              : "text-gray-400 hover:text-primary"
          }`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs font-medium">건강</span>
        </Link>
        <Link
          href="/service"
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
            isActive("/service")
              ? "text-primary"
              : "text-gray-400 hover:text-primary"
          }`}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs font-medium">예약</span>
        </Link>
      </div>
    </nav>
  );
}

