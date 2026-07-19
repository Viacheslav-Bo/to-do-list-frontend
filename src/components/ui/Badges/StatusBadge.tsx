type Props = {
  label: string;
  color: string;
};

export default function StatusBadge({ label, color }: Props) {
  return (
    <span
      className={`inline-flex items-center h-6 px-2 text-[10px] rounded border ${color}`}
    >
      {label}
    </span>
  );
}
