import { nextServer } from "./api";
import type {
  Task,
  TaskStats,
  CreateTaskPayload,
  UpdateTaskPayload,
  GetTasksParams,
  PaginatedTasks,
} from "@/types/task";

export const getTasks = async (
  params: GetTasksParams = {},
): Promise<PaginatedTasks> => {
  const res = await nextServer.get<{ data: PaginatedTasks }>("/tasks", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 12,
      ...(params.search ? { search: params.search } : {}),
      ...(params.isCompleted !== undefined ?
        { isCompleted: params.isCompleted }
      : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.isPrivate !== undefined ?
        { isPrivate: params.isPrivate }
      : {}),
      ...(params.dueToday !== undefined ? { dueToday: params.dueToday } : {}),
      ...(params.sortBy ? { sortBy: params.sortBy } : {}),
      ...(params.sortOrder ? { sortOrder: params.sortOrder } : {}),
    },
  });
  return res.data.data;
};

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const res = await nextServer.post<{ data: Task }>("/tasks", payload);

  return res.data.data;
};

export const updateTask = async (
  taskId: string,
  payload: UpdateTaskPayload,
): Promise<Task> => {
  const res = await nextServer.patch<{ data: Task }>(
    `/tasks/${taskId}`,
    payload,
  );
  return res.data.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await nextServer.delete(`/tasks/${taskId}`);
};


export const getTaskStats = async (): Promise<TaskStats> => {
  const res = await nextServer.get<{ data: TaskStats }>("/tasks/stats");
  return res.data.data;
};
