"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EstimateForm() {
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [days, setDays] = useState("3");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここに見積もり計算のロジックを実装します
    console.log("Calculating estimates for:", { adults, children, days });
  };

  return (
    <div className="w-full space-y-6 relative z-20">
      <div
        className="flex items-center gap-2 p-4 rounded-lg"
        style={{
          background: "rgba(55, 65, 81, 0.3)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Shield className="h-6 w-6 text-yellow-400" />
        <h1 className="text-xl font-bold text-yellow-400">備蓄品見積もり</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-[#2a2a4a] p-6 rounded-lg border-2 border-[#836723]">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-yellow-400">家族構成</h2>
            <div className="space-y-2">
              <label
                htmlFor="adults"
                className="block text-sm font-medium text-gray-300"
              >
                大人の人数
              </label>
              <Input
                id="adults"
                type="number"
                min="0"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="bg-[#1c1c2e] border-[#836723] text-white"
                placeholder="大人の人数を入力"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="children"
                className="block text-sm font-medium text-gray-300"
              >
                子供の人数
              </label>
              <Input
                id="children"
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="bg-[#1c1c2e] border-[#836723] text-white"
                placeholder="子供の人数を入力"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-yellow-400">
              備蓄日数 <span className="text-sm font-normal">(3日推奨)</span>
            </h2>
            <div className="space-y-2">
              <label
                htmlFor="days"
                className="block text-sm font-medium text-gray-300"
              >
                日数
              </label>
              <Input
                id="days"
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="bg-[#1c1c2e] border-[#836723] text-white"
                placeholder="日数を入力"
                required
              />
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <Link href="./stockpile-list" className="block">
=======
        <Link href="./required-items" className="block">
>>>>>>> e506ca68a8ab6bd370c99c5186f027c53f50d67a
          <Button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-6 text-lg"
          >
            見積もり
          </Button>
        </Link>
      </form>
    </div>
  );
}
