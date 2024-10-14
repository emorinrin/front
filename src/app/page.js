"use client";

import React, { useState } from "react";
import { Plus, Minus, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// サンプル商品データ
const products = [
  { id: 1, name: "コーヒー", price: 300 },
  { id: 2, name: "サンドイッチ", price: 500 },
  { id: 3, name: "サラダ", price: 450 },
  { id: 4, name: "ケーキ", price: 400 },
  { id: 5, name: "お茶", price: 250 },
];

export default function POSRegister() {
  const [cart, setCart] = useState([]);
  const [cash, setCash] = useState("");

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return currentCart.filter((item) => item.id !== productId);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const cashAmount = parseFloat(cash);
    if (isNaN(cashAmount) || cashAmount < total) {
      alert("無効な金額です");
      return;
    }
    const change = cashAmount - total;
    alert(
      `ご購入ありがとうございます！\n合計: ¥${total}\n受取金額: ¥${cashAmount}\nお釣り: ¥${change}`
    );
    setCart([]);
    setCash("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 flex">
          <div className="w-2/3 p-6 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">商品一覧</h2>
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="flex flex-col justify-between"
                >
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">¥{product.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" /> カートに追加
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          <div className="w-1/3 bg-white p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ShoppingCart className="mr-2" /> カート
            </h2>
            <ScrollArea className="flex-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <div>
                    <span className="mr-2">¥{item.price * item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold">合計:</span>
                <span className="text-xl font-bold">¥{total}</span>
              </div>
              <Input
                type="number"
                placeholder="受取金額"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
                className="mb-2"
              />
              <Button
                onClick={handleCheckout}
                className="w-full"
                disabled={cart.length === 0}
              >
                <CreditCard className="mr-2 h-4 w-4" /> 会計
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
