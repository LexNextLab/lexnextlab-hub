"use client";

import { cn } from "@/lib/utils";

export type HubMainView = "systems" | "bis";

type HubViewTabsProps = {
  value: HubMainView;
  onChange: (v: HubMainView) => void;
  className?: string;
};

export function HubViewTabs({ value, onChange, className }: HubViewTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Conteúdo do hub"
      className={cn(
        "mx-auto flex w-full max-w-xl flex-wrap items-center justify-center gap-1.5 sm:justify-start",
        className,
      )}
    >
      <button
        type="button"
        role="tab"
        id="hub-tab-systems"
        aria-selected={value === "systems"}
        tabIndex={value === "systems" ? 0 : -1}
        onClick={() => onChange("systems")}
        className={cn(
          "rounded-xl px-4 py-2 text-sm font-medium tracking-[-0.01em] transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#204889]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20",
          value === "systems"
            ? "bg-white/[0.12] text-white shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset]"
            : "text-white/55 hover:bg-white/[0.06] hover:text-white/80",
        )}
      >
        Sistemas
      </button>
      <button
        type="button"
        role="tab"
        id="hub-tab-bis"
        aria-selected={value === "bis"}
        tabIndex={value === "bis" ? 0 : -1}
        onClick={() => onChange("bis")}
        className={cn(
          "rounded-xl px-4 py-2 text-sm font-medium tracking-[-0.01em] transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#204889]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20",
          value === "bis"
            ? "bg-white/[0.12] text-white shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset]"
            : "text-white/55 hover:bg-white/[0.06] hover:text-white/80",
        )}
      >
        BIs do escritório
      </button>
    </div>
  );
}
