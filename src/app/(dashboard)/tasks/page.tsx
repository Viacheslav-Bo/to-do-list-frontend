"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import type { SortBy, SortOrder } from "@/types/task";
import { useTaskFiltersStore } from "@/lib/store/taskFiltersStore";
import { useTasksQuery } from "@/hooks/tasks/useTasksQuery";
import { useCategoriesOverview } from "@/hooks/tasks/useTasksOverview";
import {
  useUpdateTask,
  useDeleteTask,
  useToggleTaskComplete,
} from "@/hooks/tasks/useTaskMutations";
import TasksToolbar from "@/components/Tasks/TasksToolbar/TasksToolbar";
import TasksList from "@/components/Tasks/TasksList/TasksList";
import TasksPagination from "@/components/Tasks/TasksPagination/TasksPagination";
import CategoriesList from "@/components/Categories/CategoriesList";

export default function TasksPage() {
  const status = useTaskFiltersStore((state) => state.status);
  const setStatus = useTaskFiltersStore((state) => state.setStatus);
  const selectedCategory = useTaskFiltersStore(
    (state) => state.selectedCategory,
  );
  const setSelectedCategory = useTaskFiltersStore(
    (state) => state.setSelectedCategory,
  );
  const dueTodayOnly = useTaskFiltersStore((state) => state.dueTodayOnly);
  const privateOnly = useTaskFiltersStore((state) => state.privateOnly);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("priority");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);

  const isCompletedParam = status === "all" ? undefined : status === "done";

  const { data, isLoading, isError } = useTasksQuery({
    page,
    limit: 20,
    search: search || undefined,
    isCompleted: isCompletedParam,
    category: selectedCategory ?? undefined,
    isPrivate: privateOnly ? true : undefined,
    dueToday: dueTodayOnly ? true : undefined,
    sortBy,
    sortOrder,
  });

  const { data: overview } = useCategoriesOverview();

  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const toggleComplete = useToggleTaskComplete();

  const tasks = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const filterKey = `${search}|${isCompletedParam}|${selectedCategory}|${dueTodayOnly}|${privateOnly}|${sortBy}|${sortOrder}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const handleToggleComplete = (task: {
    _id: string;
    isCompleted: boolean;
  }) => {
    toggleComplete.mutate(
      { taskId: task._id, isCompleted: !task.isCompleted },
      {
        onSuccess: () => {
          if (!task.isCompleted) {
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
          }
        },
      },
    );
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-slate-100">Мої таски</h1>

      <TasksToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      <CategoriesList
        categories={overview?.categories ?? []}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {isError && (
        <p className="text-sm text-rose-400 bg-rose-500/10 p-3 rounded border border-rose-500/20">
          Не вдалось завантажити таски. Спробуй перезавантажити сторінку.
        </p>
      )}

      {isLoading && tasks.length === 0 ?
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
        </div>
      : <TasksList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onUpdate={async (taskId, payload) => {
            await updateTask.mutateAsync({ taskId, payload });
          }}
          onDelete={async (taskId) => {
            await deleteTask.mutateAsync(taskId);
          }}
        />
      }

      <TasksPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
}
