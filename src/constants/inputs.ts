export const FIELD_CLASSNAME = `
w-full
rounded-xl
border
border-[var(--color-border)]
bg-[var(--color-surface-solid)]
px-3
py-2.5
text-[clamp(0.8rem,2.2vw,0.9rem)]
text-[var(--color-text-primary)]
placeholder:text-[var(--color-text-muted)]
shadow-sm
transition-all
duration-200
hover:border-[var(--color-border-strong)]
focus:border-[var(--color-border-strong)]
focus:ring-1
focus:ring-blue-500/30
focus:outline-none
disabled:cursor-not-allowed
disabled:opacity-60
`;

export const FIELD_LABEL_CLASSNAME =
  "text-[clamp(0.8rem,2.2vw,0.875rem)] font-medium text-[var(--color-text-secondary)]";
