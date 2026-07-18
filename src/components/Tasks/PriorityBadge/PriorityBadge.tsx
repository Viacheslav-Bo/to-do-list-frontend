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
  const { color } = getPriorityInfo(priority);

  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}
      title={`Priority: ${priority}/10`}
    >
      P{priority}
    </span>
  );
}
