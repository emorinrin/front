"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Award } from "lucide-react";
import Image from "next/image";

export function AchievementBadges() {
  const [isExpanded, setIsExpanded] = useState(false);

  const badges = [
    {
      name: "初心者冒険者",
      description: "防災クエストを開始",
      image: "/badge-beginner.png",
    },
    {
      name: "備蓄マスター",
      description: "備蓄品を全てチェック",
      image: "/badge-stockpile.png",
    },
    {
      name: "避難の達人",
      description: "避難訓練に5回参加",
      image: "/badge-evacuation.png",
    },
  ];

  return (
    <div className="bg-[#2a2a4a] rounded-lg p-4 border-2 border-[#836723]">
      <button
        className="flex justify-between items-center w-full text-yellow-400 font-bold"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>実績バッジ</span>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isExpanded && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={badge.image}
                  alt={badge.name}
                  layout="fill"
                  objectFit="contain"
                  className="pixelated"
                />
              </div>
              <span className="text-xs font-bold">{badge.name}</span>
              <span className="text-xs text-gray-400">{badge.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
