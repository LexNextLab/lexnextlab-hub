export interface HubUpdate {
  /** Identificador estável (ex.: slug da release) */
  id: string;
  /** Data ISO (YYYY-MM-DD) */
  date: string;
  title: string;
  /** Parágrafo opcional abaixo do título */
  summary?: string;
  items: string[];
  tags?: string[];
}

/** Changelog do hub — ordem: mais recente primeiro (o front pode reordenar por data). */
export const hubUpdates: HubUpdate[] = [
  {
    id: "2025-03-25-atualizacoes",
    date: "2025-03-25",
    title: "Página de atualizações",
    summary:
      "Central para acompanhar o que mudou no LexNext Lab Hub, sem depender de e-mail ou grupos.",
    tags: ["Hub", "Comunicação"],
    items: [
      "Nova rota “Atualizações” com histórico editável em código (data/updates.ts).",
      "Acesso pelo header do hub e pelo rodapé da página inicial.",
    ],
  },
  {
    id: "2025-03-25-header-tema",
    date: "2025-03-25",
    title: "Header e experiência visual",
    tags: ["Hub", "UX"],
    items: [
      "Barra superior redesenhada (ícone de contexto, marca, área de busca em cartão arredondado).",
      "Tema claro único: removida a alternância claro/escuro; visual alinhado ao uso interno diurno.",
      "Ícone de notificações reservado para evolução futura da central de avisos.",
    ],
  },
  {
    id: "2025-03-25-sistemas-conteudo",
    date: "2025-03-25",
    title: "Conteúdo dos sistemas (Fênix.IA e Responsum)",
    tags: ["Jurídico", "Operações", "Conteúdo"],
    items: [
      "Fênix.IA: blocos sobre pré-análise de protocolos, ganhos operacionais e indicadores para Legal Ops.",
      "Responsum: benefícios ampliados (canal único, rastreabilidade, KPIs, cliente interno, compliance).",
    ],
  },
];

export function hubUpdatesSorted(): HubUpdate[] {
  return [...hubUpdates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function formatUpdateDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
