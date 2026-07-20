"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout() {
  const router = useRouter();
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);
  const queryClient = useQueryClient();

  useEffect(() => {
    logout()
      .catch(() => {})
      .finally(() => {
        queryClient.clear();
        clearIsAuth();
        router.replace("/");
        router.refresh();
      });
  }, [router, clearIsAuth, queryClient]);

  return (
    <main className="min-h-screen flex items-center justify-center text-[var(--color-text-secondary)]">
      <p>Signing out…</p>
    </main>
  );
}
