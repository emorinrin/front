"use client";

import Image from "next/image";
import "./login.css"; // 必要に応じてCSSファイルをインポート

export default function LoginPage() {
  return (
    <div className="login-container">
      {/* ロゴの表示 */}
      <div className="logo-container">
        <Image
          src="/images/bousaiquest.png" // ロゴ画像を指定
          alt="防災クエストロゴ"
          width={150} // 画像の幅
          height={150} // 画像の高さ
          className="logo"
        />
      </div>

      {/* ログインフォーム */}
      <form className="login-form">
        <div className="input-container">
          <label>ID:</label>
          <input type="text" placeholder="IDを入力してください" />
        </div>
        <div className="input-container">
          <label>パスワード:</label>
          <input type="password" placeholder="パスワードを入力してください" />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
