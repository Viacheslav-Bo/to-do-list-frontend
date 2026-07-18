import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasks";
import type { GetTasksParams } from "@/types/task";
import { taskKeys } from "./queryKeys";

export function useTasksQuery(params: GetTasksParams) {
  return useQuery({
    queryKey: taskKeys.list(params),
    queryFn: () => getTasks(params),
  });
}
