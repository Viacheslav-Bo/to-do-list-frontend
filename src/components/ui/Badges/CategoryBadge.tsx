type Props = { category: string };

export default function CategoryBadge({ category }: Props) {
  return (
    <span className="inline-flex h-6 items-center rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-2 text-[clamp(0.68rem,1.7vw,0.75rem)] text-[var(--color-text-secondary)]">
      #{category}
    </span>
  );
}
