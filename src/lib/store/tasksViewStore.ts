import { create } from "zustand";
import { TasksView } from "@/types/view";

type TasksViewStore = {
  view: TasksView;
  setView: (view: TasksView) => void;
};

export const useTasksViewStore = create<TasksViewStore>((set) => ({
  view: "all",
  setView: (view) => set({ view }),
}));
