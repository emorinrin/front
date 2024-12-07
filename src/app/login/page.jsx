import { LoginForm } from "@/components/login-form";
import { HeaderLogin } from "@/components/header-login";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c24] text-white font-rpg">
      <HeaderLogin />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
}
