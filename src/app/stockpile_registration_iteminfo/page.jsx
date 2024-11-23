"use client";

import { useState } from "react";
import Header from "@/components/header";
import StockpileRegistrationBarcodeRead from "@/components/StockpileRegistrationBarcodeRead";

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    date: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Reset form after successful submission
        setFormData({
          name: "",
          quantity: "",
          date: "",
          category: "",
        });
        alert("送信成功");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("エラーが発生しました");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCameraClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      {/* Header component */}
      <Header />
      <h2 className="text-xl font-bold">備品情報登録</h2>

      <div className="space-y-2">
        <button
          type="button"
          onClick={handleCameraClick}
          className="w-full p-2 rounded bg-black text-white hover:bg-blue-400 transition-colors"
        >
          カメラを読み込む
        </button>
        <label htmlFor="file" className="block text-sm">
          ファイルをアップロード
        </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={(e) => console.log(e.target.files[0])}
          className="w-full p-2 rounded bg-gray-100 border border-gray-200"
        />
        <label htmlFor="name" className="block text-sm">
          情報登録名
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-100 border border-gray-200"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="quantity" className="block text-sm">
          数量
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          required
          value={formData.quantity}
          onChange={handleChange}
          placeholder="139"
          className="w-full p-2 rounded bg-gray-100 border border-gray-200"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm">
          買い物時期
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-100 border border-gray-200"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm">
          カテゴリ
        </label>
        <select
          id="category"
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-100 border border-gray-200"
        >
          <option value="">選択してください</option>
          <option value="food">食品</option>
          <option value="daily">日用品</option>
          <option value="other">その他</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded bg-black text-white hover:bg-black/90 transition-colors"
      >
        保存
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <StockpileRegistrationBarcodeRead />
          </div>
        </div>
      )}
    </form>
  );
}
