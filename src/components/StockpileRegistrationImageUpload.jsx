"use client";

import { useState } from "react";
import Link from "next/link"; // Linkコンポーネントをインポート
import { FaArrowLeft } from "react-icons/fa"; // Reactアイコンをインポート

export default function Header() {
  const [selectedImage, setSelectedImage] = useState(null); // 選択された画像の状態

  // 画像選択時の処理
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // プレビュー用URLを生成
    }
  };

  // アップロード処理（現在はダミーアラートを使用）
  const handleUpload = () => {
    alert("画像がアップロードされました！");
  };

  return (
    <div>
      {/* 背景が黒、文字が白のヘッダー */}
      <header className="bg-black text-white">
        <div className="container mx-auto p-4 flex items-center">
          <Link href="/" aria-label="ホームに戻る">
            <button className="p-2">
              <FaArrowLeft className="text-white" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold ml-4">画像のアップロード</h1>
        </div>
      </header>

      {/* 画像アップロードセクション */}
      <div className="container mx-auto p-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          画像をアップロードしてください
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
        {selectedImage && (
          <div className="mt-4">
            <img
              src={selectedImage}
              alt="選択された画像"
              className="w-full h-auto border rounded"
            />
          </div>
        )}
        {/* アップロードボタンを中央配置 */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            アップロード
          </button>
        </div>
      </div>
    </div>
  );
}

