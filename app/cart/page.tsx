"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { computeOrderTotals, formatCents } from "@/lib/store";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, setQuantity, clear, itemCount } = useCart();
  const { shipping, tax, total } = computeOrderTotals(
    items.map((i) => ({ price: 8900, quantity: i.quantity })),
  );
  const [promo, setPromo] = useState("");

  if (itemCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="mx-auto mb-8 opacity-30">&#128726;</div>
        <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-10">Add PulsePuzzle to get started.</p>
        <Link href="/product/pulsepuzzle" className="inline-block px-8 py-3 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl hover:bg-amber-400 transition-colors">
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-serif font-bold mb-8">Your cart</h2>
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {items.map((item) => (
            <div key={`${item.productId}|${item.cartridgeId}`} className="flex items-center gap-4 border-b pb-6 last:border-0">
              <div className="h-20 w-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <span className="text-sm">&#128251;</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">PulsePuzzle Base Unit</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(item.productId, item.cartridgeId, item.quantity - 1)}
                  className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"
                >
                  &#8722;
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => setQuantity(item.productId, item.cartridgeId, item.quantity + 1)}
                  className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"
                >
                  &#43;
                </button>
                <button
                  onClick={() => removeItem(item.productId, item.cartridgeId)}
                  className="ml-4 text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8 p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-600">Promo code</label>
            </div>
            <div className="flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
              <button disabled className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Order summary</h3>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({itemCount} item{itemCount > 1 ? "s" : ""})</span>
                <span className="font-medium">{formatCents(8900 * itemCount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : formatCents(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated tax</span>
                <span className="font-medium">{formatCents(tax)}</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCents(total)}</span>
              </div>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="mt-8 w-full py-4 px-6 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl text-lg shadow-lg hover:bg-amber-400 transition-colors"
            >
              Proceed to checkout
            </button>
            <button onClick={clear} className="mt-3 w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
