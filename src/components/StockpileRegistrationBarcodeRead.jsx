"use client";

import Link from "next/link"; // Linkコンポーネントをインポート
import { FaArrowLeft } from "react-icons/fa"; // 左向き矢印アイコンをインポート

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // ボタンUIコンポーネント
import { Input } from "@/components/ui/input"; // 入力フォームUIコンポーネント
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // カードレイアウトUIコンポーネント
import BarcodeScanner from "@/components/BarcodeScanner"; // バーコードスキャナコンポーネント
import { useRouter } from "next/navigation"; // ルーティング用フック

// アプリのメインコンポーネントを定義
export default function SnackRegistrationApp() {
  const router = useRouter(); // ルーター機能を初期化
  const [step, setStep] = useState(0); // 現在のステップ（ページ）の状態
  const [itemName, setItemName] = useState(""); // 商品名（手動入力またはスキャン結果）
  const [barcodeResult, setBarcodeResult] = useState(""); // スキャナからの読み取り結果
  const [quantity, setQuantity] = useState(0); // 商品の数量
  const [items, setItems] = useState([]); // 商品リスト（複数商品を保持）
  const [showScanner, setShowScanner] = useState(false); // スキャナの表示・非表示状態

  // 次のステップに進む関数
  const nextStep = () => setStep(step + 1);

  // 前のステップに戻る関数
  const prevStep = () => setStep(step - 1);

  // 商品をリストに追加する関数
  const addItem = () => {
    setItems([
      ...items,
      { name: itemName || barcodeResult, quantity: quantity }, // 手動入力優先、無ければスキャン結果
    ]);
    setItemName(""); // 入力欄をリセット
    setQuantity(0); // 数量をリセット
    setBarcodeResult(""); // スキャン結果をリセット
  };

  // 商品をリストから削除する関数
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index)); // 指定した商品だけを除外
  };

  // スキャン結果を商品名に反映する関数
  const handleScanResult = (productName) => {
    setItemName(productName); // 商品名を更新
    setShowScanner(false); // スキャナを非表示
  };

  // 登録データをバックエンドに送信する関数
  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recieving_register`, // 環境変数からAPIのURLを取得
        {
          method: "POST", // HTTPメソッド（データ送信）
          headers: {
            "Content-Type": "application/json", // JSON形式でデータを送信
          },
          body: JSON.stringify({
            price: price, // 商品価格
            items: items, // 商品リスト
            entryDate: new Date().toISOString(), // 現在の日付（ISO形式）
          }),
        }
      );

      if (response.ok) {
        alert("登録完了！"); // 成功時のメッセージ
      } else {
        const errorData = await response.json();
        alert(`登録失敗: ${errorData.message}`); // エラーメッセージを表示
      }
    } catch (error) {
      console.error("エラーが発生しました:", error); // エラーの詳細をコンソールに表示
      alert("エラー発生しました"); // ユーザー向けメッセージ
    }
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="bg-black text-white">
        <div className="container mx-auto p-4 flex items-center">
          <Link href="/" aria-label="ホームに戻る">
            <button className="p-2">
              <FaArrowLeft className="text-white" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold ml-4">バーコード読み込み</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl">
          {/* 現在のステップに応じた表示 */}
          <Card>
            <CardContent className="space-y-4">
              {/* スキャナ起動ボタン */}
              <Button
                onClick={() => setShowScanner(true)}
                className="text-xl w-full py-3"
              >
                バーコードスキャン
              </Button>

              {/* スキャナ表示 */}
              {showScanner && (
                <div className="mt-4">
                  <BarcodeScanner onScan={handleScanResult} />
                </div>
              )}

              {/* 商品名入力 */}
              <Input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="品名(手動入力も可能)"
                className="text-xl h-16 px-6 w-full"
              />

              {/* 商品をリストに追加 */}
              <Button onClick={addItem} className="text-xl w-full py-3">
                追加
              </Button>

              {/* 商品リスト表示 */}
              <div className="mt-4 h-[200px] overflow-y-auto border p-4 rounded-md">
                <p className="text-lg font-semibold mb-2">リスト:</p>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <p className="text-xl">
                        {item.name}: {item.quantity}個
                      </p>
                      <Button
                        variant="destructive"
                        onClick={() => removeItem(index)}
                      >
                        削除
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">まだ追加されていません。</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              {/* 戻るボタン */}
              <Button
                variant="gray"
                onClick={prevStep}
                className="text-xl px-6 py-3"
              >
                戻る
              </Button>
              {/* 次へボタン */}
              <Button
                variant="gray"
                onClick={nextStep}
                className="text-xl px-6 py-3"
              >
                次へ
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
