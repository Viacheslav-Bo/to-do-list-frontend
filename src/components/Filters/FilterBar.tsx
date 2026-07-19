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
    <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-800/40 border border-slate-800 rounded-xl">
      <input
        value={localSearch}
        onChange={(e) => handleSearchInput(e.target.value)}
        placeholder="Search by title..."
        className="flex-1 min-w-[120px] px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
      />

      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortBy)}
        className="px-2 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
      >
        <option value="priority">Priority</option>
        <option value="createdAt">Creation date</option>
        <option value="dueDate">Deadline</option>
      </select>

      <button
        type="button"
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        title={
          sortOrder === "asc" ?
            "Ascending — click for descending"
          : "Descending — click for ascending"
        }
        className="shrink-0 w-30 h-9 flex items-center justify-center bg-slate-950 border border-slate-800 rounded text-slate-300 hover:border-slate-700 cursor-pointer"
      >
        {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>

      <button
        type="button"
        onClick={onReset}
        title="Reset all filters to default values"
        className="shrink-0 w-9 h-9 flex items-center justify-center rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800/60 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}
