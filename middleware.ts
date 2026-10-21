import { NextResponse, type NextRequest } from "next/server";

/**
 * Temporary site lock. While SITE_PASSWORD is set, every request needs it via
 * the browser's built-in login prompt (any username, password must match).
 * Remove SITE_PASSWORD to open the site again.
 */
export function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const supplied = decoded.slice(decoded.indexOf(":") + 1);
      if (supplied === password) return NextResponse.next();
    } catch {
      // Malformed header: fall through to the challenge.
    }
  }

  return new NextResponse("Password required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="AVANTI (private preview)"' },
  });
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
