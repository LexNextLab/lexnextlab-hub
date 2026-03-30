/** Identidade LexNext Lab — cores oficiais */
export const LN_COLORS = {
  blue: "#204889",
  green: "#B0D07A",
  white: "#FFFFFF",
  black: "#000000",
  /** Base para canvas / névoa (evita preto chapado no escuro) */
  canvasDark: "#030508",
  canvasLight: "#f4f5f7",
} as const;

export const LN_GRADIENT =
  "linear-gradient(135deg, #204889 0%, #3d6a9e 45%, #B0D07A 100%)";

/** Logos em /public/LEXNEXTLAB/ — use conforme fundo claro/escuro */
export const LN_LOGOS = {
  /** Símbolo (M) — fundo escuro recomendado (traces claros) */
  mark: "/brand/lexnext-mark.svg",
  /** Fundo claro */
  horizontalOnLight: "/LEXNEXTLAB/LOGO-PRETO-HORIZONTAL.png",
  /** Fundo escuro (wordmark claro) */
  horizontalOnDark: "/LEXNEXTLAB/LOGO-BRANCA-SEM-GRADIENTE-HORIZONTAL.png",
  /** Alternativa horizontal clara com mais contraste */
  horizontalOnDarkAlt: "/LEXNEXTLAB/LOGO-BRANCO-HORIZONTAL.png",
} as const;
