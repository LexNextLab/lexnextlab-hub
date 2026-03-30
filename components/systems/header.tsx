"use client";

import { LexNextHeaderLogo } from "@/components/systems/lexnext-header-logo";
import { HubSearchToolbar } from "@/components/systems/hub-search-toolbar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HubHeaderProps = {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
};

export function HubHeader({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: HubHeaderProps) {
  return (
    <header
      className={cn(
        "relative sticky top-0 z-50 pt-[env(safe-area-inset-top)]",
        "border-b border-white/[0.08] bg-black/40 shadow-[0_12px_40px_-16px_rgb(0_0_0/0.55)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-black/32",
      )}
    >
      {/* Linha de acento LexNext (azul → verde) — profundidade sem peso visual */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#204889]/55 to-[#b0d07a]/50 opacity-90"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl min-w-0 px-[max(0.75rem,env(safe-area-inset-left))] pt-4 pb-5 pr-[max(0.75rem,env(safe-area-inset-right))] sm:px-5 sm:pt-5 sm:pb-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:gap-6">
          {/* Mobile: marca e título centralizados · Desktop: duas colunas alinhadas à base */}
          <div
            className={cn(
              "flex flex-col gap-4",
              "items-center text-center",
              "lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:text-left",
            )}
          >
            <div
              className={cn(
                "mx-auto w-full max-w-[17rem] shrink-0 sm:max-w-[18rem]",
                "lg:mx-0 lg:max-w-[min(100%,22rem)] lg:flex-1",
              )}
            >
              <LexNextHeaderLogo
                size="large"
                variant="onDark"
                align="responsive"
              />
            </div>

            <div className="min-w-0 max-w-xl lg:max-w-[26rem] lg:shrink-0">
              <div
                className={cn(
                  "flex flex-wrap items-center justify-center gap-x-2 gap-y-1",
                  "lg:justify-end",
                )}
              >
                <h1
                  className="font-heading text-xl font-semibold tracking-[-0.02em] text-white drop-shadow-[0_1px_12px_rgb(0_0_0/0.35)] sm:text-2xl"
                  aria-label="LexNext Lab — sistemas internos do escritório"
                >
                  <span className="bg-gradient-to-r from-white via-[#f4f7fb] to-[#d2eba0] bg-clip-text text-transparent">
                    Hub
                  </span>
                </h1>
                <Badge
                  variant="outline"
                  className="h-5 border-[#b0d07a]/35 bg-[#b0d07a]/[0.08] px-2 font-mono text-[10px] font-medium tracking-[0.16em] text-[#e8f4d4] uppercase shadow-[0_0_0_1px_rgb(255_255_255/0.06)_inset]"
                >
                  interno
                </Badge>
              </div>
              <p
                className={cn(
                  "mt-2 max-w-[28ch] text-[13px] leading-relaxed text-white/60 sm:max-w-none sm:text-sm",
                  "lg:ml-auto lg:text-right",
                )}
              >
                Sistemas e ferramentas do escritório — busca e filtros abaixo.
              </p>
            </div>
          </div>

          <HubSearchToolbar
            search={search}
            onSearchChange={onSearchChange}
            category={category}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </header>
  );
}
