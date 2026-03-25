"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LexNextHeaderLogo } from "@/components/systems/lexnext-header-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubpageHeaderProps = {
  title: string;
  description?: string;
};

export function SubpageHeader({ title, description }: SubpageHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-card/95 shadow-[0_4px_28px_-10px_rgb(32_72_137/0.14)] backdrop-blur-xl supports-[backdrop-filter]:bg-card/88">
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:max-w-4xl lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <Link
              href="/"
              aria-label="Voltar ao hub de sistemas"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "size-10 shrink-0 rounded-full border-border/80 shadow-sm no-underline",
              )}
            >
              <ArrowLeft className="size-[18px]" aria-hidden />
            </Link>
            <LexNextHeaderLogo />
          </div>
          <div className="min-w-0 sm:text-right">
            <h1 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
