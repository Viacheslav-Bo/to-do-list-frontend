"use client";

import { usePrivacyStore } from "@/lib/store/privacyStore";
import { Shield, ShieldCheck } from "lucide-react";

export default function PrivacyToggle() {
  const isPrivacyModeOn = usePrivacyStore((state) => state.isPrivacyModeOn);
  const toggle = usePrivacyStore((state) => state.toggle);

  return (
    <button
      onClick={toggle}
      type="button"
      title="Blur private tasks in the list"
      className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[clamp(0.75rem,2vw,0.875rem)] font-medium transition-all duration-200 sm:gap-2 sm:px-4 ${
        isPrivacyModeOn ?
          "border-[var(--privacy-border)] bg-[var(--privacy-bg)] text-[var(--privacy-text)]"
        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]"
      }`}
    >
      {isPrivacyModeOn ?
        <>
          <ShieldCheck size={16} />
          <span>Privacy On</span>
        </>
      : <>
          <Shield size={16} />
          <span>Privacy Off</span>
        </>
      }
    </button>
  );
}
