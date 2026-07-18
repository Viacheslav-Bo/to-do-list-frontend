import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasks";
import { taskKeys } from "./queryKeys";

export function useCategoriesOverview() {
  return useQuery({
    queryKey: taskKeys.categoriesOverview,
    queryFn: () => getTasks({ limit: 20 }),
    select: (data) => {
      const counts: Record<string, number> = {};
      for (const task of data.items) {
        counts[task.category] = (counts[task.category] ?? 0) + 1;
      }
      return {
        categories: Array.from(
          new Set(data.items.map((t) => t.category)),
        ).sort(),
        counts,
      };
    },
  });
}

export function useQuickCounts() {
  return useQuery({
    queryKey: taskKeys.quickCounts,
    queryFn: async () => {
      const [today, priv, undone, done] = await Promise.all([
        getTasks({ dueToday: true, isCompleted: false, limit: 5 }),
        getTasks({ isPrivate: true, limit: 5 }),
        getTasks({ isCompleted: false, limit: 5 }),
        getTasks({ isCompleted: true, limit: 5 }),
      ]);
      return {
        today: today.totalItems,
        private: priv.totalItems,
        undone: undone.totalItems,
        done: done.totalItems,
      };
    },
  });
}
