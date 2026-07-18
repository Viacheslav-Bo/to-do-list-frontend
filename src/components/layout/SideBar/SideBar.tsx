"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SidebarFilters from "./SidebarFilters";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

const NAV_ITEMS = [{ href: "/tasks", label: "My tasks", icon: "📋" }];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearIsAuth();
      router.push("/");
    }
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-20 bottom-0 w-56 shrink-0 bg-slate-900/40 border-r border-slate-800 p-4 gap-4 overflow-y-auto">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ?
                  "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-2 border-t border-slate-800">
        <SidebarFilters />
      </div>

      <div className="mt-auto pt-2 border-t border-slate-800">
        <Button variant="secondary" onClick={handleLogout} className="w-full">
          Log out
        </Button>
      </div>
    </aside>
  );
}
