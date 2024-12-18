import Link from "next/link";
import { Sword } from "lucide-react";

export function HeaderLogin() {
  return (
    <header className="border-b-2 border-[#836723] bg-[#2a2a4a] p-4 relative z-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="#"
          className="text-xl font-bold text-yellow-400 tracking-wide flex items-center"
        >
          <Sword className="mr-2" />
          <span>防災クエスト</span>
        </Link>
      </div>
    </header>
  );
}
