"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { getErrorMessage } from "@/types/apiError";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function SignIn() {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData) as unknown as LoginRequest;

    if (!formValues.email || !formValues.password) {
      setError("Please fill in both fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await login(formValues);
      queryClient.clear();
      setUser(user);
      toast.success(`Welcome back, ${user.name ?? user.email}`);
      router.push("/tasks");
    } catch (err) {
      setError(getErrorMessage(err, "Invalid email or password"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen justify-center bg-[var(--color-bg)] px-3 py-20 sm:px-6 sm:py-24 lg:px-8">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex h-fit w-full max-w-sm flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-6"
      >
        <h1 className="mb-2 text-[clamp(1.1rem,2.8vw,1.25rem)] font-semibold text-[var(--color-text-primary)]">
          Sign in
        </h1>

        <Input id="email" name="email" type="email" label="Email" required />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          required
        />

        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? "Logging in…" : "Log in"}
        </Button>

        {error && (
          <p className="text-sm text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
            {error}
          </p>
        )}

        <p className="text-center text-[clamp(0.8rem,2.2vw,0.875rem)] text-[var(--color-text-muted)]">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
