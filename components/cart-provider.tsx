"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  const writeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pp_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (writeRef.current) clearTimeout(writeRef.current);
    writeRef.current = setTimeout(() => {
      try {
        localStorage.setItem("pp_cart", JSON.stringify(items));
      } catch {
        // ignore
      }
    }, 300);
    return () => {
      if (writeRef.current) clearTimeout(writeRef.current);
    };
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

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const productPriceMap = useMemo(() => {
    const map: Record<string, number> = {};
    return map;
  }, []);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + (productPriceMap[i.productId] ?? 0) * i.quantity, 0), [items, productPriceMap]);

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
