"use client";

import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { UserProfile } from "@/components/user-profile";
import { RankingSection } from "@/components/ranking-section";
import { PointsSection } from "@/components/points-section";
import { ActionButtons } from "@/components/action-buttons";
import { PointHistory } from "@/components/point-history";
import { AchievementBadges } from "@/components/achievement-badges";

export default function MyPage() {
  return (
    <div className="relative flex flex-col min-h-screen  pb-32">
      <div className="fixed inset-0 bg-[url('/35th2.jpg')] bg-cover"></div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-2 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <UserProfile />
            <RankingSection />
            <PointsSection />
            <PointHistory />
            <AchievementBadges />
            <ActionButtons />
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
