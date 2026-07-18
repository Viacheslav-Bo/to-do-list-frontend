import { create } from "zustand";
import type { StatusFilter } from "@/types/task";

interface TaskFiltersStore {
  status: StatusFilter;
  selectedCategory: string | null;
  dueTodayOnly: boolean;
  privateOnly: boolean;
  setStatus: (status: StatusFilter) => void;
  setSelectedCategory: (category: string | null) => void;
  toggleDueTodayOnly: () => void;
  togglePrivateOnly: () => void;
}

export const useTaskFiltersStore = create<TaskFiltersStore>()((set) => ({
  status: "all",
  selectedCategory: null,
  dueTodayOnly: false,
  privateOnly: false,
  setStatus: (status) => set({ status }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  toggleDueTodayOnly: () =>
    set((state) => ({ dueTodayOnly: !state.dueTodayOnly })),
  togglePrivateOnly: () =>
    set((state) => ({ privateOnly: !state.privateOnly })),
}));
