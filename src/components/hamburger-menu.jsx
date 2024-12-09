"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  User,
  Package,
  MessageCircle,
  LogOut,
} from "lucide-react";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Home, label: "ホーム", href: "/home2" },
    { icon: User, label: "マイページ", href: "/home2/mypage" },
    { icon: Package, label: "備蓄品管理", href: "/home2/inventory" },
    { icon: MessageCircle, label: "お問い合わせ", href: "/contact" },
    { icon: LogOut, label: "ログアウト", href: "/" },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg p-2"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <nav className="absolute top-full left-0 w-64 bg-[#2a2a4a] border-2 border-[#836723] rounded-lg shadow-lg mt-2 z-50">
          <ul className="py-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-yellow-400 hover:bg-[#3a3a5a] transition-colors"
                >
                  <item.icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
