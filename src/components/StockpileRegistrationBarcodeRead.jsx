"use client";

import Link from "next/link"; // Linkコンポーネントをインポート
import { FaArrowLeft } from "react-icons/fa"; // 左向き矢印アイコンをインポート

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // ボタンUIコンポーネント
import { Input } from "@/components/ui/input"; // 入力フォームUIコンポーネント
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // カードレイアウトUIコンポーネント
import BarcodeScanner from "@/components/BarcodeScanner.jsx";
import { useRouter } from "next/navigation"; // ルーティング用フック

// アプリのメインコンポーネントを定義
export default function SnackRegistrationApp() {
  const router = useRouter(); // ルーター機能を初期化
  const [step, setStep] = useState(0); // 現在のステップ（ページ）の状態
  const [itemNumber, setItemNumber] = useState(""); // 商品番号（手動入力またはスキャン結果）
  const [showScanner, setShowScanner] = useState(true); // スキャナの表示状態

  // スキャン結果を商品番号に反映する関数
  const handleScanResult = (productNumber) => {
    setItemNumber(productNumber); // 商品番号を更新
  };

  // ページ読み込み時にスキャナを自動的に起動
  useEffect(() => {
    setShowScanner(true); // スキャナを表示
  }, []);

  return (
    <div>
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
          <Card>
            <CardContent className="space-y-4">
              {/* スキャナ表示 */}
              {showScanner && (
                <div className="mt-4">
                  <BarcodeScanner onScan={handleScanResult} />
                </div>
              )}

              {/* 商品名入力 */}
              <Input
                value={itemNumber}
                onChange={(e) => setItemNumber(e.target.value)}
                placeholder="品名(手動入力も可能)"
                className="text-xl h-16 px-6 w-full"
              />
            </CardContent>
            <CardFooter className="justify-between">
              {/* 戻るボタン */}
              <Button
                variant="gray"
                onClick={() => setStep(step - 1)}
                className="text-xl px-6 py-3"
              >
                戻る
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
