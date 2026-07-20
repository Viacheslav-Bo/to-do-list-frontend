"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const hasSidebar = pathname.startsWith("/tasks");

  return (
    <footer
      className={`py-4 text-center text-xs text-[var(--color-text-secondary)] ${
        hasSidebar ? "lg:pl-64" : ""
      }`}
    >
      <p className="flex items-center justify-center gap-1">
        Created by{" "}
        <a
          href="https://github.com/Viacheslav-Bo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition hover:text-[var(--color-text-primary)] hover:underline"
        >
          Viacheslav Bo
        </a>{" "}
        <time dateTime="2026">2026</time>
      </p>
    </footer>
  );
}
