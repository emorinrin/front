"use client";

import "./register.css";

export default function RegisterPage() {
  return (
    <div className="register-container">
      <h1 className="register-title">🏠 備蓄品を登録する</h1>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="itemName">備蓄品名</label>
          <input type="text" id="itemName" placeholder="例: 水、乾電池" />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">量</label>
          <input type="text" id="quantity" placeholder="例: 10L、5個" />
        </div>
        <div className="form-group">
          <label htmlFor="expiration">賞味期限</label>
          <input type="date" id="expiration" />
        </div>
        <button type="submit" className="btn">登録する</button>
      </form>
    </div>
  );
}
