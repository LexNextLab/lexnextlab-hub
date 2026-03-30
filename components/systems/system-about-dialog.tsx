"use client";

import { ExternalLink } from "lucide-react";
import { SystemAboutContent } from "@/components/systems/system-about-content";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { System } from "@/data/systems";

type SystemAboutDialogProps = {
  system: System;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccess: (system: System) => void;
};

export function SystemAboutDialog({
  system,
  open,
  onOpenChange,
  onAccess,
}: SystemAboutDialogProps) {
  const accessUrl = system.url?.trim() ?? "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(92dvh,880px)] w-[min(100%,calc(100vw-1rem))] max-w-[min(100%,calc(100vw-1rem))] gap-0 overflow-hidden p-0 sm:w-auto sm:max-w-[min(48rem,calc(100vw-2rem))]"
        showCloseButton
      >
        <DialogHeader className="border-b border-border px-4 py-3 text-left sm:px-5 sm:py-4">
          <DialogTitle className="text-pretty pr-6 text-base font-semibold tracking-tight sm:pr-8 sm:text-lg">
            Informações — {system.name}
          </DialogTitle>
          <p className="mt-1 text-xs break-words text-muted-foreground">
            {system.aboutExtended?.badge ?? system.category}
            {accessUrl ? (
              <>
                {" · "}
                <a
                  href={accessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-primary underline-offset-4 hover:underline"
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
        <div className="max-h-[min(65dvh,640px)] overflow-y-auto overscroll-contain px-4 py-3 sm:max-h-[min(70vh,640px)] sm:px-5 sm:py-4">
          <SystemAboutContent system={system} />
        </div>
        <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-4 py-3 sm:flex-row sm:justify-end sm:px-5 sm:py-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Voltar
          </Button>
          <Button
            type="button"
            disabled={!accessUrl}
            className="rounded-xl gap-2 border-0 text-white bg-ln-gradient hover:opacity-92 disabled:opacity-50"
            onClick={() => {
              onOpenChange(false);
              onAccess(system);
            }}
          >
            Abrir em nova aba
            <ExternalLink className="size-4 opacity-90" aria-hidden />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
