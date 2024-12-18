import { EstimateForm } from "@/components/estimate-form2";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

export default function EstimatePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[url('/35th2.jpg')] bg-cover text-white font-rpg pb-32">
      <div className="absolute inset-0 bg-black opacity-50"></div>
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
