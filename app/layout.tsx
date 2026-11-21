import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "PulsePuzzle &mdash; Engagement that adapts to your dog.",
  description:
    "A modular, scent-driven puzzle feeder that adapts difficulty in real-time based on your dog&rsquo;s interaction patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FAFAFA] text-[#1A1A2E] antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
