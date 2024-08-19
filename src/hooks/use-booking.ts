import { IBooking } from "@/interfaces";
import { create } from "zustand";

type ConfirmBooking = {
  isOpen: boolean;
  booking: IBooking;
  eventId: string;
  onOpenBooking: () => void;
  onClose: () => void;
  setBooking: (id: string) => void;
};

export const ConfirmBooking = create<ConfirmBooking>((set) => ({
  isOpen: false,
  booking: {} as IBooking,
  eventId: "",
  onOpenBooking: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setBooking: (id) => set({ eventId: id }),
}));
