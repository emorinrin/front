import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

export default function InventoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c24] text-white font-rpg">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-2 sm:px-6 lg:px-8 max-w-7xl">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">備蓄品管理</h1>
        {/* ここに備蓄品管理の内容を追加 */}
      </main>
      <BottomNav />
    </div>
  );
}
