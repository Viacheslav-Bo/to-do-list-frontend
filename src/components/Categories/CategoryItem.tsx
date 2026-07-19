type Props = {
  category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
};

export default function CategoryItem({
  category,
  isSelected,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      className={`rounded-full border px-3 py-1 text-[clamp(0.7rem,1.8vw,0.75rem)] font-bold transition-all cursor-pointer ${
        isSelected ?
          "bg-emerald-600/10 border-emerald-500/30 text-emerald-400"
        : "bg-[var(--color-surface-solid)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
      }`}
    >
      #{category}
    </button>
  );
}
