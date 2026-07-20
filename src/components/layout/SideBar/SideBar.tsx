"use client";

import UpcomingDeadlines from "@/components/Tasks/UpcomingDeadlines/UpcomingDeadlines";
import PriorityBreakdown from "@/components/Tasks/PriorityBreakdown/PriorityBreakdown";
import MiniProfile from "@/components/layout/MiniProfile/MiniProfile";
import Navigation from "@/components/layout/Navigation/Navigation";

export default function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-16 hidden w-64 shrink-0 flex-col gap-8 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:flex">
      <div className="mb-8">
        <Navigation />
      </div>

      <div className="border-t border-[var(--color-border)] pt-5">
        <UpcomingDeadlines />
      </div>

      <div className="border-t border-[var(--color-border)] pt-5">
        <PriorityBreakdown />
      </div>

      <div className="mt-auto">
        <MiniProfile />
      </div>
    </aside>
  );
}
