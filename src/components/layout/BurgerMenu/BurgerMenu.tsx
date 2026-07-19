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
        className="p-2 text-[var(--color-text-primary)]"
      >
        <Menu size={24} />
      </button>

      {isOpen &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="flex h-full w-full max-w-xs flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl sm:max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-4 sm:p-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
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

                    <div className="flex flex-col gap-8 border-t border-[var(--color-border)] pt-8">
                      <UpcomingDeadlines />
                      <PriorityBreakdown />
                    </div>

                    <div className="mt-auto border-t border-[var(--color-border)] pt-8">
                      <MiniProfile />
                    </div>
                  </>
                : <div className="flex flex-1 flex-col items-center justify-center gap-4">
                    <p className="mb-2 text-[clamp(0.8rem,2.2vw,0.875rem)] text-[var(--color-text-muted)]">
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
                      className="w-full max-w-xs text-center rounded-lg border border-[var(--color-border)] px-4 py-3 font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                    >
                      Log in
                    </Link>
                  </div>
                }
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
