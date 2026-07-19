"use client";

import UpcomingDeadlines from "@/components/Tasks/UpcomingDeadlines/UpcomingDeadlines";
import PriorityBreakdown from "@/components/Tasks/PriorityBreakdown/PriorityBreakdown";
import MiniProfile from "@/components/layout/MiniProfile/MiniProfile";
import Navigation from "@/components/layout/Navigation/Navigation";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-20 bottom-0 w-64 shrink-0 bg-slate-800/40 border-r border-slate-800 p-5 gap-8 overflow-y-auto">
      <div className="mb-8">
        <Navigation />
      </div>

      <div className="border-t border-slate-800 pt-5">
        <UpcomingDeadlines />
      </div>

      <div className="border-t border-slate-800 pt-5">
        <PriorityBreakdown />
      </div>

      <div className="mt-auto">
        <MiniProfile />
      </div>
    </aside>
  );
}
