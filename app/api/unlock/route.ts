import { NextResponse } from "next/server";
import { LOCK_COOKIE, lockPassword, lockToken } from "@/lib/lock";

export async function POST(request: Request) {
  const password = lockPassword();
  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const supplied = typeof body?.password === "string" ? body.password : "";

  if (password && lockToken(supplied) !== lockToken(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  if (password) {
    response.cookies.set(LOCK_COOKIE, lockToken(password), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return response;
}
