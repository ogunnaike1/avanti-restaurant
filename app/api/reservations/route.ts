import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
 * Bookings are appended to .data/reservations.json on the server's disk. That is
 * enough for a single long-running host; on a serverless platform, swap the two
 * file calls in `save()` for a database write and an email to the house.
 */
const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "reservations.json");

const TIMES = ["12:00", "13:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8+"];

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

const asString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

function validate(body: Record<string, unknown>) {
  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const date = asString(body.date);
  const time = asString(body.time);
  const guests = asString(body.guests);
  const notes = asString(body.notes).slice(0, 500);

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please give us a name for the table.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "That email does not look right.";
  if (phone.replace(/\D/g, "").length < 7)
    errors.phone = "A phone number lets us confirm.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.date = "Choose a date.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(`${date}T00:00:00`);
    if (Number.isNaN(chosen.getTime())) errors.date = "Choose a date.";
    else if (chosen < today) errors.date = "That date has already passed.";
  }

  if (!TIMES.includes(time)) errors.time = "Choose a sitting.";
  if (!PARTY_SIZES.includes(guests)) errors.guests = "How many are joining?";

  return { errors, values: { name, email, phone, date, time, guests, notes } };
}

async function save(reservation: Reservation) {
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

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  const { errors, values } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const reservation: Reservation = {
    id: randomUUID(),
    // Short human reference the guest can quote on the phone.
    reference: `AV-${randomUUID().slice(0, 4).toUpperCase()}`,
    ...values,
    createdAt: new Date().toISOString(),
  };

  try {
    await save(reservation);
  } catch (error) {
    console.error("[reservations] could not save booking", error);
    return NextResponse.json(
      { error: "We could not record that booking. Please call the house." },
      { status: 500 },
    );
  }

  console.log(
    `[reservations] ${reservation.reference} · ${reservation.name} · ${reservation.date} ${reservation.time} · ${reservation.guests}`,
  );

  return NextResponse.json(
    {
      reference: reservation.reference,
      date: reservation.date,
      time: reservation.time,
    },
    { status: 201 },
  );
}
