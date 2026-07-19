type Props = {
  label: string;
  color: string;
};

export default function StatusBadge({ label, color }: Props) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded border px-2 text-[clamp(0.68rem,1.7vw,0.75rem)] ${color}`}
    >
      {label}
    </span>
  );
}
