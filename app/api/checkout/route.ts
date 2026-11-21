import { NextResponse } from "next/server";
import { createOrder, computeOrderTotals, buildOrderItems } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingAddress } = body as {
      items: { productId: string; cartridgeId?: string; quantity: number }[];
      shippingAddress: Record<string, string>;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const orderItems = buildOrderItems(items, PRODUCTS);
    const { subtotal, shipping, tax, total } = computeOrderTotals(orderItems);

    const order = createOrder(items, shippingAddress);

    return NextResponse.json({
      order,
      orderNumber: order.orderNumber,
      totals: { subtotal, shipping, tax, total },
      checkoutUrl: `/orders/${order.orderNumber}?success=true`,
      mode: "simulation",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
