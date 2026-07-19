"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { getErrorMessage } from "@/types/apiError";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setIsSubmitting(true);
    try {
      const formValues = Object.fromEntries(
        formData,
      ) as unknown as RegisterRequest;
      const user = await register(formValues);
      setUser(user);
      router.push("/tasks");
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] flex justify-center pt-32 p-6">
      <form
        action={handleSubmit}
        className="w-full max-w-sm h-fit flex flex-col gap-4 p-6 bg-slate-700/40 border border-slate-800 rounded-xl shadow-sm"
      >
        <h1 className="text-xl font-semibold text-slate-100 mb-2">Sign up</h1>

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

        <p className="text-sm text-slate-500 text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
};

export default SignUp;
