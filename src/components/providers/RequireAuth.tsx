"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Spinner from "../ui/Spinner/Spinner";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isChecking = useAuthStore((state) => state.isChecking);

  useEffect(() => {
    if (!isChecking && !user) {
      router.replace("/auth/login");
    }
  }, [isChecking, user, router]);

  if (isChecking || !user) {
    return <Spinner />;
  }

  return <>{children}</>;
}
