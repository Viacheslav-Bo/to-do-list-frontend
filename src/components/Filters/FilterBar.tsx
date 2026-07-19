"use client";

import { useEffect, useRef, useState } from "react";
import type { SortBy, SortOrder } from "@/types/task";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: SortBy;
  onSortByChange: (value: SortBy) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
  onReset: () => void;
};

const DEBOUNCE_MS = 400;

export default function FilterBar({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}: Props) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setLocalSearch(search));
    return () => window.cancelAnimationFrame(frame);
  }, [search]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchInput = (value: string) => {
    setLocalSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(value);
    }, DEBOUNCE_MS);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-900/40 border border-slate-800 rounded-xl">
      <input
        value={localSearch}
        onChange={(e) => handleSearchInput(e.target.value)}
        placeholder="Search by title..."
        className="flex-1 min-w-[180px] px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
      />

      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortBy)}
        className="px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
      >
        <option value="priority">By priority</option>
        <option value="createdAt">By creation date</option>
        <option value="dueDate">By deadline</option>
      </select>

      <button
        type="button"
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        title="Change sorting direction"
        className="px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300 hover:border-slate-700 cursor-pointer"
      >
        {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
      </button>

      <button
        type="button"
        onClick={onReset}
        title="Reset all filters to default values"
        className="px-3 py-2 rounded text-sm text-slate-500 hover:text-rose-400 hover:bg-slate-800/60 cursor-pointer"
      >
        ✕ Reset
      </button>
    </div>
  );
}
