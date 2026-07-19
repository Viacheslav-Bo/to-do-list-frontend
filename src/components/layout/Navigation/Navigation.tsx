"use client";

import { useTasksViewStore } from "@/lib/store/tasksViewStore";
import { useTaskStats } from "@/hooks/tasks/useTaskStats";

function CountBadge({ value }: { value?: number }) {
  return (
    <span className="flex h-5 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-medium text-slate-300">
      {value ?? "..."}
    </span>
  );
}

export default function Navigation() {
  const view = useTasksViewStore((state) => state.view);
  const setView = useTasksViewStore((state) => state.setView);
  const { data: stats } = useTaskStats();

  const activeClass = "bg-slate-800 text-white";
  const idleClass = "text-slate-300 hover:bg-slate-800 hover:text-white";

  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Navigation
      </h2>

      <nav className="space-y-1">
        <button
          onClick={() => setView("all")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "all" ? activeClass : idleClass
          }`}
        >
          <span>📋</span>

          <div className="flex flex-1 items-center justify-between gap-3">
            <span>All Tasks</span>

            <CountBadge value={stats?.totalTasks} />
          </div>
        </button>

        <button
          onClick={() => setView("active")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "active" ? activeClass : idleClass
          }`}
        >
          <span>⏳</span>

          <div className="flex flex-1 items-center justify-between gap-3">
            <span>Active</span>

            <CountBadge value={stats?.activeTasks} />
          </div>
        </button>

        <button
          onClick={() => setView("today")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "today" ? activeClass : idleClass
          }`}
        >
          <span>📅</span>

          <div className="flex flex-1 items-center justify-between gap-3">
            <span>Today</span>

            <CountBadge value={stats?.dueTodayUndone} />
          </div>
        </button>

        <button
          onClick={() => setView("completed")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "completed" ? activeClass : idleClass
          }`}
        >
          <span>✅</span>

          <div className="flex flex-1 items-center justify-between gap-3">
            <span>Completed</span>

            <CountBadge value={stats?.completedTasks} />
          </div>
        </button>

        <button
          onClick={() => setView("private")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "private" ? activeClass : idleClass
          }`}
        >
          <span>🔒</span>

          <div className="flex flex-1 items-center justify-between gap-3">
            <span>Private</span>

            <CountBadge value={stats?.privateTasks} />
          </div>
        </button>
      </nav>
    </section>
  );
}
