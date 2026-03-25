"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SearchBar({ value, onChange, className }: SearchBarProps) {
  return (
    <div className={cn("relative min-w-0 flex-1", className)}>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        placeholder="Buscar pelo nome…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl border-border/80 bg-card pr-3 pl-10 text-base shadow-sm focus-visible:border-primary/45 focus-visible:ring-[3px] focus-visible:ring-ln-green/25 md:h-10 md:text-sm"
        aria-label="Buscar sistema"
      />
    </div>
  );
}
