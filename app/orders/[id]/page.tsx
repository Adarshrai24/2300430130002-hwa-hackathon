"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCents } from "@/lib/store";

type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  price: number;
};

type Order = {
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Record<string, string>;
};

export default function OrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pp_last_order");
      if (raw) {
        const o = JSON.parse(raw) as Order;
        if (o.orderNumber === params.id) {
          setOrder(o);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, [params.id]);

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Order not found</h2>
        <p className="text-gray-600 mb-8">We couldn&rsquo;t locate that order.</p>
        <Link href="/" className="inline-block px-8 py-3 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl hover:bg-amber-400 transition-colors">
          Shop now
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600">Loading order&hellip;</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold">Order confirmation</h2>
        <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold">Confirmed</span>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <div className="border rounded-2xl p-6 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono font-bold text-teal-700">#{order.orderNumber}</span>
              <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-3 last:border-0">
                  <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">&#128251;</div>
                  <div className="flex-1">
                    <div className="font-medium">{item.productName}</div>
                    <div className="text-sm text-gray-500">Qty {item.quantity}</div>
                  </div>
                  <span className="font-medium">{formatCents(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="mt-4 border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCents(order.subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : formatCents(order.shipping)}</span></div>
                <div className="flex justify-between text-sm"><span>Tax</span><span>{formatCents(order.tax)}</span></div>
                <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span>{formatCents(order.total)}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="border rounded-2xl p-6 bg-[#FAFAFA]">
            <h3 className="font-semibold mb-4">Shipping address</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div>{order.shippingAddress.name}</div>
              <div>{order.shippingAddress.line1}{order.shippingAddress.line2 ? ", " + order.shippingAddress.line2 : ""}</div>
              <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</div>
              <div>{order.shippingAddress.country}</div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl border border-teal-100 bg-teal-50">
            <h3 className="font-semibold mb-3">What&rsquo;s next</h3>
            <ul className="text-sm text-teal-800 space-y-2 list-disc list-inside">
              <li>Your PulsePuzzle ships within 1&ndash;2 business days.</li>
              <li>Scent cartridges arrive separately via ground shipping.</li>
              <li>Download the PulsePuzzle app to track your dog&rsquo;s progress.</li>
            </ul>
          </div>
          <div className="mt-6 flex gap-3">
            <Link href="/" className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl text-center hover:bg-gray-50 transition-colors">Continue shopping</Link>
            <Link href="/cart" className="px-5 py-3 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl text-center hover:bg-amber-400 transition-colors">Buy more cartridges</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
