"use client";

import Header from "./Header";
import Footer from "./Footer";
import RankCard from "./RankCard";
import CategoryCard from "./CategoryCard";
import "./home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <main className="main-content">
        <RankCard />

        {/* 各カテゴリ */}
        <section>
          <h2>防災を学ぶ</h2>
          <div className="category-container">
            <CategoryCard title="防災クイズ" icon="/images/quiz-icon.png" />
            <CategoryCard title="防災訓練" icon="/images/training-icon.png" />
          </div>
        </section>

        <section>
          <h2>日頃から備える</h2>
          <div className="category-container">
            <CategoryCard title="備蓄品見積もり" icon="/images/stock-estimate-icon.png" />
            <CategoryCard title="備蓄品登録" icon="/images/stock-register-icon.png" />
          </div>
        </section>

        <section>
          <h2>防災時に使う</h2>
          <div className="category-container">
            <CategoryCard title="SOS" icon="/images/sos-icon.png" />
            <CategoryCard title="避難所" icon="/images/shelter-icon.png" />
          </div>
        </section>
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}
