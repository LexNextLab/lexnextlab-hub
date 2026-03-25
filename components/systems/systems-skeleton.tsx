import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SystemsSkeleton({
  className,
  count = 1,
}: {
  className?: string;
  count?: number;
}) {
  const n = Math.max(1, count);
  const single = n === 1;

  return (
    <div
      className={cn(
        "grid",
        single
          ? "mx-auto w-full max-w-xl grid-cols-1 gap-6"
          : "grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 2xl:grid-cols-4",
        className,
      )}
      aria-hidden
    >
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="flex min-h-[300px] flex-col rounded-2xl border border-border bg-card p-5 pb-6 shadow-sm"
        >
          <Skeleton className="size-14 shrink-0 rounded-xl" />
          <Skeleton className="mt-4 h-5 w-2/3 rounded-md" />
          <Skeleton className="mt-2 h-3 w-20 rounded-md" />
          <Skeleton className="mt-3 h-12 flex-1 rounded-lg" />
          <Skeleton className="mt-4 h-11 w-full rounded-xl" />
          <Skeleton className="mt-2 h-11 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
