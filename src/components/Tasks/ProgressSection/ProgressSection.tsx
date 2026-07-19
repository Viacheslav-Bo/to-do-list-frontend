"use client";

import { useTaskStats } from "@/hooks/tasks/useTaskStats";

export default function ProgressSection() {
  const { data } = useTaskStats();

  const totalTasks = data?.totalTasks ?? 0;
  const completedTasks = data?.completedTasks ?? 0;
  const dueTodayTotal = data?.dueTodayTotal ?? 0;
  const dueTodayUndone = data?.dueTodayUndone ?? 0;
  const hasOverdue = (data?.overdueCount ?? 0) > 0;

  const isTodayClear = dueTodayTotal > 0 && dueTodayUndone === 0;
  const hasNoTasksToday = dueTodayTotal === 0;

  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <section
      className={`rounded-xl border p-4 space-y-2 transition-all duration-500 sm:p-5 sm:space-y-3 ${
        progressPercentage === 100 ?
          "border-amber-500/30 bg-amber-500/5 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
        : isTodayClear && !hasOverdue ?
          "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_25px_rgba(16,185,129,0.1)]"
        : hasNoTasksToday && !hasOverdue ? "border-blue-500/20 bg-blue-500/5"
        : "border-slate-800/60 bg-slate-800/40"
      }`}
    >
      <div className="flex flex-col gap-2 text-[clamp(0.75rem,2.2vw,0.875rem)] sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        {totalTasks > 0 && progressPercentage === 100 ?
          <span className="flex items-center gap-1.5 break-words font-bold leading-relaxed text-amber-400 animate-bounce">
            🏆 Absolute victory! All tasks are completed! 🎉
          </span>
        : isTodayClear && !hasOverdue ?
          <span className="flex items-center gap-1.5 break-words font-semibold leading-relaxed text-emerald-400">
            🔥 Your plan for today is done! You are free! 🌟
          </span>
        : hasNoTasksToday && !hasOverdue ?
          <span className="flex items-center gap-1.5 break-words font-medium leading-relaxed text-blue-400">
            ✨ A new day — a fresh start. Plan your tasks! 🚀
          </span>
        : hasOverdue ?
          <span className="flex items-center gap-1.5 break-words font-medium leading-relaxed text-rose-400 animate-pulse">
            ⚠️ You have overdue tasks! It is time to sort them out 📉
          </span>
        : <span className="font-medium text-slate-400">Overall progress</span>}

        <span
          className={`self-start font-bold sm:self-auto ${
            progressPercentage === 100 ? "text-amber-400" : "text-emerald-400"
          }`}
        >
          {progressPercentage}% ({completedTasks}/{totalTasks})
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full border border-slate-800/40 bg-slate-950">
        <div
          className={`h-full bg-gradient-to-r transition-all duration-500 ${
            progressPercentage === 100 ?
              "from-amber-500 to-yellow-400"
            : "from-blue-500 to-emerald-500"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </section>
  );
}
