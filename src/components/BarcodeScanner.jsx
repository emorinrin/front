// 必要なReactとzxingライブラリをインポートします
import React, { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

// BarcodeScannerコンポーネント
export default function BarcodeScanner({ onScan }) {
  // videoタグを参照するためのuseRef
  const videoRef = useRef(null);

  // エラー表示用のステート
  const [error, setError] = useState(null);

  // バーコードスキャン後に実行される処理を定義
  const handleScan = useCallback(
    async (barcode) => {
      try {
        console.log("スキャン成功:", barcode); // デバッグ用にバーコードをログに表示

        // バーコードをAPIに送信して商品名を取得
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ReadStockpileInfo?barcode=${barcode}`
        );

        if (!response.ok) {
          throw new Error("商品が見つかりません");
        }

        // サーバーから取得した商品名を解析してonScanを呼び出す
        const data = await response.json();
        onScan(data.product_name); // 親コンポーネントに商品名を渡す
        setError(null); // エラーをクリア
      } catch (error) {
        console.error("エラー:", error); // エラー内容をログに出力
        setError(error.message || "不明なエラーが発生しました");
      }
    },
    [onScan] // onScanが変更された場合のみ処理を更新
  );

  // コンポーネントのマウント時にカメラを初期化する処理
  useEffect(() => {
    // BrowserMultiFormatReaderのインスタンスを作成
    const codeReader = new BrowserMultiFormatReader();

    // カメラを起動してバーコードを読み取る関数
    const startScanner = async () => {
      try {
        // 利用可能なカメラデバイスを取得
        const videoInputDevices = await codeReader.listVideoInputDevices();
        console.debug("カメラデバイス一覧:", videoInputDevices); // デバッグ用

        if (videoInputDevices.length === 0) {
          throw new Error("カメラデバイスが見つかりません");
        }

        // videoタグを取得
        const videoElement = videoRef.current;
        if (!videoElement) {
          throw new Error("ビデオ要素が見つかりません");
        }

        // カメラデバイスを使ってバーコードを読み取る
        await codeReader.decodeFromVideoDevice(
          videoInputDevices[0].deviceId, // 最初のカメラデバイスを使用
          videoElement, // カメラ映像を表示するvideo要素
          (result, err) => {
            if (result) {
              console.debug("デコード成功:", result.getText());
              handleScan(result.getText()); // スキャン成功時の処理
            } else if (err && !(err instanceof NotFoundException)) {
              console.error("スキャンエラー:", err); // エラーをログに出力
            }
          }
        );
      } catch (err) {
        console.error("カメラ初期化エラー:", err); // 初期化エラーをログに出力

        // エラー内容に応じてユーザーに通知
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

    // カメラを起動
    startScanner();

    // コンポーネントがアンマウントされたときにカメラをリセット
    return () => {
      codeReader.reset();
    };
  }, [handleScan]); // handleScanが変更された場合のみ処理を更新

  // UIの描画部分
  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      {/* カメラ映像を表示するvideoタグ */}
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover", // カメラ映像を適切に表示
          border: "2px solid black", // 境界線を追加してUIを見やすく
          transform: "scaleX(-1)", // 映像を左右反転
        }}
      />

      {/* エラーが発生した場合に表示するメッセージ */}
      {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}
    </div>
  );
}
