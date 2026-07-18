import { create } from "zustand";

interface TaskEventsStore {
  version: number;
  bump: () => void;
}

export const useTaskEventsStore = create<TaskEventsStore>()((set) => ({
  version: 0,
  bump: () => set((state) => ({ version: state.version + 1 })),
}));
