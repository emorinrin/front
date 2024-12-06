"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b-2 border-[#836723] bg-[#2a2a4a] p-4 sm:p-6">
      <div className="container mx-auto flex items-center justify-between max-w-7xl">
        <Button variant="ghost" size="icon" className="text-yellow-400">
          <MenuIcon className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold text-yellow-400 tracking-wide">
          防災クエスト
        </h1>
        <div className="flex items-center gap-1">
          <Image
            src="/coin.png"
            width={24}
            height={24}
            alt="ポイントアイコン"
            className="text-yellow-400 sm:w-8 sm:h-8"
          />
          <span className="text-yellow-400 font-bold sm:text-lg">315P</span>
        </div>
      </div>
    </header>
  );
}
