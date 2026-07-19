type Props = { category: string };

export default function CategoryBadge({ category }: Props) {
  return (
    <span className="inline-flex items-center h-6 px-2 text-[10px] rounded border border-slate-700 text-slate-400 bg-slate-800/50">
      #{category}
    </span>
  );
}
