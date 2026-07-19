import CategoryItem from "./CategoryItem";

type Props = {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
};

export default function CategoriesList({
  categories,
  selectedCategory,
  onSelect,
}: Props) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-2">
      <span className="mr-1 self-center text-[clamp(0.7rem,1.8vw,0.75rem)] text-[var(--color-text-muted)]">
        Categories:
      </span>

      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`rounded-full border px-3 py-1 text-[clamp(0.7rem,1.8vw,0.75rem)] font-bold transition-all cursor-pointer ${
          selectedCategory === null ?
            "bg-emerald-600/10 border-emerald-500/30 text-emerald-400"
          : "bg-[var(--color-surface-solid)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <CategoryItem
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
