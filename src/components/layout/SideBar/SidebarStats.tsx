"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/api/tasks";
import { useTaskEventsStore } from "@/lib/store/taskEventsStore";

function isToday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export default function SidebarStats() {
  const version = useTaskEventsStore((state) => state.version);
  const [completedCount, setCompletedCount] = useState<number | null>(null);
  const [dueTodayCount, setDueTodayCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    // totalItems — це загальна кількість, яку рахує бекенд ще до limit/skip,
    // тому limit:1 достатньо, щоб не тягнути зайві дані заради лічильника.
    getTasks({ isCompleted: true, limit: 1 })
      .then((res) => {
        if (isMounted) setCompletedCount(res.totalItems);
      })
      .catch(() => {
        if (isMounted) setCompletedCount(null);
      });

    // Бекенд не вміє фільтрувати за конкретною датою дедлайну, тому
    // рахуємо "на сьогодні" на клієнті серед невиконаних тасок.
    getTasks({
      isCompleted: false,
      limit: 100,
      sortBy: "dueDate",
      sortOrder: "asc",
    })
      .then((res) => {
        if (isMounted) {
          setDueTodayCount(res.items.filter((t) => isToday(t.dueDate)).length);
        }
      })
      .catch(() => {
        if (isMounted) setDueTodayCount(null);
      });

    return () => {
      isMounted = false;
    };
  }, [version]);

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col items-center gap-0.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
        <span className="text-lg font-bold text-emerald-400">
          {completedCount ?? "–"}
        </span>
        <span className="text-[10px] text-slate-500 text-center leading-tight">
          Виконано
        </span>
      </div>
      <div className="flex flex-col items-center gap-0.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
        <span className="text-lg font-bold text-amber-400">
          {dueTodayCount ?? "–"}
        </span>
        <span className="text-[10px] text-slate-500 text-center leading-tight">
          На сьогодні
        </span>
      </div>
    </div>
  );
}
