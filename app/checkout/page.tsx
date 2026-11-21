"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { computeOrderTotals, formatCents, createOrder } from "@/lib/store";

type Step = 1 | 2 | 3;

const initialForm = {
  email: "",
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
  sameAsBilling: true,
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  terms: false,
};

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const { shipping, tax, total, subtotal } = computeOrderTotals(
    items.map((i) => ({ price: 8900, quantity: i.quantity })),
  );

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState(initialForm);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<{ orderNumber: string; total: number } | null>(null);
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
        <Link href="/product/pulsepuzzle" className="inline-block px-8 py-3 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl hover:bg-amber-400 transition-colors">
          Shop now
        </Link>
      </div>
    );
  }

  const shippingAddress = {
    email: form.email,
    name: form.name,
    line1: form.line1,
    line2: form.line2,
    city: form.city,
    state: form.state,
    postalCode: form.postalCode,
    country: form.country,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.terms) {
      setError("Please accept the terms and privacy policy.");
      return;
    }
    setProcessing(true);
    try {
      const newOrder = createOrder(items, shippingAddress);
      try {
        localStorage.setItem("pp_last_order", JSON.stringify(newOrder));
      } catch {
        // ignore
      }
      setOrder({ orderNumber: newOrder.orderNumber, total });
      setProcessing(false);
      setStep(3);
      clear();
    } catch {
      setProcessing(false);
      setError("Something went wrong. Please try again.");
    }
  };

  const progress = Number(step) === 1 ? 33 : Number(step) === 2 ? 66 : 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {Number(step) === 3 ? (
        <div className="text-center py-20">
          <div className="mx-auto mb-6 text-4xl text-teal-700">✓</div>
          <h2 className="text-3xl font-serif font-bold mb-4">Order placed</h2>
          <p className="text-gray-600 mb-8">
            Thank you! Your order <span className="font-mono text-teal-700 font-bold">{order?.orderNumber}</span> has been confirmed.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <span>{formatCents(order?.total ?? 0)}</span>
          </div>
          <div className="mt-12">
            <Link href={`/orders/${order?.orderNumber}`} className="inline-block px-8 py-3 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl hover:bg-amber-400 transition-colors">
              View order
            </Link>
            <Link href="/" className="ml-4 text-teal-700 font-semibold hover:underline">Continue shopping</Link>
          </div>
        </div>
      ) : (
        <>
          <nav className="flex items-center justify-between mb-8 px-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <span>{Number(step) === 1 ? "1" : "✓"}</span>
              <span>Contact &amp; shipping</span>
              <span className="h-px w-8 bg-gray-200 mx-2" aria-hidden="true"></span>
              <span>{Number(step) === 2 ? "2" : "✓"}</span>
              <span>Payment</span>
              <span className="h-px w-8 bg-gray-200 mx-2" aria-hidden="true"></span>
              <span>{Number(step) === 3 ? "3" : "○"}</span>
              <span>Review</span>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div className={`h-full rounded-full bg-teal-700 transition-all duration-300`} style={{ width: `${progress}%` }} />
            </div>
          </nav>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>
            )}

            {Number(step) === 1 && (
              <>
                <h2 className="text-2xl font-serif font-bold mb-6">Step 1: Contact &amp; shipping</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Alex Rivera"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street address</label>
                    <input
                      name="line1"
                      value={form.line1}
                      onChange={(e) => setForm({ ...form, line1: e.target.value })}
                      placeholder="123 Main Street"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apartment / unit (optional)</label>
                    <input
                      name="line2"
                      value={form.line2}
                      onChange={(e) => setForm({ ...form, line2: e.target.value })}
                      placeholder="Apt 4B"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Seattle"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      name="state"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      placeholder="WA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP code</label>
                    <input
                      name="postalCode"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      placeholder="98101"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-start gap-3">
                  <input
                    id="same-billing"
                    checked={form.sameAsBilling}
                    onChange={(e) => setForm({ ...form, sameAsBilling: e.target.checked })}
                    className="mt-0.5 w-4 h-4 text-teal-700 rounded border-gray-300 focus:ring-teal-500"
                    type="checkbox"
                  />
                  <label htmlFor="same-billing" className="text-sm text-gray-700">
                    Billing address same as shipping
                  </label>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={processing}
                    className="px-6 py-3 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
                  >
                    Continue to payment
                  </button>
                </div>
              </>
            )}

            {Number(step) === 2 && (
              <>
                <h2 className="text-2xl font-serif font-bold mb-6">Step 2: Payment</h2>
                <p className="text-sm text-gray-500 mb-6">
                  {process.env.STRIPE_SECRET_KEY ? "Secure checkout powered by Stripe" : "Demo mode &mdash; no real charges"}
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder name</label>
                    <input
                      name="cardName"
                      value={form.cardName}
                      onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                      placeholder="Alex Rivera"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                    <input
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={(e) => setForm({ ...form, cardNumber: e.target.value.replace(/\D/g, "") })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                      <input
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={(e) => setForm({ ...form, cardExpiry: e.target.value.replace(/\D/g, "") })}
                        placeholder="12/30"
                        maxLength={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input
                        name="cardCvc"
                        value={form.cardCvc}
                        onChange={(e) => setForm({ ...form, cardCvc: e.target.value.replace(/\D/g, "") })}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg border border-teal-100 bg-teal-50">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-700 flex-shrink-0">🔒</span>
                    <div className="text-sm text-teal-800">
                      <div className="font-medium">Secure payment</div>
                      <div className="text-xs">Your card details are encrypted and never stored.</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={processing}
                    className="px-6 py-3 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
                  >
                    Continue to review
                  </button>
                </div>
              </>
            )}

            {Number(step) === 3 && (
              <>
                <h2 className="text-2xl font-serif font-bold mb-6">Step 3: Review &amp; place order</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">PulsePuzzle Base Unit × {items.reduce((s, i) => s + i.quantity, 0)}</span>
                    <span className="font-medium">{formatCents(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : formatCents(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatCents(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-2">
                    <span>Total</span>
                    <span>{formatCents(total)}</span>
                  </div>
                </div>
                <div className="border rounded-xl p-4 mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Ship to</span>
                    <span>{form.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {form.line1}{form.line2 ? ", " + form.line2 : ""}<br />
                    {form.city}, {form.state} {form.postalCode}<br />
                    {form.country}
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-8">
                  <input
                    id="terms"
                    checked={form.terms}
                    onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                    className="mt-0.5 w-4 h-4 text-teal-700 rounded border-gray-300 focus:ring-teal-500"
                    type="checkbox"
                    required
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the <a href="#" className="text-teal-700 hover:underline">Terms of Service</a> and{" "}
                    <a href="#" className="text-teal-700 hover:underline">Privacy Policy</a>. I authorize PulsePuzzle to charge
                    my card for the total amount above.
                  </label>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={processing || !form.terms}
                    className="px-8 py-3 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
                  >
                    {processing ? "Placing order…" : "Place order"}
                  </button>
                </div>
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
}
