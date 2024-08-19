import { create } from "zustand";

type profileStoreType = {
  isMenuOpen: boolean;
  isDark: boolean;
  isSuccess: boolean;
  successOpen: () => void;
  successClose: () => void;
  changeMenu: (bool: boolean) => void;
  changeDark: (bool: boolean) => void;
};

export const profileStore = create<profileStoreType>((set) => ({
  isMenuOpen: false,
  isDark: false,
  isSuccess: false,
  successOpen: () => set({ isSuccess: true }),
  successClose: () => set({ isSuccess: false }),
  changeDark: (bool) => set({ isDark: bool }),
  changeMenu: (bool) => set({ isMenuOpen: bool }),
}));
