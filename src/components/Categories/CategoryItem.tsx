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
      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
        isSelected ?
          "bg-emerald-600/10 border-emerald-500/30 text-emerald-400"
        : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
      }`}
    >
      #{category}
    </button>
  );
}
