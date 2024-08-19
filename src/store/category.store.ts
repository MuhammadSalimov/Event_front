import { Icategory } from "@/interfaces";
import { create } from "zustand";

type CategoryType = {
  category: Icategory[];
  setcategory: (category: Icategory[]) => void;
};

export const Categorytore = create<CategoryType>((set) => ({
  category: [],
  setcategory: (category) => set({ category }),
}));
