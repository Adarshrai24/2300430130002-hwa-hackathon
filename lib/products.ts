export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // cents
  images: string[];
  specifications: Record<string, string>;
  inventory: number;
  isActive: boolean;
  cartridges: Cartridge[];
};

export type Cartridge = {
  id: string;
  scentProfile: string;
  sku: string;
  price: number; // cents
  inventory: number;
};

export type CartItem = {
  productId: string;
  cartridgeId?: string;
  quantity: number;
};

export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: Record<string, string>;
  items: OrderItem[];
  createdAt: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  cartridgeId?: string;
  quantity: number;
  price: number; // cents at time of order
};

export const PRODUCTS: Product[] = [
  {
    id: "pulsepuzzle-base",
    slug: "pulsepuzzle",
    name: "PulsePuzzle Adaptive Puzzle Feeder",
    description:
      "A modular, scent-driven puzzle feeder that adapts difficulty in real-time based on your dog's interaction patterns. Combines olfactory stimulation, mechanical problem-solving, and variable reward scheduling to keep dogs engaged for 2-4+ hours per session.",
    price: 8900,
    images: [
      "/assets/images/products/pulsepuzzle-hero.svg",
      "/assets/images/products/pulsepuzzle-side.svg",
      "/assets/images/products/pulsepuzzle-chambers.svg",
    ],
    specifications: {
      "Dimensions": "180mm × 180mm × 60mm",
      "Weight": "850g",
      "Battery life": "30 days (18650 cell, USB-C rechargeable)",
      "Chambers": "4 adaptive chambers with servo gates",
      "Scent cartridges": "4 swappable pods (chicken, beef, peanut butter, cheese, bacon, liver)",
      "Materials": "FDA-compliant ABS, TPU gates, silicone seals",
      "Safety": "ASTM F963 / EN 71, no parts < 80mm, IP67 electronics",
      "Connectivity": "ESP32, Bluetooth app companion",
    },
    inventory: 500,
    isActive: true,
    cartridges: [
      {
        id: "cartridge-chicken",
        scentProfile: "chicken",
        sku: "PP-CRT-CHKN-04",
        price: 1200,
        inventory: 200,
      },
      {
        id: "cartridge-beef",
        scentProfile: "beef",
        sku: "PP-CRT-BEEF-04",
        price: 1200,
        inventory: 200,
      },
      {
        id: "cartridge-peanutbutter",
        scentProfile: "peanut butter",
        sku: "PP-CRT-PBTR-04",
        price: 1200,
        inventory: 200,
      },
      {
        id: "cartridge-cheese",
        scentProfile: "cheese",
        sku: "PP-CRT-CHEESE-04",
        price: 1200,
        inventory: 200,
      },
      {
        id: "cartridge-bacon",
        scentProfile: "bacon",
        sku: "PP-CRT-BACON-04",
        price: 1200,
        inventory: 200,
      },
      {
        id: "cartridge-liver",
        scentProfile: "liver",
        sku: "PP-CRT-LIVER-04",
        price: 1200,
        inventory: 200,
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug && p.isActive);
}

export function getProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isActive);
}
