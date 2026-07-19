"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/ui/Button/Button";

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center gap-4 px-4 py-8 text-center sm:gap-6 sm:px-6 lg:px-8 3xl:mx-auto 3xl:max-w-6xl">
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[var(--color-text-primary)]">
        Just{" "}
        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          To Do
        </span>{" "}
        It ⚡
      </h1>
      <p className="max-w-md text-[clamp(0.875rem,2.2vw,1rem)] text-[var(--color-text-secondary)]">
        A simple fast task manager: search, priorities, filters, and deadlines —
        everything you need, nothing extra.
      </p>

      <Link href={user ? "/tasks" : "/auth/register"}>
        <Button variant="primary" className="px-6 py-3 sm:px-8 sm:py-3">
          {user ? "Go to tasks" : "Start for free"}
        </Button>
      </Link>
    </div>
  );
}
