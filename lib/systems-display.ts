import type { System } from "@/data/systems";

/** Título curto + linha de apoio (ex.: "CADASTRO DE LEAD" / "Bismarchi | Pires") */
export function splitSystemListName(system: System): {
  title: string;
  subtitle: string | null;
} {
  const n = system.name.trim();
  if (n.includes(" — ")) {
    const i = n.indexOf(" — ");
    const title = n.slice(0, i).trim();
    const subtitle = n.slice(i + 3).trim();
    if (title && subtitle) return { title, subtitle };
  }
  if (n.includes(" - ")) {
    const i = n.indexOf(" - ");
    const title = n.slice(0, i).trim();
    const subtitle = n.slice(i + 3).trim();
    if (title && subtitle) return { title, subtitle };
  }
  return { title: n, subtitle: null };
}
