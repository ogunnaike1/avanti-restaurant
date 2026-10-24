/** Shared public details for pages, metadata, and contact links. */
export const BUSINESS_MOTTO = "Exceptional Taste. Unforgettable Experience.";
export const BUSINESS_TAGLINE = "Eat. Relax. Reconnect.";
export const BUSINESS_PROMISE =
  "We celebrate the art of good food, refined living and the joy of togetherness.";
export const BUSINESS_HOURS_DAYS = "Monday – Sunday";
export const BUSINESS_HOURS = "11:00 AM – 10:00 PM";
export const BUSINESS_SEATS = 70;
export const SOCIAL_HANDLE = "the_avanti_restaurant";
export const INSTAGRAM_URL = `https://www.instagram.com/${SOCIAL_HANDLE}`;
export const TIKTOK_URL = `https://www.tiktok.com/@${SOCIAL_HANDLE}`;
export const BUSINESS_EMAIL = "theavantirestaurant.com@gmail.com";
export const BUSINESS_EMAIL_HREF = `mailto:${BUSINESS_EMAIL}`;
export const BUSINESS_ADDRESS =
  "Kamtai Suite, Alegongo Shopping Mall, Akobo, Ibadan, Oyo State, Nigeria.";
export const BUSINESS_LOCATION = "Akobo, Ibadan";
export const BUSINESS_PHONE = "2349158671409";
export const BUSINESS_PHONE_DISPLAY = `+${BUSINESS_PHONE}`;
export const BUSINESS_PHONE_HREF = `tel:+${BUSINESS_PHONE}`;

/** Hourly arrivals during service, ending before the 10pm close. */
export const RESERVATION_TIMES = Array.from(
  { length: 11 },
  (_, index) => `${String(index + 11).padStart(2, "0")}:00`,
);
