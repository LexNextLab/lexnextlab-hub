"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { OfficeBI } from "@/data/office-bis";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const rowMotion = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
};

function BiListRow({ item }: { item: OfficeBI }) {
  const url = item.url?.trim() ?? "";
  const canOpen = Boolean(url);

  return (
    <div className="min-w-0">
      <div
        className={cn(
          "group/row flex min-h-14 w-full min-w-0 items-center gap-2 rounded-2xl border border-white/60 bg-card/98 px-2 py-2",
          "shadow-[0_4px_24px_-12px_rgb(0_0_0/0.28),0_1px_0_0_rgb(255_255_255/0.85)_inset]",
          "ring-1 ring-black/[0.04] transition-[box-shadow,border-color,transform] duration-200 sm:min-h-[3.75rem] sm:gap-3 sm:px-3",
          canOpen
            ? [
                "hover:border-[#204889]/18 hover:shadow-[0_8px_32px_-14px_rgb(0_0_0/0.35)]",
                "motion-safe:active:scale-[0.995]",
              ]
            : "opacity-80",
        )}
      >
        <button
          type="button"
          disabled={!canOpen}
          onClick={() => canOpen && window.open(url, "_blank", "noopener,noreferrer")}
          className={cn(
            "flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-xl text-left outline-none",
            "focus-visible:ring-2 focus-visible:ring-[#204889]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            canOpen ? "cursor-pointer" : "cursor-not-allowed opacity-90",
          )}
          aria-label={
            canOpen
              ? `Abrir ${item.name} em nova aba`
              : `${item.name} — URL não configurada em data/office-bis.ts`
          }
        >
          <div
            className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-zinc-700 sm:size-12"
            aria-hidden
          >
            <BarChart3 className="size-5 text-[#b0d07a]/90 sm:size-[1.35rem]" />
          </div>
          <span className="min-w-0 flex-1 text-left">
            <span className="line-clamp-2 text-sm font-semibold tracking-[-0.01em] text-foreground sm:text-[15px]">
              {item.name}
            </span>
            {item.description ? (
              <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted-foreground">
                {item.description}
              </span>
            ) : null}
          </span>
          <ChevronRight
            className="size-5 shrink-0 text-[#204889]/45 opacity-90 transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-[#204889]/65"
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}

function BiEmptyState() {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-xl rounded-2xl border border-dashed border-white/20 bg-white/[0.04] px-4 py-10 text-center",
        "text-sm leading-relaxed text-white/65",
      )}
    >
      <p className="font-medium text-white/85">Nenhum BI cadastrado ainda.</p>
      <p className="mt-2 text-xs text-white/50">
        Adicione os painéis em{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-[#d8eeb3]">
          data/office-bis.ts
        </code>{" "}
        (nome, URL e descrição opcional).
      </p>
    </div>
  );
}

type BiListProps = {
  items: OfficeBI[];
  className?: string;
};

/** Skeleton alinhado à linha de BI (sem botões extras do card de sistema). */
export function BiListSkeleton({
  className,
  count = 3,
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
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-[min(100%,14rem)] rounded-md" />
              <Skeleton className="h-3 w-[min(100%,10rem)] rounded-md opacity-70" />
            </div>
            <Skeleton className="size-5 shrink-0 rounded opacity-60" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function BiList({ items, className }: BiListProps) {
  const reduceMotion = useReducedMotion();

  if (items.length === 0) {
    return <BiEmptyState />;
  }

  const listClass = cn(
    "mx-auto flex w-full min-w-0 max-w-xl list-none flex-col gap-3 pl-0 sm:gap-3.5",
    className,
  );

  if (reduceMotion) {
    return (
      <ul className={listClass} role="list" aria-labelledby="hub-tab-bis">
        {items.map((item) => (
          <li key={item.id} className="list-none">
            <BiListRow item={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className={listClass}
      variants={container}
      initial="hidden"
      animate="show"
      role="list"
      aria-labelledby="hub-tab-bis"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={rowMotion} className="list-none">
          <BiListRow item={item} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
