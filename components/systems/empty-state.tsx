"use client";

import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  onClear: () => void;
};

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-xl flex-col items-center justify-center rounded-2xl px-4 py-12 text-center sm:px-8 sm:py-20",
        "border border-white/25 bg-white/[0.97] shadow-[0_12px_40px_-16px_rgb(0_0_0/0.35)] ring-1 ring-black/[0.05]",
      )}
      role="status"
    >
      <div
        className={cn(
          "mb-5 flex size-16 items-center justify-center rounded-2xl",
          "bg-gradient-to-br from-[#204889]/12 via-white to-[#b0d07a]/20",
          "ring-1 ring-[#204889]/10",
        )}
      >
        <FolderSearch
          className="size-8 text-[#204889]/70"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
      <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        Nada encontrado
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Ajuste a busca ou a categoria.
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-7 rounded-xl border-[#204889]/25 bg-white shadow-sm transition-colors hover:border-[#204889]/40 hover:bg-[#204889]/[0.04]"
        onClick={onClear}
      >
        Limpar filtros
      </Button>
    </div>
  );
}
