import { LoginForm } from "@/components/login-form";
import { HeaderLogin } from "@/components/header-login";
import { BackgroundDecoration } from "@/components/background-decoration";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c24] text-white font-rpg">
      <HeaderLogin />
      <BackgroundDecoration />
      <div className="relative w-full h-40 my-4">
        <Image
          src="/title.png"
          alt="タイトル"
          layout="fill"
          objectFit="contain"
          className="pixelated"
        />
      </div>
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
}
