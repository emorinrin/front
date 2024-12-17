"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Droplet,
  Utensils,
  Battery,
  AmbulanceIcon as FirstAid,
} from "lucide-react";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
  const [editingItem, setEditingItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({});
  const [error, setError] = useState("");

  // アイテムデータを取得
  const fetchItems = async () => {
    try {
      console.log(apiUrl);
      const response = await fetch(`${apiUrl}/api/possessions`);
      if (!response.ok) throw new Error("Failed to fetch stockpile data.");
      const data = await response.json();
      setItems(
        data.data.map((item) => ({
          ...item,
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
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 編集フォームの入力を更新
  const handleInputChange = (e, field) => {
    const value =
      field === "Possession_count"
        ? parseInt(e.target.value, 10)
        : e.target.value;
    setUpdatedItem({ ...updatedItem, [field]: value });
  };

  // 更新処理
  const handleUpdate = async (id) => {
    console.log("更新リクエストのID:", id); // デバッグ: 正しい数値が渡されているか確認
    const payload = {
      product_name: updatedItem.Product_Name,
      possession_count: updatedItem.Possession_count,
      expire_date: updatedItem.Expire_Date,
      category: updatedItem.category,
    };

    try {
      const response = await fetch(`${apiUrl}/api/possessions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `更新に失敗しました: ${JSON.stringify(errorResponse.detail)}`
        );
      }

      alert("更新が成功しました！");
      window.location.reload(); // データをリロード
    } catch (error) {
      console.error("更新エラー:", error);
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.Possession_List_ID}
          className="p-4 border-b bg-[#2a2a4a] rounded"
        >
          <div className="flex justify-between items-center">
            {/* 左側: 商品名、数量、期限 */}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg text-white">
                  {item.Product_Name}
                </p>
                {item.status === "ok" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>

              {/* 編集フォーム */}
              {editingItem?.Possession_List_ID === item.Possession_List_ID ? (
                <>
                  <div className="text-sm text-gray-400">
                    数量:{" "}
                    <input
                      type="number"
                      defaultValue={item.Possession_count}
                      onChange={(e) => handleInputChange(e, "Possession_count")}
                      className="bg-gray-100 text-black p-1 rounded"
                    />
                  </div>
                  <div className="text-sm text-gray-400">
                    消費期限:{" "}
                    <input
                      type="date"
                      defaultValue={item.Expire_Date}
                      onChange={(e) => handleInputChange(e, "Expire_Date")}
                      className="bg-gray-100 text-black p-1 rounded"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-400">
                    数量: {item.Possession_count}
                  </p>
                  <p className="text-sm text-gray-400">
                    消費期限: {item.Expire_Date}
                  </p>
                  {item.warningMessage && (
                    <div className="text-red-500">{item.warningMessage}</div>
                  )}
                </>
              )}
            </div>

            {/* 右側: ボタン */}
            <div className="flex gap-2">
              <Link
                href={`https://www.kaunet.com/`}
                className="bg-[#836723] hover:bg-[#9e7d2a] text-white px-4 py-2 rounded transition-colors"
              >
                購入
              </Link>
              {editingItem?.Possession_List_ID === item.Possession_List_ID ? (
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  保存
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setUpdatedItem(item);
                  }}
                  className="bg-[#836723] hover:bg-[#9e7d2a] text-white px-4 py-2 rounded transition-colors"
                >
                  編集
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
