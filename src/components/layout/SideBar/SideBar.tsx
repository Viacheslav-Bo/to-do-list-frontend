"use client";

import UpcomingDeadlines from "@/components/Tasks/UpcomingDeadlines/UpcomingDeadlines";
import PriorityBreakdown from "@/components/Tasks/PriorityBreakdown/PriorityBreakdown";
import MiniProfile from "@/components/layout/MiniProfile/MiniProfile";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-20 bottom-0 w-64 shrink-0 bg-slate-900/40 border-r border-slate-800 p-5 gap-5 overflow-y-auto">
      <UpcomingDeadlines />

      <div className="pt-4 border-t border-slate-800">
        <PriorityBreakdown />
      </div>

      <div className="mt-auto">
        <MiniProfile />
      </div>
    </aside>
  );
}
