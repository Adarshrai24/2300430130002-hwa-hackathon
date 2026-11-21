"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { CartItem } from "@/lib/products";

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, cartridgeId?: string) => void;
  setQuantity: (productId: string, cartridgeId?: string, quantity?: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pp_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("pp_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const keyOf = (item: CartItem) => `${item.productId}|${item.cartridgeId ?? ""}`;

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => keyOf(i) === keyOf(item));
      if (existing) {
        return prev.map((i) =>
          keyOf(i) === keyOf(item) ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((productId: string, cartridgeId?: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId || i.cartridgeId !== cartridgeId));
  }, []);

  const setQuantity = useCallback((productId: string, cartridgeId?: string, quantity: number = 1) => {
    if (quantity <= 0) {
      removeItem(productId, cartridgeId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.cartridgeId === cartridgeId
          ? { ...i, quantity }
          : i,
      ),
    );
  }, [removeItem]);

  const clear = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Build order-item shaped array for totals
  const productMap: Record<string, { price: number }> = {};
  const subtotal = items.reduce((sum, i) => {
    const price = productMap[i.productId]?.price ?? 0;
    return sum + price * i.quantity;
  }, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQuantity, clear, itemCount, subtotal, isOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
