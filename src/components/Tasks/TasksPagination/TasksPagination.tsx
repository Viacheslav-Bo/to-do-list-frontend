import Button from "@/components/ui/Button/Button";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function TasksPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-2 sm:gap-3">
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ←
      </Button>
      <span className="text-[clamp(0.8rem,2.2vw,0.875rem)] text-slate-400">
        {page} / {totalPages}
      </span>
      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        →
      </Button>
    </div>
  );
}
