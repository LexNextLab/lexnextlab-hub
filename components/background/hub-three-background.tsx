"use client";

import type { ReactNode } from "react";
import { Suspense, startTransition, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  GradientTexture,
  GradientType,
  Grid,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { LN_COLORS } from "@/lib/brand";

type BackdropSceneProps = {
  animate: boolean;
};

function AmbientBackdrop({ isDark }: { isDark: boolean }) {
  const primary = LN_COLORS.blue;
  const secondary = LN_COLORS.green;
  const deep = LN_COLORS.canvasDark;
  const light = LN_COLORS.canvasLight;

  return (
    <mesh position={[0, 0.2, -16]} renderOrder={-20}>
      <planeGeometry args={[56, 38]} />
      <meshBasicMaterial
        depthWrite={false}
        toneMapped={false}
        transparent
        opacity={1}
      >
        <GradientTexture
          key={isDark ? "dark" : "light"}
          type={GradientType.Radial}
          stops={[0, 0.42, 0.78, 1]}
          colors={
            isDark
              ? [primary, "#0f1c32", deep, LN_COLORS.black]
              : [light, "#eef2f9", "#e4eaf4", light]
          }
          width={512}
          size={512}
        />
      </meshBasicMaterial>
    </mesh>
  );
}

function TechGrid({ isDark }: { isDark: boolean }) {
  const primary = LN_COLORS.blue;
  const secondary = LN_COLORS.green;

  return (
    <Grid
      args={[48, 48]}
      position={[0, -2.65, -2.8]}
      infiniteGrid
      fadeDistance={isDark ? 28 : 22}
      fadeStrength={1.35}
      fadeFrom={0.92}
      cellSize={0.5}
      cellThickness={0.65}
      cellColor={isDark ? "#152a4a" : "#c5d2e8"}
      sectionSize={3.2}
      sectionThickness={1.05}
      sectionColor={isDark ? secondary : primary}
      side={2}
    />
  );
}

function BackdropScene({ animate }: BackdropSceneProps) {
  const isDark = false;
  const primary = LN_COLORS.blue;
  const secondary = LN_COLORS.green;

  const wrap = (child: ReactNode) =>
    animate ? (
      <Float speed={0.48} rotationIntensity={0.1} floatIntensity={0.32}>
        {child}
      </Float>
    ) : (
      child
    );

  return (
    <>
      <fog
        attach="fog"
        args={[isDark ? LN_COLORS.canvasDark : "#e4e9f0", 14, 52]}
      />

      <ambientLight intensity={isDark ? 0.38 : 0.58} />
      <directionalLight position={[9, 11, 7]} intensity={isDark ? 0.55 : 0.72} />
      <directionalLight
        position={[-6, -4, -5]}
        intensity={0.22}
        color={isDark ? "#7a8698" : "#cbd5e1"}
      />
      <pointLight
        position={[0, 3, 2]}
        intensity={isDark ? 0.35 : 0.2}
        color={secondary}
        distance={18}
      />

      <AmbientBackdrop isDark={isDark} />
      <TechGrid isDark={isDark} />

      <Stars
        radius={92}
        depth={58}
        count={isDark ? 4200 : 2600}
        factor={3.1}
        saturation={0}
        fade
        speed={animate ? 0.28 : 0}
      />

      <Sparkles
        count={animate ? 64 : 42}
        scale={15}
        size={2}
        speed={animate ? 0.22 : 0}
        opacity={isDark ? 0.5 : 0.38}
        color={primary}
        position={[0, 0.4, -6]}
      />

      <Sparkles
        count={animate ? 36 : 24}
        scale={11}
        size={1.35}
        speed={animate ? 0.18 : 0}
        opacity={isDark ? 0.32 : 0.22}
        color={secondary}
        position={[2.2, -0.8, -5]}
      />

      {wrap(
        <mesh position={[-3.6, 1.2, -1.2]} rotation={[0.35, 0.9, 0.15]}>
          <torusGeometry args={[1.55, 0.026, 14, 96]} />
          <meshStandardMaterial
            color={primary}
            emissive={primary}
            emissiveIntensity={isDark ? 0.52 : 0.34}
            metalness={0.25}
            roughness={0.72}
            transparent
            opacity={isDark ? 0.68 : 0.55}
          />
        </mesh>,
      )}

      {wrap(
        <mesh position={[3.8, -0.9, -2.4]} rotation={[-0.25, -0.55, 0.45]}>
          <icosahedronGeometry args={[1.05, 0]} />
          <meshStandardMaterial
            color={secondary}
            wireframe
            transparent
            opacity={isDark ? 0.32 : 0.24}
          />
        </mesh>,
      )}

      {wrap(
        <mesh position={[1.4, 2.35, -4]} rotation={[0.55, 0.25, -0.35]}>
          <torusKnotGeometry args={[0.48, 0.14, 72, 14]} />
          <meshStandardMaterial
            color={primary}
            emissive={primary}
            emissiveIntensity={isDark ? 0.32 : 0.2}
            metalness={0.35}
            roughness={0.85}
            transparent
            opacity={isDark ? 0.42 : 0.34}
          />
        </mesh>,
      )}

      {wrap(
        <mesh position={[-2.4, -1.75, -3.2]} rotation={[0.15, 0.2, 0.65]}>
          <torusGeometry args={[0.95, 0.018, 10, 72]} />
          <meshBasicMaterial
            color={primary}
            transparent
            opacity={isDark ? 0.2 : 0.15}
          />
        </mesh>,
      )}
    </>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      startTransition(() => setReduced(mq.matches));
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Textura procedural leve (sem asset) — “film grain” discreto */
const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function HubThreeBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] w-full overflow-hidden"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0.15, 7.4], fov: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.75]}
        className="block h-full min-h-[100dvh] w-full"
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl, scene }) => {
          scene.background = null;
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <BackdropScene animate={!reducedMotion} />
        </Suspense>
      </Canvas>

      {/* Legibilidade + profundidade sobre o WebGL */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/42"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,transparent_0%,transparent_42%,var(--background)_100%)] opacity-[0.65]"
        style={{ mixBlendMode: "multiply" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: noiseTexture,
          mixBlendMode: "overlay",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,transparent_52%,rgb(0_0_0/0.12)_100%)]"
        aria-hidden
      />
    </div>
  );
}
