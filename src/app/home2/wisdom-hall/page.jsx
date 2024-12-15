"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { BackgroundDecoration } from "@/components/background-decoration";
import { Book, Scroll, Swords, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WisdomHall() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      id: "basics",
      title: "防災入門",
      icon: Book,
      description: "災害の種類と基本的な対策を学ぶ",
    },
    {
      id: "recovery",
      title: "日常の習慣でできる防災",
      icon: Award,
      description: "災害後の生活再建と地域の回復",
    },
    {
      id: "preparation",
      title: "出かけたついでにできる防災",
      icon: Scroll,
      description: "災害に備えるための準備方法",
    },
    {
      id: "action",
      title: "災害時の行動",
      icon: Swords,
      description: "災害発生時の適切な対応",
    },
  ];

  return (
    <div className="relative flex flex-col min-h-screen text-white font-rpg bg-[url('/field-background.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <BackgroundDecoration />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">
          知恵の遺跡
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-[#2a2a4a] border-2 border-[#836723] rounded-lg p-4 cursor-pointer transition-all hover:bg-[#3a3a5a]"
              onClick={() => setSelectedTopic(topic.id)}
            >
              <div className="flex items-center mb-2">
                <topic.icon className="w-8 h-8 text-yellow-400 mr-2" />
                <h2 className="text-xl font-bold">{topic.title}</h2>
              </div>
              <p className="text-gray-300">{topic.description}</p>
            </div>
          ))}
        </div>

        {selectedTopic && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-[#2a2a4a] border-2 border-[#836723] rounded-lg p-6 max-w-lg w-full m-4">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                {topics.find((t) => t.id === selectedTopic).title}
              </h2>
              <p className="text-gray-300 mb-4">準備はよろしいかな？</p>
              <div className="flex justify-between">
                <Link
                  href={`#`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  学習を始める
                </Link>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
