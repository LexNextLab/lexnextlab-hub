"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /** `hub` — integrado ao painel do header (sem borda própria, foco em anel suave) */
  variant?: "default" | "hub";
};

export function SearchBar({
  value,
  onChange,
  className,
  variant = "default",
}: SearchBarProps) {
  const isHub = variant === "hub";

  return (
    <div
      className={cn(
        "relative min-w-0 flex-1",
        isHub &&
          "flex h-full min-h-[3.25rem] items-stretch lg:min-h-[2.65rem]",
        className,
      )}
    >
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 z-[1] -translate-y-1/2",
          isHub
            ? "left-4 size-[1.125rem] text-[#204889]/70"
            : "left-3 size-4 text-muted-foreground",
        )}
        aria-hidden
      />
      <Input
        type="search"
        placeholder="Buscar sistemas…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          isHub
            ? [
                "h-full min-h-[3.25rem] rounded-none border-0 bg-transparent py-3 pr-4",
                "lg:min-h-[2.65rem] lg:py-2.5",
                "pl-12 text-base text-foreground/95 shadow-none transition-[box-shadow] duration-200 md:text-[15px] lg:text-sm",
                "placeholder:text-[rgb(32_72_137/0.42)]",
                "focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-[#204889]/28 focus-visible:ring-offset-0",
              ]
            : [
                "h-11 rounded-xl border-border/80 bg-card pr-3 pl-10 text-base shadow-sm",
                "focus-visible:border-primary/45 focus-visible:ring-[3px] focus-visible:ring-ln-green/25",
                "md:h-10 md:text-sm",
              ],
        )}
        aria-label="Buscar sistema"
      />
    </div>
  );
}
