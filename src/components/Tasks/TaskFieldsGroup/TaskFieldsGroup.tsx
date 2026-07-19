"use client";

import CategorySelect from "@/components/Tasks/CategorySelect/CategorySelect";
import PrioritySelect from "@/components/Tasks/PrioritySelect/PrioritySelect";
import Input from "@/components/ui/Input/Input";

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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${idPrefix}-category`}
            className="text-[clamp(0.8rem,2.2vw,0.875rem)] font-medium text-slate-400"
          >
            Category
          </label>
          <CategorySelect
            id={`${idPrefix}-category`}
            value={category}
            onChange={onCategoryChange}
          />
        </div>

        <Input
          id={`${idPrefix}-due-date`}
          type="date"
          label="Deadline"
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${idPrefix}-priority`}
          className="text-[clamp(0.8rem,2.2vw,0.875rem)] font-medium text-slate-400"
        >
          Priority
        </label>
        <PrioritySelect
          id={`${idPrefix}-priority`}
          value={priority}
          onChange={onPriorityChange}
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer border-t border-slate-800 pt-3 text-[clamp(0.8rem,2.2vw,0.875rem)] text-slate-400">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => onIsPrivateChange(e.target.checked)}
        />
        Private
      </label>
    </>
  );
}
