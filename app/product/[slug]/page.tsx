"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { getProduct } from "@/lib/products";
import { formatCents } from "@/lib/store";
import { useCart } from "@/components/cart-provider";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const { addItem, itemCount } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedCartridge, setSelectedCartridge] = useState<string | undefined>(
    undefined,
  );

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      cartridgeId: selectedCartridge,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-[#FAFAFA] text-[#1A1A2E]">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-teal-700">
            &larr; Back to shop
          </Link>
        </div>
      </nav>

      <section className="px-4 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="relative h-[400px] rounded-2xl border border-gray-200 bg-gray-100 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex gap-2">
                {product.images.slice(1).map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt=""
                    width="80"
                    height="80"
                    className="rounded-xl object-cover border border-gray-200 hover:border-teal-500 cursor-pointer transition-colors"
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="text-teal-700 font-semibold text-sm tracking-wide uppercase mb-2 block">
                PulsePuzzle Base Unit
              </span>
              <h1 className="text-3xl font-serif font-bold mb-4 tracking-tight">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-6">
                <span className="text-2xl font-serif font-bold">
                  {formatCents(product.price)}
                </span>
              </div>

              {product.cartridges.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Scent cartridge pack
                  </label>
                  <div className="flex gap-3">
                    {[
                      { label: "Base unit only", id: undefined },
                      ...product.cartridges.map((c) => ({
                        label: c.scentProfile,
                        id: c.id,
                      })),
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() =>
                          setSelectedCartridge(
                            opt.id === undefined ? undefined : opt.id,
                          )
                        }
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          selectedCartridge === opt.id ||
                          (selectedCartridge === undefined && opt.id === undefined
                            ? "bg-[#D4A843] text-[#1A1A2E] border-[#D4A843]"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-300")
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-5 px-6 rounded-xl font-bold text-lg shadow-lg transition-colors ${
                  added
                    ? "bg-gray-300 text-gray-500"
                    : "bg-[#D4A843] text-[#1A1A2E] hover:bg-amber-400"
                }`}
              >
                {added ? "Added to cart" : "Add to cart"}
              </button>
              <p className="mt-3 text-xs text-gray-500 text-center">
                Cart: {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>

              <div className="mt-8 p-4 rounded-xl border border-gray-200 bg-gray-50">
                <h3 className="font-semibold mb-3">In the box</h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                  <li>PulsePuzzle base unit (4 chambers)</li>
                  <li>USB-C charging cable</li>
                  <li>Quick-start guide</li>
                  <li>
                    {selectedCartridge
                      ? `Selected scent: ${
                          product.cartridges.find(
                            (c) => c.id === selectedCartridge,
                          )?.scentProfile
                        }`
                      : "No scent cartridge (base unit only)"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Specifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="border border-gray-200 rounded-xl p-5 bg-white">
                <dt className="text-sm text-gray-500 font-medium">{key}</dt>
                <dd className="mt-1 text-gray-900 font-medium">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Safety first
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "No parts under 80mm &mdash; choking-safe",
              "IP67 sealed electronics &amp; battery",
              "FDA-compliant ABS, TPU, silicone",
            ].map((safety) => (
              <div key={safety} className="p-5 rounded-xl border border-gray-200 bg-white text-center">
                <span className="text-teal-700 text-2xl mb-3 block">
                  &#10004;
                </span>
                <p className="text-sm text-gray-600">{safety}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
