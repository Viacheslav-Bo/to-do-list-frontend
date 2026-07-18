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
    <main className="min-h-screen bg-[#0B0F19] flex justify-center pt-32 p-6">
      <form
        action={handleSubmit}
        className="w-full max-w-sm h-fit flex flex-col gap-4 p-6 bg-slate-900/40 border border-slate-800 rounded-xl shadow-sm"
      >
        <h1 className="text-xl font-semibold text-slate-100 mb-2">Sign in</h1>

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

        <p className="text-sm text-slate-500 text-center">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </main>
  );
}
