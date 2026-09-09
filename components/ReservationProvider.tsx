"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ReservationModal from "./ReservationModal";

type ReservationContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

/** Lets any button anywhere in the site raise the booking dialog. */
export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used inside <ReservationProvider>");
  }
  return context;
}

export default function ReservationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <ReservationContext.Provider value={value}>
      {children}
      <ReservationModal open={isOpen} onClose={close} />
    </ReservationContext.Provider>
  );
}
