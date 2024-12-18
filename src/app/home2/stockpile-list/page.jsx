"use client";

import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { StockpileList } from "@/components/stockpile-list";
import Link from "next/link";

export default function StockpileListPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/35th2.jpg')] bg-cover text-white font-rpg  pb-32">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-2 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-yellow-400">備蓄品一覧</h1>
            <div>
              <Link href="/home2/estimate">
                <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors">
                  再計算する
                </button>
              </Link>
              <Link href="/leveldown">
                <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors">
                  賞味期限放置
                </button>
              </Link>
            </div>
          </div>
          <StockpileList />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
