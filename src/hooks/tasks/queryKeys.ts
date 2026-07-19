import type { GetTasksParams } from "@/types/task";

export const taskKeys = {
  all: ["tasks"] as const,
  list: (filters: GetTasksParams) => ["tasks", "list", filters] as const,
  stats: ["tasks", "stats"] as const,
};
