"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import {
  Droplet,
  Utensils,
  Battery,
  AmbulanceIcon as FirstAid,
  Plus,
  PenLine,
} from "lucide-react";
import Link from "next/link";

const CategoryIcon = ({ category }) => {
  switch (category) {
    case "Water":
      return <Droplet className="w-6 h-6 text-blue-400" />;
    case "Food":
      return <Utensils className="w-6 h-6 text-yellow-400" />;
    case "Energy":
      return <Battery className="w-6 h-6 text-green-400" />;
    case "Medical":
      return <FirstAid className="w-6 h-6 text-red-400" />;
    default:
      return null;
  }
};

export default function RequiredItems() {
  // この例では、APIからデータを取得する代わりにハードコードしています
  const [categories] = useState([
    {
      title: "飲料類",
      items: [
        {
          name: "水",
          requiredQuantity: 18,
          currentQuantity: 0,
          unit: "L",
          category: "Water",
        },
      ],
    },
    {
      title: "食料",
      items: [
        {
          name: "レトルト食品",
          requiredQuantity: 9,
          currentQuantity: 0,
          unit: "個",
          category: "Food",
        },
        {
          name: "缶詰",
          requiredQuantity: 3,
          currentQuantity: 0,
          unit: "缶",
          category: "Food",
        },
      ],
    },
    {
      title: "エネルギー",
      items: [
        {
          name: "ガスコンロ",
          requiredQuantity: 1,
          currentQuantity: 0,
          unit: "個",
          category: "Energy",
        },
        {
          name: "携帯用充電器",
          requiredQuantity: 2,
          currentQuantity: 0,
          unit: "個",
          category: "Energy",
        },
        {
          name: "乾電池",
          requiredQuantity: 12,
          currentQuantity: 0,
          unit: "本",
          category: "Energy",
        },
      ],
    },
    {
      title: "医療品",
      items: [
        {
          name: "救急箱",
          requiredQuantity: 1,
          currentQuantity: 0,
          unit: "セット",
          category: "Medical",
        },
        {
          name: "常備薬",
          requiredQuantity: 1,
          currentQuantity: 0,
          unit: "セット",
          category: "Medical",
        },
      ],
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[url('/35th2.jpg')] bg-cover text-white font-rpg">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">
          必要な備蓄品リスト
        </h1>
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
                    <div className="flex items-center space-x-4">
                      <CategoryIcon category={item.category} />
                      <div>
                        <div className="text-lg">{item.name}</div>
                        <div className="text-sm text-gray-400">
                          必要数: {item.requiredQuantity} {item.unit}
                        </div>
                        <div className="text-sm text-gray-400">
                          現在の在庫: {item.currentQuantity} {item.unit}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`https://www.kaunet.com/`}
                      target="_blank"
                      className="bg-[#836723] hover:bg-[#9e7d2a] text-white p-2 rounded transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link href="/home2/stockpile-list" className="flex justify-end py-4">
          <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <PenLine className="w-5 h-5" />
            <span>備蓄品リストへ反映</span>
          </button>
        </Link>
      </main>
      <BottomNav />
    </div>
  );
}
