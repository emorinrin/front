"use client";

import Link from "next/link"; // Linkコンポーネントをインポート
import { FaArrowLeft } from "react-icons/fa"; // Reactアイコンをインポート

// 背景が黒、文字が白のヘッダー
export default function Header() {
  const handleCloseModal = () => {
    // モーダルウィンドウを閉じる処理をここに追加
    console.log("Modal closed");
  };

  return (
    <form className="max-w-md mx-auto p-4 space-y-4">
      <header className="bg-black text-white">
        <div className="container mx-auto p-4 flex items-center">
          <Link href="/" aria-label="ホームに戻る">
            <button className="p-2">
              <FaArrowLeft className="text-white" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold ml-4">登録完了</h1>
        </div>
      </header>

      <button
        type="button"
        className="w-full p-2 rounded bg-black text-white hover:bg-black/90 transition-colors"
        onClick={handleCloseModal}
      >
        続けて登録
      </button>

      <Link href="/list">
        <button
          type="button"
          className="w-full p-2 rounded bg-black text-white hover:bg-black/90 transition-colors"
        >
          備品一覧を確認
        </button>
      </Link>
    </form>
  );
}
