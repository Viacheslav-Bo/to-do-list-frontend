"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { getErrorMessage } from "@/types/apiError";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import toast from "react-hot-toast";
import Link from "next/link";

const SignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(
      formData,
    ) as unknown as RegisterRequest;

    if (!formValues.name || formValues.name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    if (
      !formValues.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
    ) {
      setError("Please enter a valid email");
      return;
    }
    if (!formValues.password || formValues.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await register(formValues);
      queryClient.clear();
      setUser(user);
      toast.success(`Account created — welcome, ${user.name ?? user.email}!`);
      router.push("/tasks");
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed."));
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
          Sign up
        </h1>

        <Input
          id="name"
          name="name"
          type="text"
          label="Name"
          required
          minLength={2}
        />
        <Input id="email" name="email" type="email" label="Email" required />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          minLength={6}
        />

        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? "Creating account…" : "Register"}
        </Button>

        {error && (
          <p className="text-sm text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
            {error}
          </p>
        )}

        <p className="text-center text-[clamp(0.8rem,2.2vw,0.875rem)] text-[var(--color-text-muted)]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignUp;
