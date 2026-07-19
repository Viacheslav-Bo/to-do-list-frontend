"use client";

import { useTaskStats } from "@/hooks/tasks/useTaskStats";
import { PRIORITY_TIERS } from "@/constants/priority";

export default function PriorityBreakdown() {
  const { data } = useTaskStats();
  const breakdown = data?.priorityBreakdown ?? { high: 0, medium: 0, low: 0 };
  const total = breakdown.high + breakdown.medium + breakdown.low;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-500 px-1">
        Priority of active tasks
      </span>

      {total === 0 ?
        <p className="text-xs text-slate-600 px-1">No active tasks</p>
      : <div className="flex flex-col gap-1.5 px-1">
          {PRIORITY_TIERS.map((tier) => {
            const count = breakdown[tier.key];
            const percent = total > 0 ? (count / total) * 100 : 0;
            return (
              <div key={tier.key} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-16 shrink-0">
                  {tier.label}
                </span>
                <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${tier.color} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-6 text-right font-mono font-medium shrink-0">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}
