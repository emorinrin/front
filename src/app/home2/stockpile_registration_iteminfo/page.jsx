"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ルーター機能とクエリパラメータ取得用フックをインポート
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import StockpileRegistrationBarcodeRead from "@/components/StockpileRegistrationBarcodeRead";
import StockpileRegistrationCompletion from "@/components/StockpileRegistrationCompletion";

// 環境変数からAPIのURLを取得
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// データを外部APIから取得する関数
const fetchData = async (jan_code) => {
  try {
    // APIにリクエストを送信
    const response = await fetch(
      `${apiUrl}/ReadStockpileInfo/?jan_code=${jan_code}`,
      {
        method: "GET", // GETメソッドを使用
        headers: {
          "Content-Type": "application/json", // JSON形式のリクエストを送信
        },
      }
    );

    // レスポンスのステータスを確認
    if (!response.ok) {
      const errorText = await response.text();
      console.error("外部APIエラー:", errorText);
      throw new Error(`外部APIエラー: ${errorText}`);
    }

    // レスポンスデータをJSON形式で取得
    const data = await response.json();
    console.log("外部APIレスポンス:", data);

    // 必要に応じて取得したデータを返す
    return data;
  } catch (error) {
    console.error("サーバー内部エラー:", error);
    throw new Error("サーバー内部エラーが発生しました");
  }
};

export default function Component() {
  const searchParams = useSearchParams(); // クエリパラメータ取得用フックを初期化
  const jan_code = searchParams.get("jan_code"); // クエリパラメータからJANコードを取得

  // useEffectを使用してページロード時にデータを取得
  useEffect(() => {
    if (jan_code) {
      fetchData(jan_code).catch((error) => {
        console.error("ページロード時のエラー:", error);
      });
    }
  }, [jan_code]); // 依存配列にjan_codeを追加

  // フォームデータの状態を管理
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    date: "",
    category: "",
  });

  // アップロードされたファイルの状態を管理
  const [uploadedFile, setUploadedFile] = useState(null);

  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (uploadedFile) {
        const fileFormData = new FormData();
        fileFormData.append("file", uploadedFile);

        const fileResponse = await fetch(`${apiUrl}/PostStockpileImage`, {
          method: "POST",
          body: fileFormData,
        });

        if (!fileResponse.ok) {
          throw new Error(`ファイルアップロード失敗: ${fileResponse.status}`);
        }

        alert("ファイルが正常にアップロードされました");
      }

      const response = await fetch(`${apiUrl}/PutStockpileInfo/`, {
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
        setUploadedFile(null);
        alert("送信成功");
      } else {
        const errorText = await response.text();
        throw new Error(`送信失敗: ${errorText}`);
      }
    } catch (error) {
      console.error("送信エラー:", error);
      alert(`送信中にエラーが発生しました: ${error.message}`);
    }
  };

  // ファイル選択時の処理
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file); // アップロードされたファイルを保存
    }
  };

  // モーダル操作用の状態と関数
  const [BarcodeModalOpen, setBarcodeModalOpen] = useState(false);
  const handleCameraClick = () => {
    setBarcodeModalOpen(true);
  };
  const handleBarcodeCloseModal = () => {
    setBarcodeModalOpen(false);
  };

  const [CompletionModalOpen, setCompletionModalOpen] = useState(false);
  const handleCompletionClick = () => {
    setCompletionModalOpen(true);
  };
  const handleCompletionCloseModal = () => {
    setCompletionModalOpen(false);
    setFormData({
      name: "",
      quantity: "",
      date: "",
      category: "",
    });
    setUploadedFile(null);
  };

  // 入力フォームの値を管理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[url('/35th2.jpg')] bg-cover text-white font-rpg -z-20">
      <Header />
      <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
        {/* Header component */}
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
            className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
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

          <label htmlFor="name" className="block text-sm ">
            備蓄品名
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
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
<<<<<<< HEAD
            placeholder="139"
=======
            placeholder="123"
>>>>>>> e506ca68a8ab6bd370c99c5186f027c53f50d67a
            className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
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
            className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm ">
            カテゴリ
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-black"
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
              <StockpileRegistrationCompletion
                onClose={handleCompletionCloseModal}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
