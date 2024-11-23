// BarcodeScanner.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

export default function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

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
        onScan(data.product_name);
        setError(null);
      } catch (error) {
        console.error("エラー:", error);
        setError(error.message || "不明なエラーが発生しました");
      }
    },
    [onScan]
  );

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          handleScan(result.getText());
          codeReader.reset();
        } else if (err && !(err instanceof NotFoundException)) {
          console.error("スキャンエラー:", err);
        }
      })
      .catch((err) => console.error("初期化エラー:", err));

    return () => {
      codeReader.reset();
    };
  }, [handleScan]);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", height: "300px" }} />
      {error && <div style={{ color: "red" }}>エラー: {error}</div>}
    </div>
  );
}
