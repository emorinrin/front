import React from "react";
import { useZxing } from "react-zxing";

export const BarcodeScanner = ({ onResult }) => {
  const { ref } = useZxing({
    onResult(result) {
      onResult(result.getText());
    },
  });

  return (
    <div>
      <video ref={ref} />
    </div>
  );
};
