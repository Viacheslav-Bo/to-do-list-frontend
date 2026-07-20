import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-[clamp(3rem,10vw,5rem)] font-black tracking-tight text-[var(--color-text-primary)]">
        4
        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          0
        </span>
        4
      </h1>
      <p className="text-[clamp(0.95rem,2.5vw,1.1rem)] text-[var(--color-text-secondary)]">
        This page doesn&apos;t exist — it might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 px-5 py-2.5 font-semibold text-white transition hover:from-blue-400 hover:to-emerald-400"
      >
        Back to home
      </Link>
    </div>
  );
}
