import Link from "next/link";
import {
  Search,
  Plus,
  Bell,
  User,
  List,
  Calculator,
  Barcode,
  Shield,
} from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Jasime</h1>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </header>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "備品品見積もり", icon: Calculator },
            { title: "備品品登録", icon: Barcode },
            { title: "備品一覧", icon: List },
            { title: "選別所", icon: Shield },
          ].map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-3 bg-gray-100 rounded-full aspect-square w-32 h-32 mx-auto"
            >
              <item.icon className="w-6 h-6 mb-2" />
              <span className="text-xs text-center">{item.title}</span>
            </button>
          ))}
        </div>
      </main>

      <nav className="flex justify-around p-4 bg-black">
        <Link href="/" className="flex items-center justify-center w-12 h-12">
          <Search className="w-6 h-6 text-white" />
        </Link>
        <Link
          href="/pos"
          className="flex items-center justify-center w-12 h-12"
        >
          <Plus className="w-6 h-6 text-white" />
        </Link>
        <Link href="/" className="flex items-center justify-center w-12 h-12">
          <Bell className="w-6 h-6 text-white" />
        </Link>
        <Link href="/" className="flex items-center justify-center w-12 h-12">
          <User className="w-6 h-6 text-white" />
        </Link>
      </nav>
    </div>
  );
}
