"use client";

import { Bell, Map, Volume2 } from "lucide-react";
import Link from "next/link";

export function BottomNav() {
  return (
    <nav className="border-t-2 border-[#836723] bg-[#2a2a4a] py-2 sm:py-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-around">
          <Link
            href="#"
            className="flex flex-col items-center p-2 text-yellow-400 hover:text-yellow-300"
          >
            <Volume2 className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs sm:text-sm mt-1">サイレン</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center p-2 text-yellow-400 hover:text-yellow-300"
          >
            <Map className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs sm:text-sm mt-1">ハザードマップ</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center p-2 text-yellow-400 hover:text-yellow-300"
          >
            <Bell className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs sm:text-sm mt-1">お知らせ</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}