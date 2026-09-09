import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AVANTI — Fine Dining Restaurant",
    short_name: "AVANTI",
    description:
      "A modern classic in Old Bodija, Ibadan — where timeless flavours meet contemporary elegance.",
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
