"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Scroll, Lock } from "lucide-react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここに実際の認証ロジックを実装します
    if (username === "hero" && password === "dragon") {
      setError("");
      alert("ログイン成功！冒険に出発しましょう！");
    } else {
      setError("ユーザー名かパスワードが間違っています。");
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] shadow-lg">
      <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
        冒険者の書
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            冒険者の名前
          </label>
          <div className="relative">
            <Scroll
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 bg-[#1c1c2e] border-[#836723] text-white"
              placeholder="ローレシア王子"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            秘密の呪文
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-[#1c1c2e] border-[#836723] text-white"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-[#836723] hover:bg-[#9e7d2a] text-white"
        >
          冒険に出発する
        </Button>
      </form>
    </div>
  );
}
