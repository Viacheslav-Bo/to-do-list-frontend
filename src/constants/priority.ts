export const PRIORITY_TIERS = [
  {
    key: "high",
    label: "High",
    color: "bg-rose-500",
    active: "border-rose-500/60 bg-rose-500/25 text-rose-200",
    inactive:
      "border-rose-500/20 bg-rose-500/5 text-rose-400/70 hover:bg-rose-500/15 hover:border-rose-500/40 hover:text-rose-300",
  },
  {
    key: "medium",
    label: "Medium",
    color: "bg-amber-500",
    active: "border-amber-500/60 bg-amber-500/25 text-amber-200",
    inactive:
      "border-amber-500/20 bg-amber-500/5 text-amber-400/70 hover:bg-amber-500/15 hover:border-amber-500/40 hover:text-amber-300",
  },
  {
    key: "low",
    label: "Low",
    color: "bg-emerald-500",
    active: "border-emerald-500/60 bg-emerald-500/25 text-emerald-200",
    inactive:
      "border-emerald-500/20 bg-emerald-500/5 text-emerald-400/70 hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:text-emerald-300",
  },
] as const;

export const PRIORITY = {
  HIGH: 8,
  MEDIUM: 4,
};

export const PRIORITY_CLASSES = {
  high: {
    active:
      "border-[var(--priority-high-border)] bg-[var(--priority-high-bg)] text-[var(--priority-high-text)] shadow-md",
    default:
      "border-[var(--priority-high-border)] bg-transparent text-[var(--priority-high-text)] hover:-translate-y-0.5 hover:bg-[var(--priority-high-bg)] hover:shadow-sm",
  },

  medium: {
    active:
      "border-[var(--priority-medium-border)] bg-[var(--priority-medium-bg)] text-[var(--priority-medium-text)] shadow-md",
    default:
      "border-[var(--priority-medium-border)] bg-transparent text-[var(--priority-medium-text)] hover:-translate-y-0.5 hover:bg-[var(--priority-medium-bg)] hover:shadow-sm",
  },

  low: {
    active:
      "border-[var(--priority-low-border)] bg-[var(--priority-low-bg)] text-[var(--priority-low-text)] shadow-md",
    default:
      "border-[var(--priority-low-border)] bg-transparent text-[var(--priority-low-text)] hover:-translate-y-0.5 hover:bg-[var(--priority-low-bg)] hover:shadow-sm",
  },
} as const;
