"use client";

import { useState, useEffect, useMemo } from "react";
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

export function StockpileList2() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:8000/api/possessions");
        if (!response.ok) {
          throw new Error("Failed to fetch stockpile data.");
        }
        const data = await response.json();
        setItems(
          data.data.map((item) => ({
            name: item.Product_Name,
            quantity: item.Possession_count,
            expirationDate: item.Expire_Date,
            category: item.Category,
            status:
              item.Possession_count === 0
                ? "warning"
                : new Date(item.Expire_Date) < new Date()
                ? "warning"
                : "ok",
            warningMessage:
              item.Possession_count === 0
                ? "数量が不足しています"
                : new Date(item.Expire_Date) < new Date()
                ? "期限が切れています"
                : null,
          }))
        );
      } catch (err) {
        setError(err.message);
      }
    }

    fetchItems();
  }, []);

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
    Drink: "飲料",
    Food: "食品",
    Energy: "エネルギー",
    Medical: "医療品",
    Other: "その他",
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
                    {item.warningMessage && (
                      <div className="text-red-400">{item.warningMessage}</div>
                    )}
                  </div>
                </div>
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
