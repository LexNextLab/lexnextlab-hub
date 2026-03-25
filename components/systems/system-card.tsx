"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Info, Star } from "lucide-react";
import GlareHover from "@/components/GlareHover";
import { SystemAboutContent } from "@/components/systems/system-about-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { System } from "@/data/systems";
import { cn } from "@/lib/utils";

const cardMotion = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
};

type SystemCardProps = {
  system: System;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAccess: (system: System) => void;
};

export function SystemCard({
  system,
  isFavorite,
  onToggleFavorite,
  onAccess,
}: SystemCardProps) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const accessUrl = system.url?.trim() ?? "";

  return (
    <>
      <motion.article
        variants={cardMotion}
        className="flex h-full min-h-[300px] min-w-0 w-full flex-col self-stretch"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <GlareHover
          width="100%"
          height="100%"
          className={cn(
            "min-h-[300px] w-full min-w-0 flex-1 cursor-default border-border shadow-sm transition-shadow duration-300 hover:shadow-md",
          )}
          style={{ minHeight: 300 }}
          background="var(--card)"
          borderColor="var(--border)"
          borderRadius="1rem"
          glareColor="#B0D07A"
          glareOpacity={0.18}
          glareSize={180}
          transitionDuration={500}
        >
          <div className="relative z-10 flex h-full min-h-0 min-w-0 w-full flex-col p-5 pb-6">
            <div className="flex items-start justify-between gap-3">
              <div
                className={cn(
                  "relative size-14 shrink-0 overflow-hidden rounded-xl ring-1",
                  system.logo.toLowerCase().endsWith(".png")
                    ? "bg-zinc-900 ring-zinc-700 dark:bg-zinc-950 dark:ring-zinc-800"
                    : "bg-muted ring-border",
                )}
              >
                <Image
                  src={system.logo}
                  alt={`Logotipo ${system.name}`}
                  width={56}
                  height={56}
                  className={cn(
                    system.logo.toLowerCase().endsWith(".png")
                      ? "object-contain p-1.5"
                      : "object-cover",
                  )}
                />
              </div>
              <Tooltip>
                <TooltipTrigger
                  type="button"
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite(system.id);
                  }}
                  aria-pressed={isFavorite}
                  aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Star
                    className={cn(
                      "size-5",
                      isFavorite && "fill-primary text-primary",
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent side="top">
                  {isFavorite ? "Remover favorito" : "Favoritar"}
                </TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger
                type="button"
                className="mt-4 min-w-0 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <h3 className="truncate text-lg font-semibold tracking-tight text-foreground">
                  {system.name}
                </h3>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                {system.name}
              </TooltipContent>
            </Tooltip>

            <Badge
              variant="secondary"
              className="mt-2 w-fit rounded-lg px-2 py-0.5 text-xs font-medium"
            >
              {system.category}
            </Badge>

            <p className="mt-3 min-h-0 flex-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {system.description}
            </p>

            <div className="mt-4 flex shrink-0 flex-col gap-2 border-t border-border/50 pt-4 sm:flex-row sm:items-stretch">
              <Button
                type="button"
                variant="outline"
                className="h-11 flex-1 rounded-xl gap-2 font-medium"
                onClick={() => setAboutOpen(true)}
              >
                <Info className="size-4 opacity-80" aria-hidden />
                Ver detalhes
              </Button>
              {accessUrl ? (
                <Button
                  type="button"
                  className="h-11 flex-1 rounded-xl gap-2 border-0 font-medium text-white shadow-sm hover:opacity-92 bg-ln-gradient"
                  onClick={() => onAccess(system)}
                >
                  Entrar no sistema
                  <ExternalLink className="size-4 opacity-90" aria-hidden />
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled
                  className="h-11 flex-1 cursor-not-allowed rounded-xl gap-2 border-0 font-medium text-white opacity-50 bg-ln-gradient"
                  title="Link ainda não está cadastrado no hub. Peça o endereço à TI ou gestão."
                  aria-label="Entrar no sistema — link indisponível; solicite o endereço à TI ou gestão."
                >
                  Entrar no sistema
                  <ExternalLink className="size-4 opacity-90" aria-hidden />
                </Button>
              )}
            </div>
          </div>
        </GlareHover>
      </motion.article>

      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent
          className="max-h-[min(92vh,880px)] max-w-[calc(100%-2rem)] gap-0 overflow-hidden p-0 sm:max-w-3xl"
          showCloseButton
        >
          <DialogHeader className="border-b border-border px-5 py-4 text-left">
            <DialogTitle className="text-lg font-semibold tracking-tight">
              Informações — {system.name}
            </DialogTitle>
            <p className="text-xs text-muted-foreground">
              {system.aboutExtended?.badge ?? system.category}
              {accessUrl ? (
                <>
                  {" · "}
                  <a
                    href={accessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {accessUrl.replace(/^https?:\/\//, "")}
                  </a>
                </>
              ) : (
                <span className="mt-1 block text-[11px]">
                  Link de acesso: solicite à TI ou gestão.
                </span>
              )}
            </p>
          </DialogHeader>
          <div className="max-h-[min(70vh,640px)] overflow-y-auto overscroll-contain px-5 py-4">
            <SystemAboutContent system={system} />
          </div>
          <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-5 py-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => setAboutOpen(false)}
            >
              Voltar
            </Button>
            <Button
              type="button"
              disabled={!accessUrl}
              className="rounded-xl gap-2 border-0 text-white bg-ln-gradient hover:opacity-92 disabled:opacity-50"
              onClick={() => {
                setAboutOpen(false);
                onAccess(system);
              }}
            >
              Abrir em nova aba
              <ExternalLink className="size-4 opacity-90" aria-hidden />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
