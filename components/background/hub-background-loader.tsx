"use client";

import dynamic from "next/dynamic";

const HubThreeBackground = dynamic(
  () =>
    import("@/components/background/hub-three-background").then(
      (m) => m.HubThreeBackground,
    ),
  { ssr: false },
);

/** Carrega o canvas 3D apenas no cliente (não usar em Server Components com dynamic ssr:false). */
export function HubBackgroundLoader() {
  return <HubThreeBackground />;
}
