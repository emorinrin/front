"use client";

import { useState } from "react";

export default function AddPossession() {
  const [formData, setFormData] = useState({
    product_name: "",
    possession_count: "",
    expire_date: "",
    category: "", // 新規追加
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/possessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const data = await response.json();
      setMessage(`Item added successfully with ID: ${data.id}`);
      setFormData({
        product_name: "",
        possession_count: "",
        expire_date: "",
        category: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Add Possession</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="text-black">
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="possession_count"
          value={formData.possession_count}
          onChange={handleChange}
          placeholder="Possession Count"
          required
        />
        <input
          type="date"
          name="expire_date"
          value={formData.expire_date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <button type="submit" className="text-white">
          Add
        </button>
      </form>
    </div>
  );
}
