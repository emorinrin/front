"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EstimateForm() {
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [days, setDays] = useState("3");
  const [result, setResult] = useState(null); // 備蓄品リストを格納
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(null); // エラーメッセージ

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 環境変数からAPIのURLを取得
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adults: Number(adults),
          children: Number(children),
          days: Number(days),
        }),
      });

      if (!response.ok) throw new Error("備蓄品の計算に失敗しました");

      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 relative z-20">
      {/* ヘッダー */}
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

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-[#2a2a4a] p-6 rounded-lg border-2 border-[#836723]">
          {/* 大人の人数 */}
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

          {/* 子供の人数 */}
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

          {/* 備蓄日数 */}
          <div className="space-y-2">
            <label
              htmlFor="days"
              className="block text-sm font-medium text-gray-300"
            >
              備蓄日数
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

        {/* 送信ボタン */}
        <Button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white py-6 text-lg"
          disabled={loading}
        >
          {loading ? "計算中..." : "見積もり"}
        </Button>
      </form>

      {/* 結果表示 */}
      {error && <p className="text-red-500">エラー: {error}</p>}
      {result && (
        <div className="mt-8 bg-[#1c1c2e] p-6 rounded-lg border border-[#836723]">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">
            見積もり結果
          </h2>
          <ul className="space-y-2 text-gray-300">
            {result.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>
                  {item.product_name} ({item.unit})
                </span>
                <span>{item.total_quantity}個</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
