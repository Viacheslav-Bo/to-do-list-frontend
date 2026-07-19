"use client";

import { useTasksViewStore } from "@/lib/store/tasksViewStore";
import { useTaskStats } from "@/hooks/tasks/useTaskStats";
import {
  LayoutList,
  Zap,
  CalendarDays,
  CheckCircle2,
  Shield,
} from "lucide-react";

function CountBadge({ value }: { value?: number }) {
  return (
    <span className="flex h-5 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-medium text-slate-400">
      {value ?? "..."}
    </span>
  );
}

export default function Navigation() {
  const view = useTasksViewStore((state) => state.view);
  const setView = useTasksViewStore((state) => state.setView);
  const { data: stats } = useTaskStats();

  const activeClass = "bg-slate-800 text-white";
  const idleClass = "text-slate-300 hover:bg-slate-800/50 hover:text-white";

  const navItems = [
    {
      id: "all",
      label: "All Tasks",
      icon: LayoutList,
      count: stats?.totalTasks,
    },
    { id: "active", label: "Active", icon: Zap, count: stats?.activeTasks },
    {
      id: "today",
      label: "Today",
      icon: CalendarDays,
      count: stats?.dueTodayUndone,
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle2,
      count: stats?.completedTasks,
    },
    {
      id: "private",
      label: "Private",
      icon: Shield,
      count: stats?.privateTasks,
    },
  ] as const;

  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Navigation
      </h2>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                view === item.id ? activeClass : idleClass
              }`}
            >
              <Icon
                size={18}
                className={
                  view === item.id ? "text-blue-400" : "text-slate-500"
                }
              />

              <div className="flex flex-1 items-center justify-between gap-3">
                <span>{item.label}</span>
                <CountBadge value={item.count} />
              </div>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
