"use client";

import { useState } from "react";

export default function Component() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      // リクエストボディを取得
      const requestBody = await request.json(); // 修正ポイント
      console.log("受信したリクエストボディ:", requestBody);

      if (
        !requestBody.organization_id ||
        !Array.isArray(requestBody.purchases)
      ) {
        console.error("リクエストデータ形式が不正です:", requestBody);
        return response.json(
          { error: "リクエストデータ形式が不正です。" },
          { status: 400 }
        );
      }

      const response = await fetch(`${apiUrl}/ReadStockpileInfo/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        cache: "no-cache",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("外部APIエラー:", errorText);
        return response.json(
          { error: `外部APIエラー: ${errorText}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log("外部APIレスポンス:", data);
      return response.json(data);
    } catch (error) {
      console.error("サーバー内部エラー:", error);
      return response.json(
        { error: "サーバー内部エラーが発生しました。" },
        { status: 500 }
      );
    }
  };

  fetchData();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    date: "",
    category: "",
  });

  const [uploadedFile, setUploadedFile] = useState(null); // アップロードされたファイルの状態を管理

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/PostStockpileInfo/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file); // ファイルを状態に設定
    }
  };

  // Modal for barcode
  const [BarcodeModalOpen, setBarcodeModalOpen] = useState(false);
  const handleCameraClick = () => {
    setBarcodeModalOpen(true);
  };
  const handleBarcodeCloseModal = () => {
    setBarcodeModalOpen(false);
  };

  // Modal for completion
  const [CompletionModalOpen, setCompletionModalOpen] = useState(false);
  const handleCompletionClick = () => {
    setCompletionModalOpen(true);
  };
  const handleCompletionCloseModal = () => {
    setCompletionModalOpen(false);
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <p>バーコードから商品情報を読み取り可能です</p>

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
          onChange={handleFileUpload}
          className="w-full p-2 rounded bg-gray-100 border border-gray-200"
        />

        {/* ファイルがアップロードされていれば表示 */}
        {uploadedFile && (
          <div className="mt-4">
            <p>アップロードされたファイル:</p>
            {uploadedFile.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="アップロード画像プレビュー"
                className="w-full h-auto max-h-64 object-contain border rounded"
              />
            ) : (
              <p>{uploadedFile.name}</p> // 画像以外の場合はファイル名を表示
            )}
          </div>
        )}

        <p>登録情報を入力してください</p>

        <label htmlFor="name" className="block text-sm">
          備蓄品名
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
          賞味期限
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
        onClick={handleCompletionClick}
        className="w-full p-2 rounded bg-black text-white hover:bg-black/90 transition-colors"
      >
        登録・更新
      </button>

      {BarcodeModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBarcodeCloseModal}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <StockpileRegistrationBarcodeRead />
          </div>
        </div>
      )}
      {CompletionModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCompletionCloseModal}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <StockpileRegistrationCompletion />
          </div>
        </div>
      )}
    </form>
  );
}
