"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import type { SortBy, SortOrder } from "@/types/task";
import { useTasksQuery } from "@/hooks/tasks/useTasksQuery";
import { TASK_CATEGORIES } from "@/constants/categories";
import {
  useUpdateTask,
  useDeleteTask,
  useToggleTaskComplete,
} from "@/hooks/tasks/useTaskMutations";
import TasksToolbar from "@/components/Tasks/TasksToolbar/TasksToolbar";
import TasksList from "@/components/Tasks/TasksList/TasksList";
import TasksPagination from "@/components/Tasks/TasksPagination/TasksPagination";
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

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("priority");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const { view, setView, selectedCategory, setCategory } = useTasksViewStore();

  const isCompletedParam =
    view === "completed" ? true
    : view === "active" || view === "today" ? false
    : undefined;

  const { data, isLoading, isError } = useTasksQuery({
    page,
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

  const tasks = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPage(1));
    return () => window.cancelAnimationFrame(frame);
  }, [search, isCompletedParam, selectedCategory, sortBy, sortOrder, view]);

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
    setPage(1);
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
    <section className="mx-auto flex max-w-5xl flex-col gap-4 px-3 py-6 sm:gap-5 sm:px-4 sm:py-8 lg:px-5 lg:py-10 3xl:max-w-6xl">
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
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--color-border)] border-t-blue-500 animate-spin" />
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
