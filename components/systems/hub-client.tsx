"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";
import FadeContent from "@/components/FadeContent";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { systems } from "@/data/systems";
import { HubHeader } from "@/components/systems/header";
import { EmptyState } from "@/components/systems/empty-state";
import { SystemGrid } from "@/components/systems/system-grid";
import { SystemsSkeleton } from "@/components/systems/systems-skeleton";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useSystemsFilter } from "@/lib/hooks/use-systems-filter";
import {
  FAVORITES_KEY,
  RECENTS_KEY,
  recordRecent,
  resolveSystemsByIds,
  type RecentEntry,
} from "@/lib/recent";
import type { System } from "@/data/systems";

const HubThreeBackground = dynamic(
  () =>
    import("@/components/background/hub-three-background").then(
      (m) => m.HubThreeBackground,
    ),
  { ssr: false },
);

export function HubClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useLocalStorage<number[]>(FAVORITES_KEY, []);
  const [recents, setRecents] = useLocalStorage<RecentEntry[]>(RECENTS_KEY, []);

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

  const recentSystems = useMemo(() => {
    const ids = recents.slice(0, 5).map((r) => r.id);
    return resolveSystemsByIds(ids, systems);
  }, [recents]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleAccess = (system: System) => {
    const url = system.url?.trim();
    if (!url) return;
    setRecents((r) => recordRecent(system.id, r));
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
      <div className="relative z-10 flex min-h-screen flex-col">
      <HubHeader
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
        {recentSystems.length > 0 && (
          <section className="mb-8" aria-label="Seus últimos acessos">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="size-4 text-muted-foreground" aria-hidden />
              Seus últimos acessos
            </div>
            <ScrollArea
              scrollbar="horizontal"
              className="w-full min-w-0 max-w-full pb-1"
            >
              <div className="flex w-max gap-3 pb-2">
                {recentSystems.map((s) => (
                  <Button
                    key={s.id}
                    type="button"
                    variant="outline"
                    className="h-auto shrink-0 flex-col items-stretch rounded-xl border-border bg-card px-4 py-3 text-left shadow-sm"
                    onClick={() => handleAccess(s)}
                  >
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {s.category}
                    </span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </section>
        )}

        {loading ? (
          <SystemsSkeleton count={systems.length} />
        ) : displaySystems.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : (
          <SystemGrid
            key={gridKey}
            systems={displaySystems}
            favoriteIds={favoriteSet}
            onToggleFavorite={toggleFavorite}
            onAccess={handleAccess}
          />
        )}

        <FadeContent blur={false} duration={900} threshold={0.08} className="mt-14">
          <footer className="border-t border-border/60 pt-6 text-pretty text-center text-xs leading-relaxed text-muted-foreground">
            <p className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-1 gap-y-1 px-1">
              <span className="font-heading font-semibold text-foreground">
                LexNext Lab
              </span>
              <span aria-hidden className="text-muted-foreground/35">
                ·
              </span>
              <Link
                href="/atualizacoes"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Atualizações
              </Link>
              <span aria-hidden className="text-muted-foreground/35">
                ·
              </span>
              <span>uso interno</span>
              <span aria-hidden className="hidden sm:inline">
                {" · "}
              </span>
              <span className="w-full text-center sm:w-auto">
                dúvidas:{" "}
                <span className="text-foreground/90">
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
