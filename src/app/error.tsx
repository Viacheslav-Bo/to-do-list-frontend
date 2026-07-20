"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold text-[var(--color-text-primary)]">
        Something went wrong
      </h1>
      <p className="max-w-sm text-[clamp(0.9rem,2.2vw,1rem)] text-[var(--color-text-secondary)]">
        An unexpected error occurred. Try again, or head back to the home page.
      </p>
      <div className="mt-2 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link
          href="/"
          className="rounded-lg border border-[var(--color-border)] px-4 py-2 font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
