import { useInfiniteQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasks";
import type { GetTasksParams } from "@/types/task";
import { taskKeys } from "./queryKeys";

export function useTasksInfiniteQuery(params: Omit<GetTasksParams, "page">) {
  return useInfiniteQuery({
    queryKey: taskKeys.list(params),
    queryFn: ({ pageParam }) => getTasks({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });
}
