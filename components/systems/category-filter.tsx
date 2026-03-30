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
  variant?: "default" | "hub";
};

export function CategoryFilter({
  value,
  onChange,
  className,
  variant = "default",
}: CategoryFilterProps) {
  const isHub = variant === "hub";

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (v != null) onChange(v);
      }}
    >
      <SelectTrigger
        className={cn(
          "min-w-0 w-full",
          isHub
            ? [
                "!h-[3.25rem] min-h-[3.25rem] rounded-none border-0 bg-transparent px-4",
                "text-sm font-medium text-foreground shadow-none transition-colors duration-200 md:text-[15px]",
                "hover:bg-[rgb(32_72_137/0.04)]",
                "focus-visible:ring-2 focus-visible:ring-[#204889]/28 focus-visible:ring-offset-0",
              ]
            : "h-11 rounded-xl border-border bg-card shadow-sm md:h-10",
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
