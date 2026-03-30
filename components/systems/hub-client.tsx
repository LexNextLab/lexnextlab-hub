"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HubThreeBackground } from "@/components/background/hub-three-background";
import FadeContent from "@/components/FadeContent";
import { systems } from "@/data/systems";
import { HubHeader } from "@/components/systems/header";
import { LexNextHeaderLogo } from "@/components/systems/lexnext-header-logo";
import { EmptyState } from "@/components/systems/empty-state";
import { SystemList } from "@/components/systems/system-list";
import { SystemsSkeleton } from "@/components/systems/systems-skeleton";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useSystemsFilter } from "@/lib/hooks/use-systems-filter";
import { FAVORITES_KEY } from "@/lib/recent";
import type { System } from "@/data/systems";

export function HubClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useLocalStorage<number[]>(FAVORITES_KEY, []);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useSystemsFilter(systems, search, category);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const displaySystems = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const af = favoriteSet.has(a.id) ? 0 : 1;
      const bf = favoriteSet.has(b.id) ? 0 : 1;
      if (af !== bf) return af - bf;
      return a.name.localeCompare(b.name, "pt");
    });
  }, [filtered, favoriteSet]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleAccess = (system: System) => {
    const url = system.url?.trim();
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("Todas");
  };

  const gridKey = `${category}:${search}`;

  return (
    <>
      <HubThreeBackground />
      <div className="relative z-10 flex min-h-[100dvh] min-w-0 flex-col">
      <HubHeader
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 py-6 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-10 sm:pb-10 lg:px-8">
        {loading ? (
          <SystemsSkeleton count={systems.length} />
        ) : displaySystems.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : (
          <SystemList
            key={gridKey}
            systems={displaySystems}
            favoriteIds={favoriteSet}
            onToggleFavorite={toggleFavorite}
            onAccess={handleAccess}
          />
        )}

        <FadeContent blur={false} duration={900} threshold={0.08} className="mt-14">
          <footer className="border-t border-white/10 pt-6 text-pretty text-center text-xs leading-relaxed text-white/70">
            <div className="mx-auto mb-4 flex justify-center px-2">
              <LexNextHeaderLogo
                size="footer"
                variant="onDark"
                className="mx-auto w-[min(100%,8.5rem)] opacity-95 sm:w-[min(100%,9.5rem)]"
              />
            </div>
            <p className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-1 gap-y-1 px-1">
              <Link
                href="/atualizacoes"
                className="font-medium text-[#c8e299] underline-offset-4 hover:text-[#d8eeb3] hover:underline"
              >
                Atualizações
              </Link>
              <span aria-hidden className="text-white/25">
                ·
              </span>
              <span>uso interno</span>
              <span aria-hidden className="hidden sm:inline">
                {" · "}
              </span>
              <span className="w-full text-center sm:w-auto">
                dúvidas:{" "}
                <span className="text-white/90">
                  Controladoria ou Legal Ops
                </span>
              </span>
            </p>
          </footer>
        </FadeContent>
      </main>
      </div>
    </>
  );
}
