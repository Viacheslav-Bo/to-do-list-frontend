"use client";

import { PRIORITY_CLASSES } from "@/constants/priority";

type Props = {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

const PRIORITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getTierClass(priority: number, isActive: boolean) {
  if (priority >= 8) {
    return isActive ?
        PRIORITY_CLASSES.high.active
      : PRIORITY_CLASSES.high.default;
  }

  if (priority >= 4) {
    return isActive ?
        PRIORITY_CLASSES.medium.active
      : PRIORITY_CLASSES.medium.default;
  }

  return isActive ? PRIORITY_CLASSES.low.active : PRIORITY_CLASSES.low.default;
}

export default function PrioritySelect({
  id = "priority",
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <div id={id} className="grid grid-cols-10 gap-1 sm:gap-1.5">
      {PRIORITIES.map((priority) => (
        <button
          key={priority}
          type="button"
          disabled={disabled}
          onClick={() => onChange(priority)}
          className={`flex aspect-square w-full items-center justify-center rounded border text-[10px] sm:text-xs font-semibold cursor-pointer transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${getTierClass(
            priority,
            value === priority,
          )}`}
        >
          {priority}
        </button>
      ))}
    </div>
  );
}
