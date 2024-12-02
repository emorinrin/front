"use client";

import Link from "next/link"; // ページ遷移用
import Image from "next/image";
import "./styles/home.css"; // スタイルをインポート

export default function HomePage() {
  return (
    <div className="home-container">
      {/* ロゴ表示 */}
      <div className="logo-container">
        <Image
          src="/images/bousaiquest.png" // ロゴ画像を指定
          alt="防災クエストロゴ"
          width={150} // ロゴの幅
          height={150} // ロゴの高さ
          className="logo"
        />
      </div>

      {/* ボタン表示 */}
      <div className="button-container">
        <Link href="/signup">
          <button className="home-button">新規登録</button>
        </Link>
        <Link href="/login">
          <button className="home-button">ログイン</button>
        </Link>
      </div>
    </div>
  );
}
