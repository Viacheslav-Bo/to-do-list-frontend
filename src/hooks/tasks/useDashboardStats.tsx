import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasks";
import type { Task } from "@/types/task";

function isSameDay(dateStr: string, reference: Date): boolean {
  const date = new Date(dateStr);
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth() &&
    date.getDate() === reference.getDate()
  );
}

function priorityTier(priority: number): "high" | "medium" | "low" {
  if (priority >= 8) return "high";
  if (priority >= 4) return "medium";
  return "low";
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["tasks", "dashboard-stats"],
    queryFn: async () => {
      const today = new Date();

      const [total, completed, dueTodayTotal, dueTodayUndone, undoneList] =
        await Promise.all([
          getTasks({ limit: 5 }),
          getTasks({ isCompleted: true, limit: 5 }),
          getTasks({ dueToday: true, limit: 5 }),
          getTasks({ dueToday: true, isCompleted: false, limit: 5 }),
          getTasks({
            isCompleted: false,
            limit: 100,
            sortBy: "dueDate",
            sortOrder: "asc",
          }),
        ]);

      const undoneTasks: Task[] = undoneList.items;

      const overdueTasks = undoneTasks.filter(
        (t) => new Date(t.dueDate) < today && !isSameDay(t.dueDate, today),
      );

      const priorityBreakdown = { high: 0, medium: 0, low: 0 };
      for (const task of undoneTasks) {
        priorityBreakdown[priorityTier(task.priority)] += 1;
      }

      return {
        totalTasks: total.totalItems,
        completedTasks: completed.totalItems,
        dueTodayTotal: dueTodayTotal.totalItems,
        dueTodayUndone: dueTodayUndone.totalItems,
        overdueCount: overdueTasks.length,
        priorityBreakdown,
        upcomingDeadlines: undoneTasks.slice(0, 5),
      };
    },
  });
}
