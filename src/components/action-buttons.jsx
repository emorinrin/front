"use client";

import { ShoppingBag, Share2 } from "lucide-react";
import Link from "next/link";

export function ActionButtons() {
  return (
    <div className="grid grid-cols-2 gap-4 relative z-30">
      <Link
        href="https://www.kaunet.com/"
        target="_blank"
        className="bg-blue-900 hover:bg-blue-800 rounded-lg p-4 text-center flex flex-col items-center justify-center gap-2 transition-colors"
      >
        <ShoppingBag className="w-6 h-6 text-yellow-400" />
        <span className="text-sm">お買い物</span>
      </Link>
      <Link
        href="/posts"
        className="bg-blue-900 hover:bg-blue-800 rounded-lg p-4 text-center flex flex-col items-center justify-center gap-2 transition-colors"
      >
        <Share2 className="w-6 h-6 text-yellow-400" />
        <span className="text-sm">実績投稿</span>
      </Link>
    </div>
  );
}
