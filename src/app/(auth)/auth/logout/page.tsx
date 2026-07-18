"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function Logout() {
  const router = useRouter();
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  useEffect(() => {
    logout()
      .catch(() => {})
      .finally(() => {
        clearIsAuth();
        router.push("/");
      });
  }, [router, clearIsAuth]);

  return (
    <main className="min-h-screen flex items-center justify-center text-slate-400">
      <p>Signing out…</p>
    </main>
  );
}
