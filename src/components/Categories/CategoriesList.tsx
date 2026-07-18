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
    <div className="flex flex-wrap gap-1.5 pt-2">
      <span className="text-xs text-slate-500 self-center mr-1">
        Categories:
      </span>

      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
          selectedCategory === null ?
            "bg-emerald-600/10 border-emerald-500/30 text-emerald-400"
          : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
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
