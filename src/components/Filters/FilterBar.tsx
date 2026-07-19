"use client";

import { useEffect, useRef, useState } from "react";
import type { SortBy, SortOrder } from "@/types/task";

import { ArrowUp, ArrowDown, RotateCcw } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 sm:p-3">
      <input
        value={localSearch}
        onChange={(e) => handleSearchInput(e.target.value)}
        placeholder="Search by title..."
        className="w-full sm:min-w-[120px] sm:flex-1 rounded border border-[var(--color-border)] bg-[var(--color-surface-solid)] px-3 py-2 text-[clamp(0.8rem,2.2vw,0.875rem)] text-[var(--color-text-primary)] focus:border-blue-500 focus:outline-none"
      />
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            { value: "createdAt", label: "Created" },
            { value: "priority", label: "Priority" },
            { value: "dueDate", label: "Deadline" },
          ] as const
        ).map((option) => {
          const isActive = sortBy === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                if (isActive) {
                  onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
                } else {
                  onSortByChange(option.value);
                  onSortOrderChange("desc");
                }
              }}
              className={`flex h-9 shrink-0 items-center gap-1 rounded border px-3 text-[clamp(0.75rem,2vw,0.8rem)] cursor-pointer ${
                isActive ?
                  "border-blue-500/40 bg-blue-500/10 text-blue-300"
                : "border-[var(--color-border)] bg-[var(--color-surface-solid)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]"
              }`}
            >
              {option.label}
              {isActive &&
                (sortOrder === "asc" ?
                  <ArrowUp size={14} />
                : <ArrowDown size={14} />)}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onReset}
          title="Reset all filters to default values"
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-rose-400 cursor-pointer"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
