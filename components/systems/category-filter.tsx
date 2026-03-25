"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SYSTEM_CATEGORIES } from "@/data/systems";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function CategoryFilter({ value, onChange, className }: CategoryFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (v != null) onChange(v);
      }}
    >
      <SelectTrigger
        className={cn(
          "h-10 w-full min-w-[160px] rounded-xl border-border bg-card shadow-sm md:w-[200px]",
          className,
        )}
        aria-label="Categoria"
      >
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        {SYSTEM_CATEGORIES.map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
