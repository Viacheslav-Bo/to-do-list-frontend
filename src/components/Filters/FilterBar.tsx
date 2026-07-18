"use client";

import { useRef, useState } from "react";
import type { SortBy, SortOrder, StatusFilter } from "@/types/task";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  sortBy: SortBy;
  onSortByChange: (value: SortBy) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
};

const DEBOUNCE_MS = 400;

export default function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: Props) {
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchInput = (value: string) => {
    setLocalSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(value);
    }, DEBOUNCE_MS);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
      <input
        value={localSearch}
        onChange={(e) => handleSearchInput(e.target.value)}
        placeholder="Пошук за назвою..."
        className="flex-1 min-w-[180px] px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        className="px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
      >
        <option value="all">Усі</option>
        <option value="undone">Не виконані</option>
        <option value="done">Виконані</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortBy)}
        className="px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
      >
        <option value="priority">За пріоритетом</option>
        <option value="createdAt">За датою створення</option>
        <option value="dueDate">За дедлайном</option>
      </select>

      <button
        type="button"
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        title="Змінити напрямок сортування"
        className="px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300 hover:border-slate-700 cursor-pointer"
      >
        {sortOrder === "asc" ? "↑ Зростання" : "↓ Спадання"}
      </button>
    </div>
  );
}
