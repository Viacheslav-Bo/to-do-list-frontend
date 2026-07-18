"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await logout();
    } finally {
      clearIsAuth();
      router.push("/");
    }
  };

  return (
    <div ref={menuRef} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Menu"
        aria-expanded={isOpen}
        className="flex flex-col justify-center gap-1.5 w-9 h-9 items-center cursor-pointer"
      >
        <span
          className={`block w-5 h-0.5 bg-slate-200 transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-slate-200 transition-opacity ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-slate-200 transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-2 flex flex-col gap-1 z-50">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/60"
          >
            Home
          </Link>

          {user ?
            <>
              <Link
                href="/tasks"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/60"
              >
                📋 My tasks
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-sm text-left text-rose-400 hover:bg-slate-800/60 cursor-pointer"
              >
                Log out
              </button>
            </>
          : <>
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/60"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-blue-400 hover:bg-slate-800/60"
              >
                Sign up
              </Link>
            </>
          }
        </div>
      )}
    </div>
  );
}
