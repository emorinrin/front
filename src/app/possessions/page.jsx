"use client";

import { useEffect, useState } from "react";

export default function PossessionList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/api/possessions");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Possession List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {data.map((item) => (
          <li key={item.Possession_List_ID}>
            {item.Product_Name} - {item.Expire_Date}
          </li>
        ))}
      </ul>
    </div>
  );
}
