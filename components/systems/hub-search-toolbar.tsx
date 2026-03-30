"use client";

import { SearchBar } from "@/components/systems/search-bar";
import { CategoryFilter } from "@/components/systems/category-filter";
import { cn } from "@/lib/utils";

type HubSearchToolbarProps = {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  className?: string;
};

/**
 * Painel de busca — superfície elevada, foco coeso (frontend-design: profundidade + acento de marca).
 */
export function HubSearchToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  className,
}: HubSearchToolbarProps) {
  return (
    <div className={cn("w-full min-w-0", className)}>
      <div
        className={cn(
          "group/search rounded-[1.2rem] p-px",
          "bg-gradient-to-br from-white/60 via-white/28 to-[#b0d07a]/50",
          "shadow-[0_16px_48px_-18px_rgb(0_0_0/0.6),0_1px_0_0_rgb(255_255_255/0.45)_inset]",
          "transition-shadow duration-300",
          "focus-within:shadow-[0_16px_48px_-18px_rgb(0_0_0/0.6),0_0_0_3px_rgb(32_72_137/0.18),0_1px_0_0_rgb(255_255_255/0.45)_inset]",
        )}
      >
        <div
          className={cn(
            "overflow-hidden rounded-[1.14rem]",
            "bg-gradient-to-b from-white from-0% via-white via-45% to-[#f2f5fa]",
            "ring-1 ring-[rgb(32_72_137/0.07)]",
          )}
        >
          <div
            className={cn(
              "flex min-h-[3.25rem] flex-col divide-y divide-[rgb(32_72_137/0.09)]",
              "sm:flex-row sm:divide-x sm:divide-y-0 sm:divide-[rgb(32_72_137/0.11)]",
            )}
          >
            <div className="min-w-0 flex-1">
              <SearchBar
                value={search}
                onChange={onSearchChange}
                variant="hub"
              />
            </div>
            <div className="w-full shrink-0 sm:w-[min(100%,13.5rem)] xl:w-[15rem]">
              <CategoryFilter
                value={category}
                onChange={onCategoryChange}
                variant="hub"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] font-medium tracking-[0.06em] text-white/40 sm:text-left lg:text-[11px]">
        Busca por nome ou palavras-chave · filtro por área
      </p>
    </div>
  );
}
