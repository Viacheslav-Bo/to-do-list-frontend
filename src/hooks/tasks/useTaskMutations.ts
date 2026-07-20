import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask, deleteTask } from "@/lib/api/tasks";
import type {
  CreateTaskPayload,
  UpdateTaskPayload,
  PaginatedTasks,
} from "@/types/task";
import { taskKeys } from "./queryKeys";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/types/apiError";

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success("Task created");
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: UpdateTaskPayload;
    }) => updateTask(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success("Task updated");
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success("Task deleted");
    },
    onError: () => toast.error("Failed to delete task"),
  });
}

export function useToggleTaskComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      isCompleted,
    }: {
      taskId: string;
      isCompleted: boolean;
    }) => updateTask(taskId, { isCompleted }),

    onMutate: async ({ taskId, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all });

      const previousLists = queryClient.getQueriesData<PaginatedTasks>({
        queryKey: ["tasks", "list"],
      });

      queryClient.setQueriesData<PaginatedTasks>(
        { queryKey: ["tasks", "list"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((t) =>
              t._id === taskId ? { ...t, isCompleted } : t,
            ),
          };
        },
      );

      return { previousLists };
    },

    onError: (_err, _vars, context) => {
      context?.previousLists?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}
