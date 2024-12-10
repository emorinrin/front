"use client";

import { BackgroundDecoration } from "@/components/background-decoration";
import Image from "next/image";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

export default function LevelUp() {
  const rank = 5; // 勇者のランクを指定（例: ランク5）
  const heroImages = {
    1: "/hero-rank-1.png",
    2: "/hero-rank-2.png",
    3: "/hero-rank-3.png",
    4: "/hero-rank-4.png",
    5: "/hero-rank-5.png",
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white font-rpg bg-[url('/35th2.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* 背景装飾 */}
      <BackgroundDecoration />
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 z-30">
        {/* 勇者の写真 */}
        <div className="relative w-32 h-32 mb-6 border-4 border-orange-400 shadow-lg">
          <Image
            src={heroImages[rank] || "/hero-rank-1.png"}
            layout="fill"
            objectFit="contain"
            alt={`ランク ${rank} の勇者`}
          />
        </div>

        {/* レベルアップタイトル */}
        <div className="text-4xl font-bold text-orange-400 drop-shadow-lg mb-4">
          レベルアップ!!
        </div>

        {/* コンテンツ */}
        <div className="bg-black bg-opacity-70 rounded-lg p-6 text-center max-w-lg w-full drop-shadow-md">
          <p className="text-lg mb-2">HRS(定期便)を かくとく！</p>
          <p className="text-lg mb-2">ガスコンロを てにいれた！</p>
          <p className="text-lg font-bold">勇者は レベル10に あがった！</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
