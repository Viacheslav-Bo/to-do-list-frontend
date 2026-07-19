import { useQuery } from "@tanstack/react-query";
import { getTaskStats } from "@/lib/api/tasks";
import { taskKeys } from "./queryKeys";

export function useTaskStats() {
  return useQuery({
    queryKey: taskKeys.stats,
    queryFn: getTaskStats,
  });
}
