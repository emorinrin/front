"use client";

import React, { useState } from "react";
import {
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Search,
  Camera,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BarcodeScanner } from "@/components/barcode-scanner";

export default function POSRegister() {
  const [cart, setCart] = useState([]);
  const [cash, setCash] = useState("");
  const [code, setCode] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isScanning, setIsScanning] = useState(false);

  const searchProduct = async (searchCode) => {
    try {
      const response = await fetch(
        `https://tech0-gen-7-step4-studentwebapp-pos-40-gjf6e0fafecrcnfm.eastus-01.azurewebsites.net/products/${searchCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setProduct(data);
          setError(null);
          setQuantity(1);
        } else {
          setProduct(null);
          setError("商品が見つかりませんでした");
        }
      } else {
        setProduct(null);
        setError("商品が見つかりませんでした");
      }
    } catch (error) {
      setProduct(null);
      setError("エラーが発生しました");
    }
  };

  const handleSearch = () => {
    searchProduct(code);
  };

  const handleScan = (result) => {
    if (result) {
      console.log("Scanned code:", result);
      setCode(result);
      searchProduct(result);
      setIsScanning(false);
    }
  };

  const addToCart = () => {
    if (product && quantity > 0) {
      setCart((currentCart) => {
        const existingItem = currentCart.find(
          (item) => item.PRD_ID === product.PRD_ID
        );
        if (existingItem) {
          return currentCart.map((item) =>
            item.PRD_ID === product.PRD_ID
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...currentCart, { ...product, quantity }];
      });
      setProduct(null);
      setCode("");
      setQuantity(1);
    }
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.PRD_ID === productId
      );
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map((item) =>
          item.PRD_ID === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return currentCart.filter((item) => item.PRD_ID !== productId);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.PRICE * item.quantity, 0);

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
            <h2 className="text-2xl font-bold mb-4">商品検索</h2>
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="商品コードを入力"
                className="flex-grow"
              />
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" /> 検索
              </Button>
              <Dialog open={isScanning} onOpenChange={setIsScanning}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Camera className="mr-2 h-4 w-4" /> スキャン
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>バーコードスキャン</DialogTitle>
                  </DialogHeader>
                  <BarcodeScanner onResult={handleScan} />
                </DialogContent>
              </Dialog>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {product && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>{product.NAME}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">¥{product.PRICE}</p>
                  <p>商品コード: {product.CODE}</p>
                  <p>商品一意キー: {product.PRD_ID}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value)))
                    }
                    className="w-20"
                    min="1"
                  />
                  <Button onClick={addToCart}>
                    <Plus className="mr-2 h-4 w-4" /> カートに追加
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          <div className="w-1/3 bg-white p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ShoppingCart className="mr-2" /> カート
            </h2>
            <ScrollArea className="flex-1">
              {cart.map((item) => (
                <div
                  key={item.PRD_ID}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {item.NAME} x {item.quantity}
                  </span>
                  <div>
                    <span className="mr-2">¥{item.PRICE * item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromCart(item.PRD_ID)}
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
