"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import Button from "@/components/ui/Button/Button";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function MiniProfile() {
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
    } finally {
      window.location.href = "/";
    }
  };

  if (!user) return null;

  const displayName = user.name?.trim() || user.email;

  return (
    <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-3">
      <div className="min-w-0 flex-1 text-center">
        <p
          className="truncate text-[clamp(0.8rem,2.2vw,0.875rem)] text-[var(--color-text-primary)]"
          title={displayName}
        >
          {displayName}
        </p>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="mt-2 w-full border border-rose-500/20 text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/10"
        >
          Log out
          <LogOut size={16} />
        </Button>
      </div>
    </div>
  );
}
