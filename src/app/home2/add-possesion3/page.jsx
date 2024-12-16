"use client";
/* ジョーカーズのコンポーネント利用バージョン */
import { useState } from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import BarcodeScanner from "@/components/BarcodeScanner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 環境変数からAPI URLを取得

export default function AddPossession() {
  const [formData, setFormData] = useState({
    product_name: "",
    quantity: "",
    expire_date: "",
    category: "",
  });

  const [showScanner, setShowScanner] = useState(false); // カメラ表示状態
  const [barcodeResult, setBarcodeResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // スキャン後に呼ばれる処理
  const handleScanResult = (productName) => {
    setFormData((prev) => ({
      ...prev,
      product_name: productName,
    }));
    setShowScanner(false); // 読み取り成功後にカメラを停止
  };

  // カメラのトグル動作
  const toggleScanner = () => {
    setShowScanner((prev) => !prev);
  };

  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${apiUrl}/api/possessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: formData.product_name,
          possession_count: parseInt(formData.quantity, 10),
          expire_date: formData.expire_date,
          category: formData.category,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`登録失敗: ${errorText}`);
      }

      setSuccessMessage("備蓄品が正常に登録されました！");
      setFormData({
        product_name: "",
        quantity: "",
        expire_date: "",
        category: "",
      });
    } catch (error) {
      console.error("送信エラー:", error);
      setErrorMessage(`エラーが発生しました: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[url('/35th2.jpg')] bg-cover text-white font-rpg">
      <Header />
      <div className="w-full max-w-lg mx-auto p-6 bg-black/60 rounded-lg shadow-lg mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">備蓄品登録</h1>

        {/* カメラ起動トグル */}
        <div className="text-center mb-4">
          <button
            onClick={toggleScanner}
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            {showScanner ? "カメラを停止する" : "バーコードを読み取る"}
          </button>
        </div>

        {/* バーコードスキャナ */}
        {showScanner && (
          <div className="w-full h-64 mb-4">
            <BarcodeScanner onScan={handleScanResult} />
          </div>
        )}

        {/* 成功・エラーメッセージ */}
        {successMessage && (
          <p className="text-green-500 text-center mb-2">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mb-2">{errorMessage}</p>
        )}

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 商品名 */}
          <div className="space-y-2">
            <label htmlFor="product_name" className="block text-sm">
              商品名
            </label>
            <input
              id="product_name"
              name="product_name"
              type="text"
              value={formData.product_name}
              onChange={(e) =>
                setFormData({ ...formData, product_name: e.target.value })
              }
              required
              className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
            />
          </div>

          {/* 数量 */}
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-sm">
              数量
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
              className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
            />
          </div>

          {/* 賞味期限 */}
          <div className="space-y-2">
            <label htmlFor="expire_date" className="block text-sm">
              賞味期限
            </label>
            <input
              id="expire_date"
              name="expire_date"
              type="date"
              value={formData.expire_date}
              onChange={(e) =>
                setFormData({ ...formData, expire_date: e.target.value })
              }
              required
              className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
            />
          </div>

          {/* カテゴリ */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm">
              カテゴリ
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
            >
              <option value="">選択してください</option>
              <option value="food">食品</option>
              <option value="drink">飲料</option>
              <option value="energy">エネルギー</option>
              <option value="medical">医療品</option>
              <option value="other">その他</option>
            </select>
          </div>

          {/* 登録ボタン */}
          <button
            type="submit"
            className="w-full p-3 rounded bg-[#836723] text-white hover:bg-[#9e7d2a] transition-colors"
          >
            登録
          </button>
        </form>
      </div>
      <BottomNav />
    </div>
  );
}
