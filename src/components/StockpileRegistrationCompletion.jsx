"use client";

import Link from "next/link"; // Linkコンポーネントをインポート

// 背景が黒、文字が白のヘッダー
export default function Header({ onClose }) {
  const handleCloseModal = () => {
    // モーダルウィンドウを閉じる処理をここに追加
    console.log("Modal closed");
    onClose(); // 親コンポーネントから渡された関数を呼び出す
  };

  return (
    <form className="max-w-md mx-auto p-4 space-y-4 text-center">
      <header className="bg-black text-white">
        <Link href="/levelup">
          <div className="container mx-auto p-4 flex items-center justify-center">
            <h1 className="text-2xl font-bold">登録完了</h1>
          </div>
        </Link>
      </header>
      <p>備品の登録が完了しました</p>
      {/* ボタン間の余白を確実に適用 */}
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="w-full p-2 rounded bg-black text-white hover:bg-black/90 transition-colors"
          onClick={handleCloseModal}
        >
          続けて登録
        </button>

        <Link href="/home2/stockpile-list">
          <button
            type="button"
            className="w-full p-2 rounded bg-black text-white hover:bg-black/90 transition-colors"
          >
            備品一覧を確認
          </button>
        </Link>
      </div>
    </form>
  );
}
