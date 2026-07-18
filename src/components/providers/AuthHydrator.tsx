"use client";

import { useEffect } from "react";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthHydrator() {
  const setUser = useAuthStore((state) => state.setUser);
  const setChecking = useAuthStore((state) => state.setChecking);

  useEffect(() => {
    let isMounted = true;

    getMe()
      .then((user) => {
        if (isMounted) setUser(user);
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setChecking(false);
      });

    return () => {
      isMounted = false;
    };
  }, [setUser, setChecking]);

  return null;
}
