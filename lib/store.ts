import type { CartItem, Order, OrderItem, Product } from "./products";
import { PRODUCTS } from "./products";

const TAX_RATE = 0.08;
const SHIPPING_FREE_THRESHOLD = 10000; // cents ($100)
const SHIPPING_COST = 899; // cents ($8.99)

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function computeOrderTotals(items: { price: number; quantity: number }[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}

export function buildOrderItems(
  items: CartItem[],
  products: Product[],
): OrderItem[] {
  return items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const price = product ? product.price : 0;
    return {
      id: crypto.randomUUID?.() ?? `${item.productId}-${Date.now()}`,
      productId: item.productId,
      productName: product?.name ?? "PulsePuzzle",
      cartridgeId: item.cartridgeId,
      quantity: item.quantity,
      price,
    };
  });
}

export function createOrderNumber(): string {
  return "PP-" + Math.random().toString(36).toUpperCase().slice(2, 10);
}

export function createOrder(
  items: CartItem[],
  shippingAddress: Record<string, string>,
): Order {
  const orderItems = buildOrderItems(items, PRODUCTS);
  const { subtotal, shipping, tax, total } = computeOrderTotals(orderItems);

  return {
    id: crypto.randomUUID?.() ?? `order-${Date.now()}`,
    orderNumber: createOrderNumber(),
    status: "PENDING",
    subtotal,
    tax,
    shipping,
    total,
    currency: "USD",
    shippingAddress,
    items: orderItems,
    createdAt: new Date().toISOString(),
  };
}

export { TAX_RATE, SHIPPING_FREE_THRESHOLD, SHIPPING_COST };
