"use client";

import { TASK_CATEGORIES } from "@/constants/categories";

type Props = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
};

export default function CategorySelect({ value, onChange, id }: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
    >
      {TASK_CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
