import { EstimateForm } from "@/components/estimate-form";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

export default function EstimatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c24] text-white font-rpg">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-2 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto">
          <EstimateForm />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
