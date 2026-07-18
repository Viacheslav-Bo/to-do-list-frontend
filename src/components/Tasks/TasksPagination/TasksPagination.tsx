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
    <div className="flex items-center justify-center gap-3 pt-2">
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ←
      </Button>
      <span className="text-sm text-slate-400">
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
