import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderNumber } = body as { orderNumber?: string };
    if (!orderNumber) {
      return NextResponse.json({ error: "orderNumber required" }, { status: 400 });
    }
    const order = getOrder(orderNumber);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
