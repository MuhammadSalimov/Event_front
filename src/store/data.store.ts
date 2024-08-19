import { IDataCount } from "@/interfaces";
import { create } from "zustand";

type DataCountType = {
  counts: IDataCount;
  setCounts: (data: IDataCount) => void;
};

export const DataStore = create<DataCountType>((set) => ({
  counts: {
    countEvent: 0,
    countParts: 0,
    countUser: 0,
    countCateg:0,
    userInfo: [
      {
        _count: {
          events: 0,
          Participant: 0,
        },
        createdAt: "",
        email: "",
        fullName: "",
        isActivated: true,
      },
    ],
  },
  setCounts: (counts) => set({ counts }),
}));
