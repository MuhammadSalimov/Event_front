import { create } from "zustand";

type CreatePostStore = {
  isOpen: boolean;
  mainSection: string;
  onOpen: () => void;
  onClose: () => void;
  SetMainSection: (string: string) => void;
};

export const useCreatePost = create<CreatePostStore>((set) => ({
  isOpen: false,
  mainSection: "dashboard",
  SetMainSection: (string) => set({ mainSection: string }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
