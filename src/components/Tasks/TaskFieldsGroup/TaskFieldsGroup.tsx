"use client";

import CategorySelect from "@/components/Tasks/CategorySelect/CategorySelect";
import PrioritySelect from "@/components/Tasks/PrioritySelect/PrioritySelect";
import { FIELD_LABEL_CLASSNAME } from "@/constants/inputs";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import { Shield } from "lucide-react";

type Props = {
  idPrefix?: string;
  category: string;
  onCategoryChange: (value: string) => void;
  dueDate: string;
  onDueDateChange: (value: string) => void;
  priority: number;
  onPriorityChange: (value: number) => void;
  isPrivate: boolean;
  onIsPrivateChange: (value: boolean) => void;
};

export default function TaskFieldsGroup({
  idPrefix = "task",
  category,
  onCategoryChange,
  dueDate,
  onDueDateChange,
  priority,
  onPriorityChange,
  isPrivate,
  onIsPrivateChange,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${idPrefix}-category`}
            className={FIELD_LABEL_CLASSNAME}
          >
            Category
          </label>
          <CategorySelect
            id={`${idPrefix}-category`}
            value={category}
            onChange={onCategoryChange}
          />
        </div>

        <DatePicker
          value={dueDate}
          onChange={onDueDateChange}
          label="Deadline"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${idPrefix}-priority`}
          className={FIELD_LABEL_CLASSNAME}
        >
          Priority
        </label>
        <PrioritySelect
          id={`${idPrefix}-priority`}
          value={priority}
          onChange={onPriorityChange}
        />
      </div>

      <button
        type="button"
        onClick={() => onIsPrivateChange(!isPrivate)}
        className={`mx-auto my-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-[clamp(0.8rem,2.2vw,0.875rem)] font-medium transition sm:my-4 sm:px-4
    ${
      isPrivate ?
        "border-[var(--private-border)] bg-[var(--private-bg)] text-[var(--private-text)]"
      : "border-[var(--color-border)] bg-[var(--color-surface-solid)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
    }`}
      >
        <Shield size={16} className="shrink-0" />
        {isPrivate ? "Private" : "Public"}
      </button>
    </>
  );
}
