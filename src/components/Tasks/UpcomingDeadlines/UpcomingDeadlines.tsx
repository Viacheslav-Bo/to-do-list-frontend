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
      label: `Overdue by ${Math.abs(diffDays)}d`,
      isOverdue: true,
    };
  if (diffDays === 0) return { label: "Today", isOverdue: false };
  if (diffDays === 1) return { label: "Tomorrow", isOverdue: false };
  return { label: `In ${diffDays}d`, isOverdue: false };
}

export default function UpcomingDeadlines() {
  const { data } = useTaskStats();
  const deadlines = data?.upcomingDeadlines ?? [];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-500 px-1">
        Upcoming deadlines
      </span>

      {deadlines.length === 0 ?
        <p className="text-xs text-slate-600 px-1">No upcoming deadlines 🎉</p>
      : <ul className="flex flex-col gap-1">
          {deadlines.map((task) => {
            const { label, isOverdue } = formatRelativeDate(task.dueDate);
            return (
              <li
                key={task._id}
                className="flex items-center justify-between gap-2 px-1"
              >
                <span
                  className="text-sm text-slate-300 truncate"
                  title={task.title}
                >
                  {task.title}
                </span>
                <span
                  className={`text-[10px] shrink-0 ${
                    isOverdue ? "text-rose-400" : "text-slate-500"
                  }`}
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
