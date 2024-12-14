"use client";

import { useState, useEffect, useRef } from "react";
import { BackgroundDecoration } from "@/components/background-decoration";
import Image from "next/image";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { Volume2, VolumeX } from "lucide-react";

export default function LevelUp() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const rank = 5; // 勇者のランクを指定（例: ランク5）
  const heroImages = {
    1: "/hero-rank-1.png",
    2: "/hero-rank-2.png",
    3: "/hero-rank-3.png",
    4: "/hero-rank-4.png",
    5: "/hero-rank-5.png",
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 音量を50%に設定
      if (!isMuted) {
        audioRef.current
          .play()
          .catch((error) => console.error("Audio playback failed:", error));
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current
          .play()
          .catch((error) => console.error("Audio playback failed:", error));
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white font-rpg bg-[url('/35th2.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* 背景装飾 */}
      <BackgroundDecoration />
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 z-30">
        {/* 音声ファイル */}
        <audio ref={audioRef} src="/level-up-sound.mp3" />

        {/* ミュートボタン */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-50 bg-black bg-opacity-50 p-2 rounded-full"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

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
          <p className="text-lg mb-2">ガスコンロを てにいれた！</p>
          <p className="text-lg font-bold">勇者は レベル10に あがった！</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
