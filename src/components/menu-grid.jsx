"use client";

import { useState } from "react";
import {
  Castle,
  Swords,
  Search,
  ListPlus,
  Heart,
  MapPinned,
} from "lucide-react";
import Link from "next/link";
import { UnderConstructionModal } from "@/components/under-construction-model";

export function MenuGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUnderConstructionClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 relative z-20">
      <section>
        <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 sm:mb-4">
          防災を学ぶ
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Link
            href="#"
            onClick={handleUnderConstructionClick}
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <Castle className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">知恵の遺跡</span>
          </Link>
          <Link
            href="#"
            onClick={handleUnderConstructionClick}
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <Swords className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">防災クイズ</span>
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
            href="./home2/stockpile_registration_iteminfo"
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <ListPlus className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
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
            onClick={handleUnderConstructionClick}
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">安否確認</span>
          </Link>
          <Link
            href="https://map.bosai.metro.tokyo.lg.jp/en.html?p=evacuation%2Fshelter&l=1015-0%2C1017-0&ll=35.69187929999999%2C139.389038&z=10&municipalityCd=130001&bl=GOOGLE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 sm:p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] hover:bg-[#3a3a5a] transition-colors"
          >
            <MapPinned className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mb-2" />
            <span className="text-sm sm:text-base">避難所マップ</span>
          </Link>
        </div>
      </section>

      <UnderConstructionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
