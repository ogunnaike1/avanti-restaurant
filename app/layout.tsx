import { cookies } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Crimson_Text, Montserrat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReservationProvider from "@/components/ReservationProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BUSINESS_LOCATION, BUSINESS_MOTTO } from "@/lib/business";
import PasswordGate from "@/components/PasswordGate";
import { LOCK_COOKIE, lockPassword, lockToken } from "@/lib/lock";
import "./globals.css";

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AVANTI Restaurant — Fine Dining, Ibadan",
  description: `AVANTI Restaurant — ${BUSINESS_MOTTO} Exceptional cuisine, elegant ambiance and impeccable service in ${BUSINESS_LOCATION}. Reserve a table on WhatsApp.`,
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
  themeColor: "#580A1A",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const password = lockPassword();
  const locked =
    !!password && (await cookies()).get(LOCK_COOKIE)?.value !== lockToken(password);

  return (
    <html lang="en" className={`${crimson.variable} ${montserrat.variable}`}>
      <body className="overflow-x-hidden font-sans">
        {locked ? (
          <PasswordGate />
        ) : (
          <ReservationProvider>
            <Nav />
            {children}
            <Footer />
            <WhatsAppButton />
          </ReservationProvider>
        )}
      </body>
    </html>
  );
}
