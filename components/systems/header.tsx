"use client";

import Link from "next/link";
import { Bell, LayoutDashboard, ScrollText } from "lucide-react";
import { LexNextHeaderLogo } from "@/components/systems/lexnext-header-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CategoryFilter } from "@/components/systems/category-filter";
import { SearchBar } from "@/components/systems/search-bar";

type HubHeaderProps = {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
};

function HeaderActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex shrink-0 items-center gap-1.5 sm:gap-2", className)}>
      <Link
        href="/atualizacoes"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "h-10 gap-1.5 rounded-full border-border/80 bg-card px-3 shadow-sm no-underline",
        )}
      >
        <ScrollText
          className="size-[18px] text-primary"
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="hidden sm:inline">Atualizações</span>
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-10 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Notificações — recurso em breve"
        title="Central de notificações em breve"
      >
        <Bell className="size-[18px]" strokeWidth={1.75} aria-hidden />
      </Button>
    </div>
  );
}

export function HubHeader({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: HubHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-card/95 shadow-[0_4px_28px_-10px_rgb(32_72_137/0.14)] backdrop-blur-xl supports-[backdrop-filter]:bg-card/88">
      <div className="mx-auto max-w-7xl px-3 pt-3 pb-3 sm:px-5 sm:pt-4 sm:pb-4 lg:px-8">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Identidade: mobile = logo + ações; lg = 3 colunas (marca | título | ações) */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] lg:items-center lg:gap-5">
            <div className="flex min-w-0 items-center justify-between gap-2 lg:justify-start lg:gap-3">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-primary/[0.14] sm:size-10"
                  aria-hidden
                >
                  <LayoutDashboard
                    className="size-[16px] sm:size-[18px]"
                    strokeWidth={2}
                  />
                </div>
                <LexNextHeaderLogo />
              </div>
              <HeaderActions className="lg:hidden" />
            </div>

            <div className="min-w-0 lg:px-2 lg:text-center">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 lg:justify-center">
                <h1
                  className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg lg:text-xl"
                  aria-label="LexNext Lab — sistemas internos do escritório"
                >
                  <span className="text-ln-gradient">Hub</span>
                </h1>
                <Badge
                  variant="outline"
                  className="h-5 border-primary/20 bg-primary/[0.04] px-2 font-mono text-[10px] font-medium tracking-[0.14em] text-primary uppercase"
                >
                  interno
                </Badge>
              </div>
              <p className="mt-0.5 max-w-prose text-xs leading-snug text-muted-foreground sm:text-[13px] lg:mx-auto">
                Sistemas e ferramentas do escritório — busca e filtros abaixo.
              </p>
            </div>

            <HeaderActions className="hidden lg:flex lg:justify-end" />
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted/25 p-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.65)] sm:p-2.5">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-2.5 min-[480px]:flex-row min-[480px]:items-stretch xl:max-w-none xl:flex-row xl:items-center">
              <SearchBar
                value={search}
                onChange={onSearchChange}
                className="min-w-0 flex-1"
              />
              <CategoryFilter
                value={category}
                onChange={onCategoryChange}
                className="w-full min-w-0 shrink-0 min-[480px]:w-[min(100%,12.5rem)] xl:w-[200px]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
