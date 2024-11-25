import React, { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

export default function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  const handleScan = useCallback(
    async (barcode) => {
      try {
        console.log("スキャン成功:", barcode); // デバッグ用ログ
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
    const startScanner = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        if (videoInputDevices.length === 0) {
          throw new Error("カメラデバイスが見つかりません");
        }

        await codeReader.decodeFromVideoDevice(
          videoInputDevices[0].deviceId, // 最初のカメラデバイスを使用
          videoRef.current,
          (result, err) => {
            if (result) {
              handleScan(result.getText());
            } else if (err && !(err instanceof NotFoundException)) {
              console.error("スキャンエラー:", err);
            }
          }
        );
      } catch (err) {
        console.error("カメラ初期化エラー:", err.message);
        if (err.name === "NotAllowedError") {
          setError(
            "カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。"
          );
        } else if (err.name === "NotFoundError") {
          setError("使用可能なカメラが見つかりません。");
        } else {
          setError(err.message || "不明なエラーが発生しました");
        }
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
    };
  }, [handleScan]);

  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover", // カメラ映像を適切に表示
          border: "2px solid black",
        }}
      />
      {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}
    </div>
  );
}
