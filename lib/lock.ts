import { createHash } from "crypto";

/** Temporary site lock: active while SITE_PASSWORD is set. */
export const LOCK_COOKIE = "avanti_access";

export function lockPassword() {
  return process.env.SITE_PASSWORD || "";
}

/** What the cookie holds, so the password itself never leaves the server. */
export function lockToken(password: string) {
  return createHash("sha256").update(`avanti-lock:${password}`).digest("hex");
}
