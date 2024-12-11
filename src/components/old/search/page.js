// src/app/search/page.js

// クライアントコンポーネントとしてマーク
"use client";

import { useState } from 'react';

export default function ProductSearch() {
  const [code, setCode] = useState('');  // ユーザーが入力した商品コードを管理
  const [product, setProduct] = useState(null);  // 取得した商品情報を管理
  const [error, setError] = useState(null);  // エラーメッセージを管理

  // 商品検索APIを呼び出す関数
  const searchProduct = async () => {
    setError(null);  // エラーメッセージをクリア
    setProduct(null);  // 前回の検索結果をクリア

    try {
      // FastAPIサーバーの本番URLを指定
      const response = await fetch(`https://tech0-gen-7-step4-studentwebapp-pos-40-gjf6e0fafecrcnfm.eastus-01.azurewebsites.net/products/${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // 認証情報を含める
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setProduct(data);  // 商品情報を状態に設定
        } else {
          setError('商品が見つかりませんでした');
        }
      } else {
        setError('商品が見つかりませんでした (リクエストは成功しませんでした)');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  return (
    <div>
      <h1>商品マスタ検索</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="商品コードを入力"
      />
      <button onClick={searchProduct}>検索</button>

      {product && (
        <div>
          <h2>商品情報</h2>
          <p>商品一意キー: {product.PRD_ID}</p>
          <p>商品コード: {product.CODE}</p>
          <p>商品名称: {product.NAME}</p>
          <p>商品単価: ¥{product.PRICE}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}