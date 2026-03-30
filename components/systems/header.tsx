"use client";

import { LexNextHeaderLogo } from "@/components/systems/lexnext-header-logo";
import { cn } from "@/lib/utils";

export function HubHeader() {
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
      <div className="relative mx-auto max-w-7xl min-w-0 px-[max(0.75rem,env(safe-area-inset-left))] py-3 pr-[max(0.75rem,env(safe-area-inset-right))] sm:px-5 sm:py-3.5 lg:px-8 lg:py-2.5">
        <h1 className="sr-only">LexNext Lab — hub de sistemas internos</h1>
        <div className="flex justify-center">
          {/* w-full + max-w: o logo usa fill + h fixo; sem largura no pai o bloco colapsa a 0 */}
          <div className="w-full max-w-[17rem] sm:max-w-[18rem] lg:max-w-[min(100%,18rem)]">
            <LexNextHeaderLogo
              size="large"
              variant="onDark"
              align="center"
              className="lg:h-8 lg:min-h-[2rem] lg:max-w-[min(100%,11rem)]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
