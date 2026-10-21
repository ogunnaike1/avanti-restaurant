import { NextResponse, type NextRequest } from "next/server";

/**
 * Temporary site lock. While SITE_PASSWORD is set, visitors without the access
 * cookie are served an empty page, so none of the real page content is rendered
 * or sent; app/layout.tsx shows the password gate in its place.
 */
export async function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const data = new TextEncoder().encode(`avanti-lock:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const token = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");

  if (request.cookies.get("avanti_access")?.value === token) return NextResponse.next();
  return NextResponse.rewrite(new URL("/unlock", request.url));
}

export const config = {
  // Everything except the unlock endpoint, build assets and public files.
  matcher: "/((?!api/unlock|_next/|.*\\.[a-zA-Z0-9]+$).*)",
};
