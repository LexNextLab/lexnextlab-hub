"use client";

import { LN_COLORS } from "@/lib/brand";

/** Ruído tipo film grain (identidade “tech” orgânica) */
const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

/**
 * Fundo do hub — mesh gradient escuro (paleta LexNext: azul #204889, verde #b0d07a),
 * com aura difusa e grão, no espírito da apresentação de identidade.
 */
export function HubThreeBackground() {
  const blue = LN_COLORS.blue;
  const green = LN_COLORS.green;
  const dark = LN_COLORS.canvasDark;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] w-full overflow-hidden"
      aria-hidden
    >
      {/* Base quase preta */}
      <div className="absolute inset-0" style={{ backgroundColor: dark }} />

      {/* Aura verde — superior direita (difusa) */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 95% 72% at 88% 4%, color-mix(in srgb, ${green} 42%, transparent) 0%, transparent 58%)`,
        }}
      />
      {/* Reforço verde suave (camada extra de profundidade) */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(ellipse 60% 45% at 94% 18%, color-mix(in srgb, ${green} 22%, transparent) 0%, transparent 52%)`,
        }}
      />

      {/* Aura azul — inferior centro */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 70% at 50% 100%, color-mix(in srgb, ${blue} 52%, transparent) 0%, transparent 58%)`,
        }}
      />
      {/* Azul lateral esquerdo (equilíbrio) */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 4% 48%, color-mix(in srgb, ${blue} 28%, transparent) 0%, transparent 55%)`,
        }}
      />

      {/* Degradê diagonal da marca (tecnologia / tendência) */}
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${blue} 28%, transparent) 0%, transparent 42%, color-mix(in srgb, ${green} 20%, transparent) 100%)`,
        }}
      />

      {/* Halo central suave (leve clareio para contraste com cards claros) */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 75% 60% at 50% 42%, rgb(244 245 247 / 0.07) 0%, transparent 62%)`,
        }}
      />

      {/* Vinheta nas bordas — aprofunda o campo escuro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_105%_105%_at_50%_50%,transparent_35%,rgb(0_0_0/0.55)_100%)]" />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.085] mix-blend-overlay"
        style={{ backgroundImage: noiseTexture }}
      />
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{ backgroundImage: noiseTexture }}
      />
    </div>
  );
}
