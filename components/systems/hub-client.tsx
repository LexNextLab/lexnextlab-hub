"use client";

import { useEffect, useMemo, useState } from "react";
import { HubThreeBackground } from "@/components/background/hub-three-background";
import FadeContent from "@/components/FadeContent";
import { officeBis } from "@/data/office-bis";
import { systems } from "@/data/systems";
import { BiList, BiListSkeleton } from "@/components/systems/bi-list";
import { HubHeader } from "@/components/systems/header";
import { HubSearchToolbar } from "@/components/systems/hub-search-toolbar";
import { HubViewTabs, type HubMainView } from "@/components/systems/hub-view-tabs";
import { cn } from "@/lib/utils";
import { LexNextHeaderLogo } from "@/components/systems/lexnext-header-logo";
import { EmptyState } from "@/components/systems/empty-state";
import { SystemList } from "@/components/systems/system-list";
import { SystemsSkeleton } from "@/components/systems/systems-skeleton";
import { useSystemsFilter } from "@/lib/hooks/use-systems-filter";
import type { System } from "@/data/systems";

export function HubClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [hubView, setHubView] = useState<HubMainView>("systems");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useSystemsFilter(systems, search, category);

  const displaySystems = useMemo(() => {
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "pt"));
  }, [filtered]);

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
      <HubHeader />

      <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 py-6 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-10 sm:pb-10 lg:px-8 lg:pt-6 lg:pb-8">
        <HubViewTabs
          value={hubView}
          onChange={setHubView}
          className={cn(
            hubView === "systems" ? "mb-3 sm:mb-4" : "mb-5 sm:mb-7 lg:mb-5",
          )}
        />

        {hubView === "systems" ? (
          <HubSearchToolbar
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            className="mb-5 sm:mb-6 lg:mb-5"
          />
        ) : null}

        {hubView === "systems" ? (
          loading ? (
            <SystemsSkeleton count={systems.length} />
          ) : displaySystems.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : (
            <div id="hub-panel-systems" role="tabpanel" aria-labelledby="hub-tab-systems">
              <SystemList
                key={gridKey}
                systems={displaySystems}
                onAccess={handleAccess}
              />
            </div>
          )
        ) : loading ? (
          <BiListSkeleton count={Math.max(3, officeBis.length)} />
        ) : (
          <div id="hub-panel-bis" role="tabpanel" aria-labelledby="hub-tab-bis">
            <BiList items={officeBis} />
          </div>
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
              <span>
                Qualquer dúvida, entre em contato com a equipe da LexNextLab. E-mail:{" "}
              </span>
              <a
                href="mailto:lexnextlab@bismarchipires.com.br"
                className="font-medium text-[#c8e299] underline-offset-4 hover:text-[#d8eeb3] hover:underline"
              >
                lexnextlab@bismarchipires.com.br
              </a>
              <span aria-hidden className="text-white/25">
                ·
              </span>
              <span>uso interno</span>
            </p>
          </footer>
        </FadeContent>
      </main>
      </div>
    </>
  );
}
