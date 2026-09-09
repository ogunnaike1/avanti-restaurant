"use client";

import type { ReactNode } from "react";
import { useReservation } from "./ReservationProvider";

/** Any call to action that should raise the booking dialog. */
export default function ReserveButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  /** Runs before the dialog opens — used to close the mobile drawer. */
  onClick?: () => void;
}) {
  const { open } = useReservation();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
