"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { getErrorMessage } from "@/types/apiError";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";

export default function SignIn() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setIsSubmitting(true);
    try {
      const formValues = Object.fromEntries(
        formData,
      ) as unknown as LoginRequest;
      const user = await login(formValues);
      setUser(user);
      router.push("/tasks");
    } catch (err) {
      setError(getErrorMessage(err, "Invalid email or password"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen justify-center bg-[#0B0F19] px-3 py-20 sm:px-6 sm:py-24 lg:px-8">
      <form
        action={handleSubmit}
        className="flex h-fit w-full max-w-sm flex-col gap-4 rounded-xl border border-slate-800 bg-slate-700/40 p-4 shadow-sm sm:p-6"
      >
        <h1 className="mb-2 text-[clamp(1.1rem,2.8vw,1.25rem)] font-semibold text-slate-100">
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

        <p className="text-center text-[clamp(0.8rem,2.2vw,0.875rem)] text-slate-500">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </main>
  );
}
