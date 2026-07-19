import React from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue-600 hover:bg-blue-500 text-white",
  secondary:
    "bg-[var(--color-surface)] hover:bg-[var(--color-surface-solid)] text-[var(--color-text-primary)]",
  danger: "bg-rose-600/80 hover:bg-rose-500 text-white",
  ghost:
    "bg-transparent hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)]",
};

export default function Button({
  variant = "primary",
  className = "",
  ...rest
}: Props) {
  return (
    <button
      className={`rounded-lg px-4 py-2 text-[clamp(0.8rem,2.2vw,0.875rem)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${variantClasses[variant]} ${className}`}
      {...rest}
    />
  );
}
