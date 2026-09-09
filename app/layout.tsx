import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReservationProvider from "@/components/ReservationProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
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
  title: "AVANTI — Modern Classic Dining, Ibadan",
  description:
    "AVANTI — a modern classic restaurant where timeless flavours meet contemporary elegance. Reserve a table.",
  applicationName: "AVANTI",
  // What iOS uses when the site is saved to the home screen. The icon itself is
  // app/apple-icon.png, which Next links as apple-touch-icon.
  appleWebApp: {
    capable: true,
    title: "AVANTI",
    statusBarStyle: "black-translucent",
  },
  other: {
    // Next emits the modern `mobile-web-app-capable`; iOS before 16.4 needs this.
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#380109",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="overflow-x-hidden font-sans">
        <ReservationProvider>
          <Nav />
          {children}
          <Footer />
          <WhatsAppButton />
        </ReservationProvider>
      </body>
    </html>
  );
}
