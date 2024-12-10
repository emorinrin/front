"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("ロトの勇者");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // ここでユーザー名の更新処理を行う
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-blue-800 opacity-20 rounded-lg z-20"></div>
      <div className="relative p-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 relative z-30">
          <Image
            src="/hero-rank-5.png"
            alt="ヒーローアバター"
            width={96}
            height={96}
            className="pixelated"
          />
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#1c1c2e] border-[#836723] text-white"
              relative
              z-30
            />
            <Button
              type="submit"
              className="bg-[#836723] hover:bg-[#9e7d2a] text-white relative z-30"
            >
              保存
            </Button>
          </form>
        ) : (
          <>
            <h2 className="text-xl font-bold text-yellow-400 mb-2">
              {username}
            </h2>
            <p className="text-sm text-gray-300 mb-2 relative z-30">
              防災ランク6段に挑戦中
            </p>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#836723] hover:bg-[#9e7d2a] text-white relative z-30"
            >
              <Pencil className="w-4 h-4 mr-2" />
              プロフィール編集
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
