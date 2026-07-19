"use client";

import { TASK_CATEGORIES } from "@/constants/categories";
import { FIELD_CLASSNAME } from "@/constants/inputs";

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
      className={FIELD_CLASSNAME}
    >
      {TASK_CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
