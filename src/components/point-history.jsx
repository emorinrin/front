"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function PointHistory() {
  const [isExpanded, setIsExpanded] = useState(false);

  const history = [
    { date: "2023-12-01", description: "防災クイズクリア", points: 50 },
    { date: "2023-11-28", description: "備蓄品チェック完了", points: 30 },
    { date: "2023-11-25", description: "避難訓練参加", points: 100 },
  ];

  return (
    <div className="bg-[#2a2a4a] rounded-lg p-4 border-2 border-[#836723] relative z-30">
      <button
        className="flex justify-between items-center w-full text-yellow-400 font-bold"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>ポイント履歴</span>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-2">
          {history.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm"
            >
              <span>{item.date}</span>
              <span>{item.description}</span>
              <span className="text-yellow-400">+{item.points}G </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
