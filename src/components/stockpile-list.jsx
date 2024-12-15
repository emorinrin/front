"use client";

<<<<<<< HEAD
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
=======
import { useState, useMemo } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Droplet,
  Utensils,
  Battery,
  AmbulanceIcon as FirstAid,
} from "lucide-react";
import Link from "next/link";

const CategoryIcon = ({ category }) => {
  switch (category) {
    case "Drink":
      return <Droplet className="w-5 h-5 text-blue-500" />;
    case "Food":
      return <Utensils className="w-5 h-5 text-yellow-500" />;
    case "Energy":
      return <Battery className="w-5 h-5 text-green-500" />;
    case "Medical":
      return <FirstAid className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

export function StockpileList() {
  // サンプルデータ - 実際の実装では API から取得します
  const [items] = useState([
    {
      name: "水",
      quantity: 18,
      expirationDate: "2026/01",
      category: "Drink",
      status: "ok",
    },
    {
      name: "レトルト食品",
      quantity: 9,
      expirationDate: "2025/08",
      category: "Food",
      status: "ok",
    },
    {
      name: "缶詰",
      quantity: 3,
      expirationDate: "2024/12",
      category: "Food",
      status: "warning",
      warningMessage: "間もなく賞味期限が切れます",
    },
    {
      name: "携帯用充電器",
      quantity: 2,
      expirationDate: "2028/12",
      category: "Energy",
      status: "ok",
    },
    {
      name: "乾電池",
      quantity: 12,
      expirationDate: "2027/11",
      category: "Energy",
      status: "ok",
    },
    {
      name: "救急箱",
      quantity: 1,
      expirationDate: "2027/11",
      category: "Medical",
      status: "ok",
    },
    {
      name: "常備薬",
      quantity: 1,
      expirationDate: "2026/04",
      category: "Medical",
      status: "ok",
    },
  ]);

  const groupedItems = useMemo(() => {
    const groups = {};
    items.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [items]);

  const categoryTitles = {
    Drink: "飲料類",
    Food: "食料",
    Energy: "エネルギー",
    Medical: "医療品",
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div
          key={category}
          className="bg-[#2a2a4a] rounded-lg border-2 border-[#836723] overflow-hidden"
        >
          <h2 className="text-lg font-bold p-4 bg-black/50 flex items-center gap-2">
            <CategoryIcon category={category} />
            {categoryTitles[category]}
          </h2>
          <div className="divide-y divide-[#836723]/30">
            {categoryItems.map((item, itemIndex) => (
>>>>>>> e506ca68a8ab6bd370c99c5186f027c53f50d67a
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
<<<<<<< HEAD
                    <div>カテゴリー: {item.category}</div>
=======
>>>>>>> e506ca68a8ab6bd370c99c5186f027c53f50d67a
                    {item.warningMessage && (
                      <div className="text-red-400">{item.warningMessage}</div>
                    )}
                  </div>
                </div>
<<<<<<< HEAD
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
=======
                <div className="flex gap-2">
                  <Link
                    href={`https://www.kaunet.com/`}
                    className="bg-[#836723] hover:bg-[#9e7d2a] text-white px-4 py-2 rounded transition-colors"
                  >
                    購入
                  </Link>
                  <Link
                    href={`/home2/stockpile_registration_iteminfo`}
                    className="bg-[#836723] hover:bg-[#9e7d2a] text-white px-4 py-2 rounded transition-colors"
                  >
                    登録
                  </Link>
                </div>
>>>>>>> e506ca68a8ab6bd370c99c5186f027c53f50d67a
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
