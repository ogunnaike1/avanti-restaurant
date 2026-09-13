import type { Reservation } from "./reservations";

/*
 * The house WhatsApp line. Bookings are handed to WhatsApp rather than emailed:
 * the guest's own client sends the message, so there is no mail server, no API
 * credentials and nothing to keep alive. The number lives here alone so the
 * float button, the footer, the contact page and the booking form cannot drift
 * apart.
 */

/** Digits only — wa.me wants E.164 without the leading plus. */
export const WHATSAPP_NUMBER = "2348131561562";

/** The same line, formatted for reading. */
export const WHATSAPP_DISPLAY = "+234 813 156 1562";

/** Opening line for the float button, where there is no booking to quote. */
export const WHATSAPP_GREETING =
  "Hello AVANTI — I would like to book a table.";

/** "Saturday, 20 September 2026" — shared by the message and the confirmation. */
export const longDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/**
 * The booking as the house will read it on the phone. Plain text with no
 * markdown: WhatsApp renders asterisks as bold, which would mangle a name that
 * happens to contain one.
 */
export function reservationMessage(
  reservation: Pick<
    Reservation,
    | "reference"
    | "name"
    | "date"
    | "time"
    | "guests"
    | "phone"
    | "email"
    | "notes"
  >,
) {
  const lines = [
    `NEW RESERVATION — ${reservation.reference}`,
    "",
    `Name: ${reservation.name}`,
    `Date: ${longDate(reservation.date)}`,
    `Time: ${reservation.time}`,
    `Guests: ${reservation.guests}`,
    `Phone: ${reservation.phone}`,
    `Email: ${reservation.email}`,
  ];

  if (reservation.notes) lines.push(`Notes: ${reservation.notes}`);

  return lines.join("\n");
}

/** wa.me opens the app on a phone and WhatsApp Web on a desktop. */
export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Ready-to-send link for one booking. */
export function reservationLink(
  reservation: Parameters<typeof reservationMessage>[0],
) {
  return whatsappLink(reservationMessage(reservation));
}
