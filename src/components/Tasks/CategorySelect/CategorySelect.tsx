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
      className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-2 text-[clamp(0.8rem,2.2vw,0.9rem)] text-slate-200 focus:border-blue-500 focus:outline-none"
    >
      {TASK_CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
