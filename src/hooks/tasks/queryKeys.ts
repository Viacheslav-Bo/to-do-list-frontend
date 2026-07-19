import type { GetTasksParams } from "@/types/task";

export const taskKeys = {
  all: ["tasks"] as const,
  list: (filters: GetTasksParams) => ["tasks", "list", filters] as const,
  categoriesOverview: ["tasks", "categories-overview"] as const,
  quickCounts: ["tasks", "quick-counts"] as const,
  stats: ["tasks", "stats"] as const,
};
