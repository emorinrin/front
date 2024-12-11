"use client";

import { useState } from "react";
import "./../styles/estimate.css";

export default function EstimatePage() {
  const [familySize, setFamilySize] = useState(1); // 家族構成人数
  const [result, setResult] = useState(null);

  const handleEstimate = () => {
    // 簡単な見積もりロジック
    const water = familySize * 3; // 家族1人当たり3リットル
    const food = familySize * 3;  // 家族1人当たり3食
    setResult({ water, food });
  };

  return (
    <div className="estimate-container">
      <h1>備蓄品見積もり</h1>
      <div className="input-group">
        <label>家族構成 (人数):</label>
        <input
          type="number"
          min="1"
          value={familySize}
          onChange={(e) => setFamilySize(Number(e.target.value))}
        />
      </div>
      <button className="estimate-button" onClick={handleEstimate}>
        見積もり計算
      </button>
      {result && (
        <div className="result">
          <h2>見積もり結果</h2>
          <p>水: {result.water} リットル</p>
          <p>食料: {result.food} 食</p>
        </div>
      )}
    </div>
  );
}
