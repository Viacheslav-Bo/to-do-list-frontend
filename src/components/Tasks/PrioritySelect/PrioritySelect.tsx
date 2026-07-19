"use client";

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
        "border-rose-500/60 bg-rose-500/25 text-rose-200"
      : "border-rose-500/20 bg-rose-500/5 text-rose-400/70 hover:bg-rose-500/15 hover:border-rose-500/40 hover:text-rose-300";
  }
  if (priority >= 4) {
    return isActive ?
        "border-amber-500/60 bg-amber-500/25 text-amber-200"
      : "border-amber-500/20 bg-amber-500/5 text-amber-400/70 hover:bg-amber-500/15 hover:border-amber-500/40 hover:text-amber-300";
  }
  return isActive ?
      "border-emerald-500/60 bg-emerald-500/25 text-emerald-200"
    : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400/70 hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:text-emerald-300";
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
