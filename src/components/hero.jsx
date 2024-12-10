import Image from "next/image";
import Link from "next/link";

export function Hero({ rank, points }) {
  const heroImages = {
    1: "/hero-rank-1.png",
    2: "/hero-rank-2.png",
    3: "/hero-rank-3.png",
    4: "/hero-rank-4.png",
    5: "/hero-rank-5.png",
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-[#2a2a4a] rounded-lg border-2 border-[#836723] mb-6 sm:p-6 relative z-20">
      <Link
        href="./home2/mypage"
        className="relative w-24 h-24 sm:w-32 sm:h-32 transition-transform hover:scale-105"
        title="マイページを開く"
      >
        <Image
          src={heroImages[rank] || "/hero-rank-1.png"}
          layout="fill"
          objectFit="contain"
          alt={`ランク ${rank} の勇者`}
          className="pixelated"
        />
        <span className="sr-only">マイページを開く</span>
      </Link>
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-yellow-400">
          防災ランク{rank}級
        </h2>
        <p className="text-sm sm:text-base text-gray-300">
          ポイント: {points}G
        </p>
        <p className="text-sm sm:text-base text-gray-300">
          次のランクまで: {500 - points}G
        </p>
      </div>
    </div>
  );
}
