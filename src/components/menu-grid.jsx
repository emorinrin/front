"use client";

import {
  Book,
  Globe,
  Phone,
  ShieldAlert,
  Search,
  ScrollText,
} from "lucide-react";
import Link from "next/link";

export function MenuGrid() {
  return (
    <div className="space-y-6 sm:space-y-8 relative z-20">
      <section>
        <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 sm:mb-4">
          防災を学ぶ
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Link
            href="#"
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <Book className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">防災クイズ</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <ShieldAlert className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">防災訓練</span>
          </Link>
        </div>
      </section>

      <section>
        <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 sm:mb-4">
          日頃から備える
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Link
            href="./home2/estimate"
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <Search className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">備蓄品見積り</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <ScrollText className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">備蓄品登録</span>
          </Link>
        </div>
      </section>

      <section>
        <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 sm:mb-4">
          被災時に使う
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Link
            href="#"
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">SOS</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">避難所マップ</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
