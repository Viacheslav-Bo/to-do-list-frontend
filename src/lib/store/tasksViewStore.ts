import { create } from "zustand";
import { TasksView } from "@/types/view";

type TasksViewStore = {
  view: TasksView;
  selectedCategory: string | null;
  setView: (view: TasksView) => void;
  setCategory: (category: string | null) => void;
};

export const useTasksViewStore = create<TasksViewStore>((set) => ({
  view: "all",
  selectedCategory: null,
  setView: (view) => set({ view, selectedCategory: null }),
  setCategory: (category) =>
    set((state) => ({
      selectedCategory: category,
      view: category ? "all" : state.view,
    })),
}));
