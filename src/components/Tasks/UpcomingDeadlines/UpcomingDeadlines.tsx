"use client";

import { useTaskStats } from "@/hooks/tasks/useTaskStats";

function formatRelativeDate(dueDateStr: string): {
  label: string;
  isOverdue: boolean;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dueDateStr);
  dueDate.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0)
    return {
      label: "Overdue",
      isOverdue: true,
    };
  if (diffDays === 0) return { label: "Today", isOverdue: false };
  if (diffDays === 1) return { label: "Tomorrow", isOverdue: false };
  return { label: `In ${diffDays}d`, isOverdue: false };
}

function getDeadlineColor(label: string, isOverdue: boolean) {
  if (isOverdue) return "text-rose-500 font-medium";
  if (label === "Today") return "text-emerald-400";
  if (label === "Tomorrow") return "text-blue-400";
  return "text-slate-500";
}

export default function UpcomingDeadlines() {
  const { data } = useTaskStats();
  const deadlines = data?.upcomingDeadlines ?? [];

  return (
    <div className="flex flex-col gap-2">
      <span className="mb-2 block px-1 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold uppercase tracking-wider text-slate-500 sm:mb-3">
        Upcoming deadlines
      </span>

      {deadlines.length === 0 ?
        <p className="px-1 text-[clamp(0.75rem,2vw,0.8rem)] text-slate-600">
          No upcoming deadlines 🎉
        </p>
      : <ul className="flex flex-col gap-1.5">
          {deadlines.map((task) => {
            const { label, isOverdue } = formatRelativeDate(task.dueDate);
            return (
              <li
                key={task._id}
                className="flex items-center justify-between gap-2 px-1"
              >
                <span
                  className="min-w-0 flex-1 truncate text-[clamp(0.8rem,2.2vw,0.875rem)] text-slate-300"
                  title={task.title}
                >
                  {task.title}
                </span>
                <span
                  className={`shrink-0 text-[clamp(0.625rem,1.7vw,0.7rem)] uppercase tracking-wider ${getDeadlineColor(label, isOverdue)}`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}
