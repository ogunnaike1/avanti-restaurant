import type { MetadataRoute } from "next";
import { BUSINESS_LOCATION, BUSINESS_MOTTO } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AVANTI — Fine Dining Restaurant",
    short_name: "AVANTI",
    description: `${BUSINESS_MOTTO}. Visit AVANTI in ${BUSINESS_LOCATION}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#380109",
    theme_color: "#380109",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
