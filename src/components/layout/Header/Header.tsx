"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PrivacyToggle from "@/components/layout/PrivacyToggle/PrivacyToggle";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

const Header = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isChecking = useAuthStore((state) => state.isChecking);
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
    <header className="fixed top-0 left-0 w-full z-40 shadow-md bg-gray-900 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-6 py-4">
      <Link href="/" aria-label="Home">
        <h1 className="text-2xl font-black tracking-tight text-slate-100">
          Just{" "}
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            To Do
          </span>{" "}
          It ⚡
        </h1>
      </Link>

      <nav aria-label="Main Navigation" className="md:hidden">
        <ul className="flex items-center gap-6 text-white text-sm">
          <li>
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link href="/tasks" className="hover:text-blue-400">
                Tasks
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        {user && <PrivacyToggle />}

        {!isChecking && (
          <>
            {user ?
              <Button variant="secondary" onClick={handleLogout}>
                Log out
              </Button>
            : <>
                <Link href="/auth/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary">Sign up</Button>
                </Link>
              </>
            }
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
