"use client";

import Link from "next/link";
import PrivacyToggle from "@/components/layout/PrivacyToggle/PrivacyToggle";
import BurgerMenu from "@/components/layout/BurgerMenu/BurgerMenu";
import { useAuthStore } from "@/lib/store/authStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="fixed top-0 left-0 z-40 isolate flex w-full items-center justify-between gap-2 border-b border-slate-700/50 bg-slate-900 px-3 py-3 backdrop-blur-md sm:gap-4 sm:px-4 md:px-6 md:py-4">
      <Link href="/" aria-label="Home" className="min-w-0">
        <h1 className="text-[clamp(1rem,3.2vw,1.5rem)] font-black tracking-tight text-slate-100">
          Just{" "}
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            To Do
          </span>{" "}
          It ⚡
        </h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        {user && <PrivacyToggle />}
        <div className="relative z-50">
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
