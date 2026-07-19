"use client";

import { useTaskStats } from "@/hooks/tasks/useTaskStats";
import { PRIORITY_TIERS } from "@/constants/priority";

export default function PriorityBreakdown() {
  const { data } = useTaskStats();
  const breakdown = data?.priorityBreakdown ?? { high: 0, medium: 0, low: 0 };
  const total = breakdown.high + breakdown.medium + breakdown.low;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="mb-2 block px-1 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold uppercase tracking-wider text-slate-500 sm:mb-3">
        Priority of active tasks
      </span>

      {total === 0 ?
        <p className="px-1 text-[clamp(0.75rem,2vw,0.8rem)] text-slate-600">
          No active tasks
        </p>
      : <div className="flex flex-col gap-2 px-1 sm:gap-1.5">
          {PRIORITY_TIERS.map((tier) => {
            const count = breakdown[tier.key];
            const percent = total > 0 ? (count / total) * 100 : 0;
            return (
              <div
                key={tier.key}
                className="flex flex-wrap items-center gap-2 sm:flex-nowrap"
              >
                <span className="w-20 shrink-0 text-[clamp(0.7rem,1.8vw,0.75rem)] text-slate-400 sm:w-16">
                  {tier.label}
                </span>
                <div className="min-w-0 flex-1 h-1.5 overflow-hidden rounded-full bg-slate-950">
                  <div
                    className={`h-full ${tier.color} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-mono text-[clamp(0.7rem,1.8vw,0.75rem)] font-medium text-slate-500 sm:w-6">
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
