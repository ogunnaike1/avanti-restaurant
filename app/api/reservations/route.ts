import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { saveReservation, type Reservation } from "@/lib/reservations";
import { reservationLink } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIMES = ["12:00", "13:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8+"];

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

  /*
   * The guest's own WhatsApp client delivers the booking, so this write is only
   * a local convenience copy. It must never block the request: on a read-only
   * or ephemeral filesystem (Vercel and every other serverless host) it always
   * fails, and failing the request there would refuse every booking.
   */
  try {
    await saveReservation(reservation);
  } catch (error) {
    console.warn(
      `[reservations] ${reservation.reference} not written to disk`,
      error,
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
      // Built here so the message format has exactly one definition.
      whatsappUrl: reservationLink(reservation),
    },
    { status: 201 },
  );
}
