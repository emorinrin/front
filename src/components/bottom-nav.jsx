"use client";

import { useState } from "react";
import { Bell, ListTodo, UserRound, House } from "lucide-react";
import Link from "next/link";
import { UnderConstructionModal } from "@/components/under-construction-model";

export function BottomNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUnderConstructionClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t-2 border-[#836723] bg-[#2a2a4a] py-2 sm:py-4 z-30">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-around">
          <Link
            href="/home2"
            className="flex flex-col items-center p-2 text-yellow-400 hover:text-yellow-300"
          >
            <House className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs sm:text-sm mt-1">ホーム</span>
          </Link>
          {/* <Link
            href="/home2/stockpile-list"
            className="flex flex-col items-center p-2 text-yellow-400 hover:text-yellow-300"
          >
            <ListTodo className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs sm:text-sm mt-1">
              備蓄品リスト（デモ用）
            </span>
          </Link> */}
          <Link
            href="/home2/stockpile-list2"
            className="flex flex-col items-center p-2 text-yellow-400 hover:text-yellow-300"
          >
            <ListTodo className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs sm:text-sm mt-1">備蓄品リスト</span>
          </Link>
          <Link
            href="#"
            onClick={handleUnderConstructionClick}
            className="flex flex-col items-center p-2 text-yellow-400 hover:text-yellow-300"
          >
            <Bell className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs sm:text-sm mt-1">お知らせ</span>
          </Link>
          <Link
            href="/home2/mypage"
            className="flex flex-col items-center p-2 text-yellow-400 hover:text-yellow-300"
          >
            <UserRound className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs sm:text-sm mt-1">マイページ</span>
          </Link>
        </div>
      </div>
      <UnderConstructionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
}
