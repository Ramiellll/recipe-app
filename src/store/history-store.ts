import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HistoryItem = {
  id: string;
  title: string;
  timestamp: number;
  liked: boolean;
  image: string;
  criteria: {
    area: string;
    ingredient: string;
  };
};

export type HistoryState = {
  history: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist<HistoryState>(
    (set) => ({
      history: [],
      addHistoryItem: (item) =>
        set((state) => ({ history: [item, ...state.history] })),
    }),
    {
      name: "history-storage",
    }
  ),
);
