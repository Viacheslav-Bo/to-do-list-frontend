"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import type { SortBy, SortOrder } from "@/types/task";
import { useTasksInfiniteQuery } from "@/hooks/tasks/useInfiniteQuery";
import { TASK_CATEGORIES } from "@/constants/categories";
import {
  useUpdateTask,
  useDeleteTask,
  useToggleTaskComplete,
} from "@/hooks/tasks/useTaskMutations";
import TasksToolbar from "@/components/Tasks/TasksToolbar/TasksToolbar";
import TasksList from "@/components/Tasks/TasksList/TasksList";
import LoadMore from "@/components/Tasks/LoadMore/LoadMore";
import CategoriesList from "@/components/Categories/CategoriesList";
import ProgressSection from "@/components/Tasks/ProgressSection/ProgressSection";
import { useTasksViewStore } from "@/lib/store/tasksViewStore";
import {
  LayoutList,
  Zap,
  CalendarDays,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { taskKeys } from "@/hooks/tasks/queryKeys";

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("priority");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const { view, setView, selectedCategory, setCategory } = useTasksViewStore();

  const isCompletedParam =
    view === "completed" ? true
    : view === "active" || view === "today" ? false
    : undefined;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTasksInfiniteQuery({
    search: search || undefined,
    isCompleted: isCompletedParam,
    isPrivate: view === "private" ? true : undefined,
    dueToday: view === "today" ? true : undefined,
    category: selectedCategory ?? undefined,
    sortBy,
    sortOrder,
  });

  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const toggleComplete = useToggleTaskComplete();

  const tasks = data?.pages.flatMap((page) => page.items) ?? [];

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

  const handleResetFilters = () => {
    setSearch("");
    setSortBy("priority");
    setSortOrder("desc");
    setView("all");
    queryClient.resetQueries({ queryKey: taskKeys.all });
  };

  const pageTitleConfig = {
    all: { icon: LayoutList, label: "All Tasks", color: "text-blue-400" },
    active: { icon: Zap, label: "Active Tasks", color: "text-amber-400" },
    completed: {
      icon: CheckCircle2,
      label: "Completed Tasks",
      color: "text-emerald-400",
    },
    private: { icon: Shield, label: "Private Tasks", color: "text-violet-400" },
    today: { icon: CalendarDays, label: "Due Today", color: "text-orange-400" },
  }[view];

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-4 px-3 py-6 sm:gap-5 sm:px-4 sm:py-8 lg:px-5 lg:py-5 3xl:max-w-6xl">
      <h1 className="flex items-center gap-2 text-[clamp(1.25rem,3vw,1.5rem)] font-bold text-[var(--color-text-primary)]">
        <pageTitleConfig.icon size={24} className={pageTitleConfig.color} />
        {pageTitleConfig.label}
      </h1>

      <ProgressSection />

      <TasksToolbar
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onReset={handleResetFilters}
      />

      <CategoriesList
        categories={[...TASK_CATEGORIES]}
        selectedCategory={selectedCategory}
        onSelect={setCategory}
      />

      {isError && (
        <p className="text-sm text-rose-400 bg-rose-500/10 p-3 rounded border border-rose-500/20">
          Failed to load tasks. Please try refreshing the page.
        </p>
      )}

      {isLoading && tasks.length === 0 ?
        <Spinner />
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

      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </section>
  );
}
