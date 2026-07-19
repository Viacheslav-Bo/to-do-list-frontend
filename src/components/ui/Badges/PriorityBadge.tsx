import { PRIORITY } from "@/constants/priority";

type Props = {
  priority: number;
};

export function getPriorityInfo(priority: number) {
  if (priority >= PRIORITY.HIGH) {
    return {
      label: "High",
      color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };
  }

  if (priority >= PRIORITY.MEDIUM) {
    return {
      label: "Medium",
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };
  }

  return {
    label: "Low",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
}

export default function PriorityBadge({ priority }: Props) {
  const { label, color } = getPriorityInfo(priority);

  return (
    <span
      className={`inline-flex h-6 w-[58px] shrink-0 items-center justify-center rounded-md border text-[11px] font-semibold ${color}`}
      title={`${label} priority (${priority}/10)`}
    >
      P{priority}
    </span>
  );
}
