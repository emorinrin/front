"use client";

import { useState } from "react";
import { ShoppingBag, Share2 } from "lucide-react";
import Link from "next/link";
import { UnderConstructionModal } from "@/components/under-construction-model";

export function ActionButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUnderConstructionClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

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
        onClick={handleUnderConstructionClick}
        className="bg-blue-900 hover:bg-blue-800 rounded-lg p-4 text-center flex flex-col items-center justify-center gap-2 transition-colors"
      >
        <Share2 className="w-6 h-6 text-yellow-400" />
        <span className="text-sm">実績投稿</span>
      </Link>

      <UnderConstructionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
