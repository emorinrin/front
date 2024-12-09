"use client";

import { MenuGrid } from "@/components/menu-grid";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/35th2.jpg')] bg-cover text-white font-rpg">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-2 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto">
          <Hero rank={5} points={315} />
          <MenuGrid />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
