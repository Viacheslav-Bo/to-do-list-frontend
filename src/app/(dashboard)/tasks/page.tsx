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

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("priority");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const { view, setView } = useTasksViewStore();

  const isCompletedParam =
    view === "completed" ? true
    : view === "active" || view === "today" ? false
    : undefined;

  const { data, isLoading, isError } = useTasksQuery({
    page,
    limit: 20,
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
    setSelectedCategory(null);
    setSortBy("priority");
    setSortOrder("desc");
    setView("all");
    setPage(1);
  };

  const pageTitle = {
    all: "📋 All Tasks",
    active: "⏳ Active Tasks",
    completed: "✅ Completed Tasks",
    private: "🔒 Private Tasks",
    today: "📅 Due Today",
  }[view];

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-slate-100">{pageTitle}</h1>

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
        onSelect={setSelectedCategory}
      />

      {isError && (
        <p className="text-sm text-rose-400 bg-rose-500/10 p-3 rounded border border-rose-500/20">
          Failed to load tasks. Please try refreshing the page.
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
