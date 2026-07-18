'use client';

import { usePrivacyStore } from '@/lib/store/privacyStore';

export default function PrivacyToggle() {
  const isPrivacyModeOn = usePrivacyStore((state) => state.isPrivacyModeOn);
  const toggle = usePrivacyStore((state) => state.toggle);

  return (
    <button
      onClick={toggle}
      type="button"
      title="Розмивати приватні таски у списку"
      className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
        isPrivacyModeOn
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
      }`}
    >
      {isPrivacyModeOn ? (
        <span>👁️‍🗨️ Privacy On</span>
      ) : (
        <span>👁️ Privacy Off</span>
      )}
    </button>
  );
}
