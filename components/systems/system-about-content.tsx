import { useMemo } from "react";
import { Mail } from "lucide-react";
import type { System, SystemAboutBlock } from "@/data/systems";
import { cn } from "@/lib/utils";

const accent =
  "border-ln-blue/30 bg-ln-blue/[0.06] dark:border-ln-green/25 dark:bg-ln-green/[0.07]";

function AboutParagraphs({ text }: { text: string }) {
  const blocks = useMemo(
    () =>
      text
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
    [text],
  );

  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground">
      {blocks.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

function BlockSection({ block }: { block: SystemAboutBlock }) {
  if (block.kind === "text") {
    return (
      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {block.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{block.body}</p>
      </section>
    );
  }

  if (block.kind === "bullets") {
    return (
      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {block.title}
        </h3>
        <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        {block.title}
      </h3>
      <ol className="list-none space-y-3 p-0">
        {block.steps.map((step, i) => (
          <li
            key={i}
            className={cn("rounded-xl border px-3 py-2.5 text-sm", accent)}
          >
            <span className="font-medium text-foreground">{step.label}</span>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SystemAboutContent({ system }: { system: System }) {
  const ext = system.aboutExtended;

  return (
    <div className="space-y-6">
      <AboutParagraphs text={system.about} />

      {ext?.blocks && ext.blocks.length > 0 ? (
        <div className="space-y-6 border-t border-border pt-6">
          {ext.blocks.map((block, i) => (
            <BlockSection key={i} block={block} />
          ))}
        </div>
      ) : null}

      {ext?.contact ? (
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-semibold text-foreground">
            {ext.contact.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{ext.contact.intro}</p>
          <a
            href={`mailto:${ext.contact.email}`}
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            {ext.contact.email}
          </a>
          {ext.contact.people && ext.contact.people.length > 0 ? (
            <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
              {ext.contact.people.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

    </div>
  );
}
