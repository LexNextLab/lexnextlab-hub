"use client";

import { motion } from "framer-motion";
import type { System } from "@/data/systems";
import { SystemCard } from "@/components/systems/system-card";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

type SystemGridProps = {
  systems: System[];
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
  onAccess: (system: System) => void;
  className?: string;
};

export function SystemGrid({
  systems,
  favoriteIds,
  onToggleFavorite,
  onAccess,
  className,
}: SystemGridProps) {
  const single = systems.length === 1;

  return (
    <motion.div
      className={cn(
        "grid",
        single
          ? "mx-auto w-full max-w-xl grid-cols-1 gap-6"
          : "grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 2xl:grid-cols-4",
        className,
      )}
      variants={container}
      initial="hidden"
      animate="show"
      key={systems.map((s) => s.id).join(",")}
    >
      {systems.map((system) => (
        <SystemCard
          key={system.id}
          system={system}
          isFavorite={favoriteIds.has(system.id)}
          onToggleFavorite={onToggleFavorite}
          onAccess={onAccess}
        />
      ))}
    </motion.div>
  );
}
