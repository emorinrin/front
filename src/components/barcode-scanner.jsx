import React, { useState } from "react";
import { useZxing } from "react-zxing";

export const BarcodeScanner = ({ onResult }) => {
  const [error, setError] = useState("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      onResult(result.getText());
    },
    onError(error) {
      console.error("Barcode scanning error:", error);
      setError("バーコードのスキャンに失敗しました。もう一度お試しください。");
    },
  });

  return (
    <div className="relative">
      <video ref={ref} className="w-full" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-2 text-sm text-gray-600">
        バーコードまたはQRコードをカメラに向けてください。自動的にスキャンされます。
      </p>
    </div>
  );
};
