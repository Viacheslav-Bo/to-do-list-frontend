import Button from "@/components/ui/Button/Button";

type Props = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
};

export default function LoadMore({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: Props) {
  if (!hasNextPage) return null;

  return (
    <div className="flex justify-center pt-2">
      <Button
        variant="secondary"
        onClick={onLoadMore}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
}
