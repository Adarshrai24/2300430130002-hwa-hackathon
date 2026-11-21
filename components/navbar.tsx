"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function Navbar() {
  const { itemCount, openCart } = useCart();

  return (
    <nav className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-teal-700 font-bold tracking-tight">PulsePuzzle</span>
            <span className="text-xs text-teal-600 font-medium uppercase tracking-wider">engagement</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-teal-700 transition-colors">
              Cart <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-700 text-xs text-white">{itemCount}</span>
            </Link>
            <button
              onClick={openCart}
              className="text-sm font-medium text-gray-700 hover:text-teal-700 transition-colors"
            >
              View cart
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
