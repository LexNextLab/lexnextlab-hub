"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Info } from "lucide-react";
import { SystemAboutDialog } from "@/components/systems/system-about-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { System } from "@/data/systems";
import { splitSystemListName } from "@/lib/systems-display";
import { cn } from "@/lib/utils";

export type SystemListRowProps = {
  system: System;
  onAccess: (system: System) => void;
  className?: string;
};

export function SystemListRow({
  system,
  onAccess,
  className,
}: SystemListRowProps) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const accessUrl = system.url?.trim() ?? "";
  const canAccess = Boolean(accessUrl);
  const { title, subtitle } = splitSystemListName(system);

  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn(
          "group/row flex min-h-14 w-full min-w-0 items-center gap-2 rounded-2xl border border-white/60 bg-card/98 px-2 py-2",
          "shadow-[0_4px_24px_-12px_rgb(0_0_0/0.28),0_1px_0_0_rgb(255_255_255/0.85)_inset]",
          "ring-1 ring-black/[0.04] transition-[box-shadow,border-color,transform] duration-200 sm:min-h-[3.75rem] sm:gap-3 sm:px-3",
          canAccess
            ? [
                "hover:border-[#204889]/18 hover:shadow-[0_8px_32px_-14px_rgb(0_0_0/0.35)]",
                "motion-safe:active:scale-[0.995]",
              ]
            : "opacity-80",
        )}
      >
        <button
          type="button"
          disabled={!canAccess}
          onClick={() => canAccess && onAccess(system)}
          className={cn(
            "flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-xl text-left outline-none",
            "focus-visible:ring-2 focus-visible:ring-[#204889]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            canAccess ? "cursor-pointer" : "cursor-not-allowed opacity-90",
          )}
          aria-label={
            canAccess
              ? `Abrir ${subtitle ? `${title}, ${subtitle}` : system.name} em nova aba`
              : `${system.name} — link indisponível; solicite o endereço à TI ou gestão.`
          }
        >
          <div
            className={cn(
              "relative size-11 shrink-0 overflow-hidden rounded-xl ring-1 sm:size-12",
              system.logo.toLowerCase().endsWith(".png")
                ? "bg-zinc-900 ring-zinc-700 dark:bg-zinc-950 dark:ring-zinc-800"
                : "bg-muted ring-border",
            )}
          >
            <Image
              src={system.logo}
              alt=""
              width={48}
              height={48}
              sizes="48px"
              className={cn(
                "size-full",
                system.logo.toLowerCase().endsWith(".png")
                  ? "object-contain p-1.5"
                  : "object-cover",
              )}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
            <Badge
              variant="outline"
              className="h-5 w-fit max-w-full truncate border-[#204889]/28 bg-[#204889]/[0.07] px-2 py-0 text-[10px] font-semibold tracking-[0.06em] text-[#204889] uppercase shadow-none"
            >
              {system.category}
            </Badge>
            <span className="line-clamp-2 text-sm font-semibold tracking-[-0.01em] text-foreground sm:text-[15px]">
              {title}
            </span>
            {subtitle ? (
              <span className="line-clamp-2 text-left text-xs font-normal leading-snug text-muted-foreground sm:text-[13px]">
                {subtitle}
              </span>
            ) : null}
          </div>
          <ChevronRight
            className="size-5 shrink-0 text-[#204889]/45 opacity-90 transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-[#204889]/65"
            aria-hidden
          />
        </button>

        <div className="flex shrink-0 items-center gap-0.5">
          <Tooltip>
            <TooltipTrigger
              type="button"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAboutOpen(true);
              }}
              aria-label={`Informações sobre ${system.name}`}
            >
              <Info className="size-[18px] opacity-85" aria-hidden />
            </TooltipTrigger>
            <TooltipContent side="top">Informações</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <SystemAboutDialog
        system={system}
        open={aboutOpen}
        onOpenChange={setAboutOpen}
        onAccess={onAccess}
      />
    </div>
  );
}
