import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Reservation = {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
  createdAt: string;
};

/*
 * Every booking is also written to disk, so a mail outage cannot lose one. That
 * is enough for a single long-running host; on a serverless platform, replace
 * these two file calls with a database write.
 */
const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "reservations.json");

export async function saveReservation(reservation: Reservation) {
  await mkdir(STORE_DIR, { recursive: true });

  let existing: Reservation[] = [];
  try {
    existing = JSON.parse(await readFile(STORE_FILE, "utf8")) as Reservation[];
    if (!Array.isArray(existing)) existing = [];
  } catch {
    // No store yet, or it was unreadable — start a fresh one.
  }

  existing.push(reservation);
  await writeFile(STORE_FILE, JSON.stringify(existing, null, 2), "utf8");
}
