type Props = { category: string };

export default function CategoryBadge({ category }: Props) {
  return (
    <span className="inline-flex h-6 items-center rounded border border-slate-700 bg-slate-800/50 px-2 text-[clamp(0.68rem,1.7vw,0.75rem)] text-slate-400">
      #{category}
    </span>
  );
}
