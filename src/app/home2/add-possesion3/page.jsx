"use client";
/* ジョーカーズのコンポーネント利用バージョン */
import { useState } from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import BarcodeScanner from "@/components/BarcodeScanner";

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

        {/* エラーメッセージ */}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        {/* 商品名入力 */}
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

        {/* 他の入力欄 */}
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

        <button
          type="submit"
          className="w-full p-3 rounded bg-[#836723] text-white hover:bg-[#9e7d2a] transition-colors"
        >
          登録
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
