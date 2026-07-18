"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/ui/Button/Button";

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center gap-6 text-center px-6">
      <h1 className="text-4xl font-black text-slate-100">
        Just{" "}
        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          To Do
        </span>{" "}
        It ⚡
      </h1>
      <p className="text-slate-400 max-w-md">
        Простий і швидкий таск-менеджер: пошук, пріоритети, фільтри та дедлайни
        — все, що треба, і нічого зайвого.
      </p>

      <Link href={user ? "/tasks" : "/auth/register"}>
        <Button variant="primary" className="px-8 py-3 text-base">
          {user ? "Перейти до тасок" : "Почати безкоштовно"}
        </Button>
      </Link>
    </div>
  );
}
