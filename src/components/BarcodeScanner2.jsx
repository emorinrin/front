"use client"; // クライアントサイドでの実行を指定

import React, { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

export default function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null); // カメラ映像の表示領域
  const [error, setError] = useState(null); // エラーの状態

  // バーコードをスキャンした後の商品名を取得する関数を useCallback でメモ化
  const handleScan = useCallback(
    async (barcode) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get_product_name?barcode=${barcode}`
        );
        if (!response.ok) {
          throw new Error("商品が見つかりません");
        }
        const data = await response.json();
        if (!data.product_name) {
          throw new Error("商品名が取得できませんでした");
        }
        onScan(data.product_name); // 商品名を親コンポーネントに渡す
        setError(null); // エラーをリセット
      } catch (error) {
        if (error instanceof Error) {
          console.error("エラー:", error);
          setError(error.message); // エラーメッセージを状態に設定
        } else {
          console.error("不明なエラー:", error);
          setError("不明なエラーが発生しました"); // 不明なエラー
        }
      }
    },
    [onScan] // `onScan` を依存配列に追加
  );

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader(); // ZXingのインスタンス作成

    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          console.log("スキャン結果:", result.getText());
          handleScan(result.getText()); // バーコード番号で商品名を取得
          codeReader.reset(); // スキャンを停止
        } else if (err && !(err instanceof NotFoundException)) {
          console.error("スキャンエラー:", err);
        }
      })
      .catch((err) => console.error("初期化エラー:", err));

    return () => {
      codeReader.reset(); // コンポーネントがアンマウントされるときにリセット
    };
  }, [handleScan]); // `handleScan` を依存配列に追加

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", height: "300px" }} />
      {error && <div style={{ color: "red" }}>エラーです: {error}</div>}
    </div>
  );
}
