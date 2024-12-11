// src/app/purchase/page.js

// クライアントコンポーネントとしてマーク
"use client";

// 仕様：商品マスタ検索　を作ってみる

"use client";

import { useState } from 'react';

export default function ProductSearch() {
  const [code, setCode] = useState('');  // ユーザーが入力した商品コードを管理
  const [product, setProduct] = useState(null);  // 取得した商品情報を管理
  const [error, setError] = useState(null);  // エラーメッセージを管理
  const [quantity, setQuantity] = useState(1);  // 購入数量を管理
  const [purchaseList, setPurchaseList] = useState([]);  // 購入リストを管理

  // 商品検索APIを呼び出す関数
  const searchProduct = async () => {
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
          setError(null);    // エラーをクリア
          setQuantity(1);    // 数量を初期化
        } else {
          setProduct(null);
          setError('商品が見つかりませんでした');
        }
      } else {
        setProduct(null);
        setError('商品が見つかりませんでした');
      }
    } catch (error) {
      setProduct(null);
      setError('エラーが発生しました');
    }
  };

  // 購入リストに商品を追加する関数
  const addToPurchaseList = () => {
    if (product && quantity > 0) {
      const newProduct = { ...product, quantity };
      setPurchaseList([...purchaseList, newProduct]);  // 購入リストに商品を追加
      setProduct(null);  // 商品情報をクリア
      setCode('');  // 商品コード入力をクリア
      setQuantity(1);  // 数量をリセット
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
          <p>商品単価: {product.PRICE}</p>

          {/* 購入数量入力 */}
          <div>
            <label>購入数量: </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
            />
            <button onClick={addToPurchaseList}>購入リストに追加</button>
          </div>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 購入リスト表示 */}
      {purchaseList.length > 0 && (
        <div>
          <h2>購入リスト</h2>
          <ul>
            {purchaseList.map((item, index) => (
              <li key={index}>
                {item.NAME} - {item.quantity}個 - 合計: {item.PRICE * item.quantity}円
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
