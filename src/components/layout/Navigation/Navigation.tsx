"use client";

import { useTasksViewStore } from "@/lib/store/tasksViewStore";

export default function Navigation() {
  const view = useTasksViewStore((state) => state.view);
  const setView = useTasksViewStore((state) => state.setView);
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Navigation
      </h2>

      <nav className="space-y-1">
        <button
          onClick={() => setView("all")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "all" ?
              "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>📋</span>
          <span>All Tasks</span>
        </button>
        <button
          onClick={() => setView("active")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "active" ?
              "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>⏳</span>
          <span>Active</span>
        </button>

        <button
          onClick={() => setView("private")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "private" ?
              "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>🔒</span>
          <span>Private</span>
        </button>
        <button
          onClick={() => setView("today")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "today" ?
              "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>📅</span>
          <span>Due Today</span>
        </button>
        <button
          onClick={() => setView("completed")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            view === "completed" ?
              "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>✅</span>
          <span>Completed</span>
        </button>
      </nav>
    </section>
  );
}
