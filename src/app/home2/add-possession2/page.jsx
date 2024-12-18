"use client";
/* 初期バージョン */
import { useState } from "react";
import { useZxing } from "react-zxing";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AddPossession() {
  const [formData, setFormData] = useState({
    product_name: "",
    quantity: "",
    expire_date: "",
    category: "",
  });
  const [barcodeResult, setBarcodeResult] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      setBarcodeResult(result.getText());
      fetchProductName(result.getText());
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

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

  const fetchProductName = async (janCode) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/search-product?jan_code=${janCode}`
      );
      if (!response.ok) throw new Error("商品検索APIの呼び出しに失敗しました");

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        product_name: data.product_name || "不明な商品",
      }));
    } catch (error) {
      console.error("商品検索エラー:", error);
      setErrorMessage("商品情報の取得に失敗しました。");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[url('/35th2.jpg')] bg-cover text-white font-rpg  pb-32">
      <Header />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto p-6 space-y-4 bg-black/60 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">備蓄品登録</h1>

        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

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
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
          />
        </div>

        {/* バーコード読み取り */}
        <div className="space-y-2">
          <p className="text-sm mb-2">
            カメラを使用してバーコードを読み取ります。
          </p>
          <div className="w-full h-64 bg-gray-800 rounded flex items-center justify-center">
            <video ref={ref} className="w-full h-full object-cover" />
          </div>
          {barcodeResult && (
            <p className="text-green-400">
              読み取ったJANコード: {barcodeResult}
            </p>
          )}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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

        <button
          type="submit"
          className="w-full p-3 rounded bg-[#836723] text-white hover:bg-[#9e7d2a]"
        >
          登録
        </button>
      </form>
      <BottomNav />
    </div>
  );
}
