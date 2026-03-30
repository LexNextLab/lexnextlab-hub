/**
 * Painéis de BI do escritório — edite esta lista para incluir nome, descrição e URL de cada dashboard.
 * Os links abrem em nova aba a partir da aba “BIs do escritório” no hub.
 */
export interface OfficeBI {
  id: string;
  name: string;
  description?: string;
  /** URL completa do painel (Power BI, Looker, etc.) */
  url: string;
}

export const officeBis: OfficeBI[] = [
  // Exemplo (remova ou substitua pelos BIs reais):
  // {
  //   id: "financeiro",
  //   name: "BI — Financeiro",
  //   description: "Indicadores e inadimplência.",
  //   url: "https://app.powerbi.com/...",
  // },
];
