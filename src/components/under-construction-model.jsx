"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function UnderConstructionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
      <div className="bg-[#2a2a4a] border-2 border-[#836723] rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-400">工事中</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <p className="text-white mb-4">
          この機能は現在開発中です。もうしばらくお待ちください！
        </p>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-[#836723] hover:bg-[#9e7d2a] text-white font-bold py-2 px-4 rounded"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
