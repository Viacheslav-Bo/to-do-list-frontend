"use client";

import {
  useCategoriesOverview,
  useQuickCounts,
} from "@/hooks/tasks/useTasksOverview";
import { useTaskFiltersStore } from "@/lib/store/taskFiltersStore";

export default function SidebarFilters() {
  const status = useTaskFiltersStore((state) => state.status);
  const setStatus = useTaskFiltersStore((state) => state.setStatus);
  const selectedCategory = useTaskFiltersStore(
    (state) => state.selectedCategory,
  );
  const setSelectedCategory = useTaskFiltersStore(
    (state) => state.setSelectedCategory,
  );
  const dueTodayOnly = useTaskFiltersStore((state) => state.dueTodayOnly);
  const toggleDueTodayOnly = useTaskFiltersStore(
    (state) => state.toggleDueTodayOnly,
  );
  const privateOnly = useTaskFiltersStore((state) => state.privateOnly);
  const togglePrivateOnly = useTaskFiltersStore(
    (state) => state.togglePrivateOnly,
  );

  const { data: overview } = useCategoriesOverview();
  const { data: quickCounts } = useQuickCounts();

  const categoryEntries = Object.entries(overview?.counts ?? {}).sort(
    (a, b) => b[1] - a[1],
  );

  const quickButtonClass = (isActive: boolean) =>
    `flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
      isActive ?
        "bg-blue-600/10 text-blue-400 border border-blue-500/20"
      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-500 px-1">
          Quick filters
        </span>

        <button
          onClick={toggleDueTodayOnly}
          className={quickButtonClass(dueTodayOnly)}
        >
          <span>🔥 Today</span>
          <span className="text-slate-600">{quickCounts?.today ?? "…"}</span>
        </button>

        <button
          onClick={togglePrivateOnly}
          className={quickButtonClass(privateOnly)}
        >
          <span>🔒 Private</span>
          <span className="text-slate-600">{quickCounts?.private ?? "…"}</span>
        </button>

        <button
          onClick={() => setStatus(status === "undone" ? "all" : "undone")}
          className={quickButtonClass(status === "undone")}
        >
          <span>To do</span>
          <span className="text-slate-600">{quickCounts?.undone ?? "…"}</span>
        </button>

        <button
          onClick={() => setStatus(status === "done" ? "all" : "done")}
          className={quickButtonClass(status === "done")}
        >
          <span>Done</span>
          <span className="text-slate-600">{quickCounts?.done ?? "…"}</span>
        </button>
      </div>

      {categoryEntries.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500 px-1">
            Categories
          </span>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
              selectedCategory === null ?
                "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20"
              : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
            }`}
          >
            All categories
          </button>
          {categoryEntries.map(([category, count]) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                selectedCategory === category ?
                  "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <span className="truncate">#{category}</span>
              <span className="text-slate-600 shrink-0 ml-2">{count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
