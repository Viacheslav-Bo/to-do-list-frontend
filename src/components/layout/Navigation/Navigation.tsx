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
    <span
      className="
flex h-5 w-8 shrink-0
items-center justify-center
rounded-full
bg-[var(--color-surface-solid)]
text-[11px]
font-medium
text-[var(--color-text-secondary)]
transition-colors
"
    >
      {value ?? "..."}
    </span>
  );
}

export default function Navigation() {
  const view = useTasksViewStore((state) => state.view);
  const setView = useTasksViewStore((state) => state.setView);
  const { data: stats } = useTaskStats();

  const activeClass =
    "border border-[var(--color-active-border)] bg-[var(--color-active-bg)] text-[var(--color-text-primary)]";

  const idleClass =
    "border border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]";

  const navItems = [
    {
      id: "all",
      label: "All Tasks",
      icon: LayoutList,
      count: stats?.totalTasks,
      color: "text-blue-400",
    },
    {
      id: "active",
      label: "Active",
      icon: Zap,
      count: stats?.activeTasks,
      color: "text-amber-400",
    },
    {
      id: "today",
      label: "Today",
      icon: CalendarDays,
      count: stats?.dueTodayUndone,
      color: "text-orange-400",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle2,
      count: stats?.completedTasks,
      color: "text-emerald-400",
    },
    {
      id: "private",
      label: "Private",
      icon: Shield,
      count: stats?.privateTasks,
      color: "text-violet-400",
    },
  ] as const;
  return (
    <section>
      <h2 className="mb-3 text-[clamp(0.7rem,1.8vw,0.75rem)] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
        Navigation
      </h2>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[clamp(0.8rem,2.2vw,0.875rem)] transition-colors duration-150 sm:gap-3 sm:px-3 ${
                view === item.id ? activeClass : idleClass
              }`}
            >
              <Icon
                size={18}
                className={
                  view === item.id ?
                    item.color
                  : "text-[var(--color-text-muted)]"
                }
              />

              <div className="flex flex-1 items-center justify-between gap-2 sm:gap-3">
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
