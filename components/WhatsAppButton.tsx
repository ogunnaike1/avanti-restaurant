const NUMBER = "2348131561562";
const MESSAGE = "Hello AVANTI — I would like to book a table.";

/** wa.me opens the app on a phone and WhatsApp Web on a desktop. */
export const whatsappHref = `https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
export const whatsappNumber = "+234 813 156 1562";

/**
 * Floating chat affordance. Sits under the booking dialog (z-[80]) so it never
 * covers the form.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AVANTI on WhatsApp"
      className="group fixed bottom-5 right-5 z-[55] flex items-center gap-0 rounded-full border border-gold/40 bg-[#25D366] p-4 shadow-[0_14px_34px_-12px_rgba(16,1,4,.75)] transition-all duration-300 hover:gap-2.5 hover:pr-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-7 sm:right-7"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-6 shrink-0 fill-white sm:size-7">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35Z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.69 8.23-8.24 8.23Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
