type Props = {
  priority: number;
};

export default function PriorityBadge({ priority }: Props) {
  const colorClass =
    priority >= 8 ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
    : priority >= 4 ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorClass}`}
      title={`Priority: ${priority}/10`}
    >
      P{priority}
    </span>
  );
}
