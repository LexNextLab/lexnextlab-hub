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

  return (
    <ul
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-xl list-none flex-col gap-3 pl-0 sm:gap-3.5",
        className,
      )}
      aria-hidden
      role="list"
    >
      {Array.from({ length: n }).map((_, i) => (
        <li key={i} className="list-none">
          <div className="flex min-h-14 w-full items-center gap-3 rounded-2xl border border-white/50 bg-card/95 px-2 py-2 shadow-sm ring-1 ring-black/[0.04] sm:min-h-[3.75rem] sm:px-3">
            <Skeleton className="size-11 shrink-0 rounded-xl sm:size-12" />
            <Skeleton className="h-4 min-w-0 flex-1 rounded-md" />
            <div className="flex shrink-0 gap-1">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
