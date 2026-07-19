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
      className={`border rounded-xl p-5 space-y-3 transition-all duration-500 ${
        progressPercentage === 100 ?
          "bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.1)]"
        : isTodayClear && !hasOverdue ?
          "bg-amber-500/5 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]"
        : hasNoTasksToday && !hasOverdue ? "bg-blue-500/5 border-blue-500/20"
        : "bg-slate-800/40 border-slate-800/60"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
        {totalTasks > 0 && progressPercentage === 100 ?
          <span className="text-emerald-400 font-bold flex items-center gap-1.5 animate-bounce">
            🏆 Absolute victory! All tasks are completed! 🎉
          </span>
        : isTodayClear && !hasOverdue ?
          <span className="text-amber-400 font-semibold flex items-center gap-1.5">
            🔥 Your plan for today is done! You are free! 🌟
          </span>
        : hasNoTasksToday && !hasOverdue ?
          <span className="text-blue-400 font-medium flex items-center gap-1.5">
            ✨ A new day — a fresh start. Plan your tasks! 🚀
          </span>
        : hasOverdue ?
          <span className="text-rose-400 font-medium flex items-center gap-1.5 animate-pulse">
            ⚠️ You have overdue tasks! It is time to sort them out 📉
          </span>
        : <span className="text-slate-400 font-medium">Overall progress</span>}

        <span className="font-bold text-emerald-400 self-end sm:self-auto">
          {progressPercentage}% ({completedTasks}/{totalTasks})
        </span>
      </div>

      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
        <div
          className={`h-full bg-gradient-to-r transition-all duration-500 ${
            progressPercentage === 100 ?
              "from-emerald-500 to-teal-400"
            : "from-blue-500 to-emerald-500"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </section>
  );
}
