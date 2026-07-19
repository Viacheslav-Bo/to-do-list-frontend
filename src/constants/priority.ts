export const PRIORITY_TIERS = [
  { key: "high", label: "High", color: "bg-rose-500" },
  { key: "medium", label: "Medium", color: "bg-amber-500" },
  { key: "low", label: "Low", color: "bg-emerald-500" },
] as const;

export const PRIORITY = {
  HIGH: 8,
  MEDIUM: 4,
};
