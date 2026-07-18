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
    <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
      <div className="flex-1 min-w-0 text-center">
        <p className="text-sm text-slate-200 truncate" title={displayName}>
          {displayName}
        </p>
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="w-full mt-2"
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
