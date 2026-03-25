import type { Metadata } from "next";
import Link from "next/link";
import { HubBackgroundLoader } from "@/components/background/hub-background-loader";
import { SubpageHeader } from "@/components/systems/subpage-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatUpdateDate,
  hubUpdatesSorted,
} from "@/data/updates";

export const metadata: Metadata = {
  title: "Atualizações | LexNext Lab",
  description:
    "Histórico de mudanças e melhorias do hub de sistemas internos LexNext Lab.",
};

export default function AtualizacoesPage() {
  const entries = hubUpdatesSorted();

  return (
    <>
      <HubBackgroundLoader />
      <div className="relative z-10 flex min-h-screen flex-col">
        <SubpageHeader
          title="Atualizações"
          description="O que mudou no hub — uso interno Bismarchi | Pires."
        />

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:max-w-4xl lg:px-8">
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            Registro das entregas e ajustes visíveis no LexNext Lab. Para incluir
            uma nova entrada, edite{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              data/updates.ts
            </code>
            .
          </p>

          <ol className="flex list-none flex-col gap-6">
            {entries.map((u) => (
              <li key={u.id}>
                <Card className="border-border/80 shadow-sm ring-border/40">
                  <CardHeader className="border-b border-border/60 pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 gap-y-3">
                      <div className="min-w-0 space-y-1">
                        <p className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
                          {formatUpdateDate(u.date)}
                        </p>
                        <CardTitle className="text-lg sm:text-xl">
                          {u.title}
                        </CardTitle>
                        {u.summary ? (
                          <CardDescription className="text-sm leading-relaxed">
                            {u.summary}
                          </CardDescription>
                        ) : null}
                      </div>
                      {u.tags && u.tags.length > 0 ? (
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {u.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground marker:text-primary">
                      {u.items.map((item, i) => (
                        <li key={`${u.id}-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <footer className="mt-14 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
            <p>
              <Link
                href="/"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Voltar ao hub
              </Link>
              {" · "}
              <span className="font-heading font-semibold text-foreground">
                LexNext Lab
              </span>
              {" · uso interno"}
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
