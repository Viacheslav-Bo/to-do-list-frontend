"use client";

import { useEffect, useRef, useState } from "react";
import type { SortBy, SortOrder } from "@/types/task";
import { FIELD_CLASSNAME } from "@/constants/inputs";
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
    <div
      className="
flex
flex-col
gap-2
rounded-2xl
border
border-[var(--color-border)]
bg-[var(--color-surface)]
p-3
shadow-sm
sm:flex-row
sm:flex-wrap
sm:items-center
"
    >
      <input
        value={localSearch}
        onChange={(e) => handleSearchInput(e.target.value)}
        placeholder="Search by title..."
        className={`${FIELD_CLASSNAME} sm:min-w-[180px] sm:flex-1`}
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
                  onSortOrderChange(
                    option.value === "dueDate" ? "asc" : "desc",
                  );
                }
              }}
              className={`
flex
h-10
items-center
gap-1.5
rounded-xl
border
px-3.5
text-[clamp(0.75rem,2vw,0.85rem)]
font-medium
transition-all
cursor-pointer
${
  isActive ?
    "border-sky-400/40 bg-sky-500/10 text-sky-300"
  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
}
`}
            >
              {option.label}
              {isActive &&
                (sortOrder === "asc" ?
                  <ArrowUp size={15} strokeWidth={2.2} />
                : <ArrowDown size={15} strokeWidth={2.2} />)}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onReset}
          title="Reset all filters to default values"
          className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
border
border-[var(--color-border)]
bg-[var(--color-surface)]
text-[var(--color-text-muted)]
transition-all
hover:border-rose-500/30
hover:bg-rose-500/10
hover:text-rose-400
cursor-pointer
"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
