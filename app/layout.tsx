import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AVANTI — Modern Classic Dining, Lagos",
  description:
    "AVANTI — a modern classic restaurant where timeless flavours meet contemporary elegance. Reserve a table.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="overflow-x-hidden font-sans">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
