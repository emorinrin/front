"use client";
import { useState } from "react";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";

export function RankingSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4 relative z-30">
      <div className="bg-blue-900 rounded-lg p-4">
        <h3 className="text-center text-lg font-bold text-yellow-400 mb-4 flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5" />
          トータルランキング
          <Trophy className="w-5 h-5" />
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-1">
            <div className="text-sm text-gray-300">月間ランキング</div>
            <div className="font-bold text-xl">6040</div>
            <div className="text-xs text-gray-400">66,957人中</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm text-gray-300">年間ランキング</div>
            <div className="font-bold text-xl">42,343</div>
            <div className="text-xs text-gray-400">617,869人中</div>
          </div>
        </div>
        <button
          className="mt-4 flex justify-center items-center w-full text-yellow-400 font-bold"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>詳細を{isExpanded ? "閉じる" : "見る"}</span>
          {isExpanded ? (
            <ChevronUp className="ml-2" />
          ) : (
            <ChevronDown className="ml-2" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>総獲得ポイント</span>
              <span className="text-yellow-400">12,500 G</span>
            </div>
            <div className="flex justify-between">
              <span>連続ログイン日数</span>
              <span className="text-yellow-400">7 日</span>
            </div>
            <div className="flex justify-between">
              <span>クリアしたクエスト数</span>
              <span className="text-yellow-400">25 個</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
