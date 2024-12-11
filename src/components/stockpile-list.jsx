"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export function StockpileList() {
  // サンプルデータ - 実際の実装では API から取得します
  const [categories] = useState([
    {
      title: "飲料類",
      items: [
        {
          name: "水",
          quantity: 50,
          expirationDate: "2026/01",
          category: "Water",
          status: "ok",
        },
      ],
    },
    {
      title: "炭水化物",
      items: [
        {
          name: "缶詰",
          quantity: 30,
          expirationDate: "2025/06",
          category: "Food",
          status: "warning",
          warningMessage: "5個不足",
        },
      ],
    },
    {
      title: "日用品",
      items: [
        {
          name: "電池",
          quantity: 50,
          expirationDate: "12/2028",
          category: "Medical",
          status: "ok",
        },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-[#2a2a4a] rounded-lg border-2 border-[#836723] overflow-hidden"
        >
          <h2 className="text-lg font-bold p-4 bg-black/50">
            {category.title}
          </h2>
          <div className="divide-y divide-[#836723]/30">
            {category.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.name}</span>
                    {item.status === "ok" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    <div>数量: {item.quantity}</div>
                    <div>消費期限: {item.expirationDate}</div>
                    <div>カテゴリー: {item.category}</div>
                    {item.warningMessage && (
                      <div className="text-red-400">{item.warningMessage}</div>
                    )}
                  </div>
                </div>
                <Link
                  href={`https://www.kaunet.com/`}
                  className="bg-[#836723] hover:bg-[#9e7d2a] text-white px-4 py-2 rounded transition-colors ml-4"
                >
                  購入
                </Link>
                <Link
                  href={`/home2/stockpile_registration_iteminfo`}
                  className="bg-[#836723] hover:bg-[#9e7d2a] text-white px-4 py-2 rounded transition-colors ml-4"
                >
                  登録
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
