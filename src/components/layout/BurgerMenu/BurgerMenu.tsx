"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import UpcomingDeadlines from "@/components/Tasks/UpcomingDeadlines/UpcomingDeadlines";
import PriorityBreakdown from "@/components/Tasks/PriorityBreakdown/PriorityBreakdown";
import Navigation from "@/components/layout/Navigation/Navigation";
import { X, Menu } from "lucide-react";
import MiniProfile from "../MiniProfile/MiniProfile";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-200"
      >
        <Menu size={24} />
      </button>

      {isOpen &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900">
            <div className="flex justify-end p-4 sm:p-6">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-6 sm:px-6 sm:gap-8">
              {user ?
                <>
                  <div onClick={() => setIsOpen(false)}>
                    <Navigation />
                  </div>

                  <div className="pt-8 border-t border-slate-800 flex flex-col gap-8">
                    <UpcomingDeadlines />
                    <PriorityBreakdown />
                  </div>

                  <div className="mt-auto pt-8 border-t border-slate-800">
                    <MiniProfile />
                  </div>
                </>
              : <div className="flex flex-1 flex-col items-center justify-center gap-4">
                  <p className="mb-2 text-[clamp(0.8rem,2.2vw,0.875rem)] text-slate-500">
                    Sign in to manage your tasks
                  </p>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full max-w-xs text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 text-white font-semibold"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full max-w-xs text-center px-4 py-3 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800/60 font-medium"
                  >
                    Log in
                  </Link>
                </div>
              }
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
