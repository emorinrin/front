"use client";

import { useEffect, useState } from "react";

export default function PossessionList() {
  const [possessions, setPossessions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPossessions() {
      try {
        const response = await fetch("http://localhost:8000/api/possessions");
        if (!response.ok) {
          throw new Error("Failed to fetch possessions");
        }
        const data = await response.json();
        setPossessions(data.data); // データを設定
      } catch (err) {
        setError(err.message);
      }
    }

    fetchPossessions();
  }, []);

  return (
    <div>
      <h1>Possession List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {possessions.map((item) => (
          <li key={item.Possession_List_ID}>
            <strong>{item.Product_Name}</strong> - {item.Category} (
            {item.Possession_count}個, 期限: {item.Expire_Date})
          </li>
        ))}
      </ul>
    </div>
  );
}
