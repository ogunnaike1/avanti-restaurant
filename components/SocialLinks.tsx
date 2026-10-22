import { INSTAGRAM_URL, SOCIAL_HANDLE, TIKTOK_URL } from "@/lib/business";

const link =
  "inline-flex items-center gap-2.5 text-[15px] text-gold transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={link}>
        <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
        <span>
          <span className="sr-only">Instagram: </span>@{SOCIAL_HANDLE}
        </span>
      </a>
      <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className={link}>
        <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]" fill="currentColor">
          <path d="M16.6 3c.3 2.4 1.7 3.9 4.1 4.1v3a7 7 0 0 1-4-1.3v6.3a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.1a2.8 2.8 0 1 0 1.9 2.6V3h2.9Z" />
        </svg>
        <span>
          <span className="sr-only">TikTok: </span>@{SOCIAL_HANDLE}
        </span>
      </a>
    </div>
  );
}
