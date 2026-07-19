"use client";

import Link from "next/link";
import PrivacyToggle from "@/components/layout/PrivacyToggle/PrivacyToggle";
import BurgerMenu from "@/components/layout/BurgerMenu/BurgerMenu";
import { useAuthStore } from "@/lib/store/authStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="fixed top-0 left-0 w-full z-40 isolate bg-slate-900 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between gap-4 px-6 py-4">
      <Link href="/" aria-label="Home">
        <h1 className="text-2xl font-black tracking-tight text-slate-100">
          Just{" "}
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            To Do
          </span>{" "}
          It ⚡
        </h1>
      </Link>

      <div className="flex items-center gap-3">
        {user && <PrivacyToggle />}
        <div className="relative z-50">
          {" "}
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
