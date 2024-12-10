import { LoginForm } from "@/components/login-form";
import { HeaderLogin } from "@/components/header-login";
import { BackgroundDecoration } from "@/components/background-decoration";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[url('/catch.jpg')] bg-cover text-white font-rpg">
      {/* オーバーレイ用のdivを追加 */}
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <HeaderLogin />
      <BackgroundDecoration />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
}
