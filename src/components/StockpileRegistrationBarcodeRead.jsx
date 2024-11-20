"use client";

import Link from "next/link"; // Linkコンポーネントをインポート
import { FaArrowLeft } from "react-icons/fa"; // Reactアイコンをインポート

// 背景が黒、文字が白のヘッダー
export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto p-4 flex items-center">
        <Link href="/" aria-label="ホームに戻る">
          <button className="p-2">
            <FaArrowLeft className="text-white" />
          </button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">バーコード読み込み</h1>
      </div>
    </header>
  );
}
