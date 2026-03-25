"use client";

import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  onClear: () => void;
};

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-4 py-12 text-center shadow-sm sm:px-8 sm:py-20"
      role="status"
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted">
        <FolderSearch className="size-7 text-muted-foreground" aria-hidden />
      </div>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        Nada encontrado
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Ajuste a busca ou a categoria.
      </p>
      <Button type="button" variant="outline" className="mt-6 rounded-xl" onClick={onClear}>
        Limpar filtros
      </Button>
    </div>
  );
}
