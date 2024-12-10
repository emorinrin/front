"use client";

import { Coins } from "lucide-react";

export function PointsSection() {
  return (
    <div className="space-y-4 relative z-30">
      <h3 className="text-lg font-bold text-yellow-400">ポイントを使う</h3>
      <div className="bg-[#2a2a4a] rounded-lg p-4 border-2 border-[#836723]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-400" />
            <span className="text-sm text-gray-300">利用可能ポイント</span>
          </div>
          <div className="text-xl font-bold text-yellow-400">315 G</div>
        </div>
      </div>
    </div>
  );
}
