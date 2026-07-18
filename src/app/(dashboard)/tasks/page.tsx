"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/api/tasks";
import type {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  SortBy,
  SortOrder,
  StatusFilter,
} from "@/types/task";
import TaskForm from "@/components/Tasks/TaskForm/TaskForm";
import TasksList from "@/components/Tasks/TasksList/TasksList";
import FilterBar from "@/components/Filters/FilterBar";
import CategoriesList from "@/components/Categories/CategoriesList";
import Button from "@/components/ui/Button/Button";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("priority");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [totalPages, setTotalPages] = useState(1);

  const isCompletedParam = status === "all" ? undefined : status === "done";

  // Скидаємо на першу сторінку при зміні будь-якого фільтра — робимо це
  // під час рендеру (рекомендований React-патерн "adjusting state when
  // a prop changes"), а не в окремому useEffect, щоб не ганяти зайвий
  // цикл рендер → ефект → ререндер лише заради page=1.
  const filterKey = `${search}|${isCompletedParam}|${sortBy}|${sortOrder}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  const [page, setPage] = useState(1);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await getTasks({
        page,
        limit: 20,
        search: search || undefined,
        isCompleted: isCompletedParam,
        sortBy,
        sortOrder,
      });
      setTasks(result.items);
      setTotalPages(result.totalPages || 1);
    } catch {
      setError(
        "Не вдалось завантажити таски. Спробуй перезавантажити сторінку.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, search, isCompletedParam, sortBy, sortOrder]);

  useEffect(() => {
    // Завантаження даних із бекенду при монтуванні та зміні фільтрів —
    // це канонічний, рекомендований React-документацією випадок для
    // useEffect ("синхронізація із зовнішньою системою"), тому навмисно
    // ігноруємо попередження лінтера саме тут.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  const categories = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.category))).sort(),
    [tasks],
  );

  const visibleTasks = useMemo(
    () =>
      selectedCategory ?
        tasks.filter((t) => t.category === selectedCategory)
      : tasks,
    [tasks, selectedCategory],
  );

  const handleCreate = async (payload: CreateTaskPayload) => {
    const newTask = await createTask(payload);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdate = async (taskId: string, payload: UpdateTaskPayload) => {
    const updated = await updateTask(taskId, payload);
    setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)));
  };

  const handleToggleComplete = async (task: Task) => {
    // Оптимістичне оновлення: змінюємо стан миттєво, а якщо запит впаде —
    // повертаємо назад. Список відчувається швидким, а не "тормозним".
    const nextIsCompleted = !task.isCompleted;
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, isCompleted: nextIsCompleted } : t,
      ),
    );

    try {
      await updateTask(task._id, { isCompleted: nextIsCompleted });
      if (nextIsCompleted) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      }
    } catch {
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, isCompleted: task.isCompleted } : t,
        ),
      );
    }
  };

  const handleDelete = async (taskId: string) => {
    const prevTasks = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    try {
      await deleteTask(taskId);
    } catch {
      setTasks(prevTasks);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-slate-100">Мої таски</h1>

      <TaskForm onCreate={handleCreate} existingCategories={categories} />

      <FilterBar
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
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {error && (
        <p className="text-sm text-rose-400 bg-rose-500/10 p-3 rounded border border-rose-500/20">
          {error}
        </p>
      )}

      {isLoading && tasks.length === 0 ?
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
        </div>
      : <TasksList
          tasks={visibleTasks}
          onToggleComplete={handleToggleComplete}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      }

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="secondary"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Назад
          </Button>
          <span className="text-sm text-slate-400">
            {page} / {totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Далі →
          </Button>
        </div>
      )}
    </section>
  );
}
