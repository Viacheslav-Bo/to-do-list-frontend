"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import Button from "@/components/ui/Button/Button";

export default function MiniProfile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearIsAuth();
      router.push("/");
    }
  };

  if (!user) return null;

  const displayName = user.name?.trim() || user.email;

  return (
    <div className="flex items-center gap-3 border-t border-slate-800 pt-3">
      <div className="min-w-0 flex-1 text-center">
        <p
          className="truncate text-[clamp(0.8rem,2.2vw,0.875rem)] text-slate-200"
          title={displayName}
        >
          {displayName}
        </p>
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="mt-2 w-full text-[clamp(0.8rem,2.2vw,0.875rem)]"
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
