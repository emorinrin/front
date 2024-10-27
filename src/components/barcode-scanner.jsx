import React, { useState } from "react";
import { useZxing } from "react-zxing";

export const BarcodeScanner = ({ onResult }) => {
  const [error, setError] = useState(null);

  const { ref } = useZxing({
    onResult(result) {
      if (result) {
        console.log("Barcode result:", result.getText());
        onResult(result.getText());
      }
    },
    onError(err) {
      console.error("Barcode scan error:", err);
      setError(err.message);
    },
    videoConstraints: {
      facingMode: "environment", // バックカメラを優先
      width: 640,
      height: 480,
    },
  });

  return (
    <div>
      <video ref={ref} className="w-full h-auto" />
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};
