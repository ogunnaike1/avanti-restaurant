import nodemailer, { type Transporter } from "nodemailer";
import type { Reservation } from "./reservations";

/*
 * Booking mail. Configure with SMTP credentials from whatever hosts the
 * restaurant's mailbox (Google Workspace, Zoho, cPanel …) — see .env.example.
 * With nothing configured the site still records bookings to disk and simply
 * logs that no mail was sent, so local development needs no credentials.
 */
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  SMTP_FROM,
  RESERVATIONS_EMAIL,
} = process.env;

export const mailConfigured = Boolean(SMTP_HOST && RESERVATIONS_EMAIL);

let transporter: Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      // Port 465 is implicit TLS; 587 upgrades with STARTTLS.
      secure: SMTP_SECURE
        ? SMTP_SECURE === "true"
        : Number(SMTP_PORT ?? 587) === 465,
      // A relay that needs no credentials (e.g. a local capture server) is fine.
      auth:
        SMTP_USER && SMTP_PASS
          ? { user: SMTP_USER, pass: SMTP_PASS }
          : undefined,
    });
  }
  return transporter;
}

const longDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function body(reservation: Reservation) {
  const rows: [string, string][] = [
    ["Name", reservation.name],
    ["Date", longDate(reservation.date)],
    ["Time", reservation.time],
    ["Guests", reservation.guests],
    ["Phone", reservation.phone],
    ["Email", reservation.email],
    ["Notes", reservation.notes || "—"],
    ["Reference", reservation.reference],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:Georgia,serif;background:#380109;color:#EFE3CE;padding:28px">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:.3em;color:#DAB061">AVANTI — NEW RESERVATION</p>
      <h1 style="margin:0 0 20px;font-weight:400;font-size:26px;color:#F7F2E9">
        ${reservation.name} · ${reservation.guests} ${reservation.guests === "1" ? "guest" : "guests"}
      </h1>
      <table style="border-collapse:collapse;font-family:Helvetica,Arial,sans-serif;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr>
                 <td style="padding:6px 18px 6px 0;color:#B99B7A;white-space:nowrap">${label}</td>
                 <td style="padding:6px 0;color:#F4EFE6">${value}</td>
               </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:22px 0 0;font-size:12px;color:#B99B7A">
        Reply to this email to reach the guest directly.
      </p>
    </div>`;

  return { text, html };
}

/** Returns true when the booking was handed to the mail server. */
export async function sendReservationEmail(reservation: Reservation) {
  if (!mailConfigured) {
    console.warn(
      "[reservations] SMTP is not configured — booking saved to disk only. Set SMTP_HOST and RESERVATIONS_EMAIL to email the house.",
    );
    return false;
  }

  const { text, html } = body(reservation);

  await getTransporter().sendMail({
    from: SMTP_FROM ?? `AVANTI Reservations <${RESERVATIONS_EMAIL}>`,
    to: RESERVATIONS_EMAIL,
    // So the house can hit reply and reach the guest.
    replyTo: `${reservation.name} <${reservation.email}>`,
    subject: `New reservation — ${reservation.name}, ${longDate(reservation.date)} at ${reservation.time} (${reservation.guests})`,
    text,
    html,
  });

  return true;
}
