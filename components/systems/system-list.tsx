"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { System } from "@/data/systems";
import { SystemListRow } from "@/components/systems/system-list-row";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const rowMotion = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
};

type SystemListProps = {
  systems: System[];
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
  onAccess: (system: System) => void;
  className?: string;
};

export function SystemList({
  systems,
  favoriteIds,
  onToggleFavorite,
  onAccess,
  className,
}: SystemListProps) {
  const reduceMotion = useReducedMotion();

  const listClass = cn(
    "mx-auto flex w-full min-w-0 max-w-xl list-none flex-col gap-3 pl-0 sm:gap-3.5",
    className,
  );

  if (reduceMotion) {
    return (
      <ul className={listClass} role="list">
        {systems.map((system) => (
          <li key={system.id} className="list-none">
            <SystemListRow
              system={system}
              isFavorite={favoriteIds.has(system.id)}
              onToggleFavorite={onToggleFavorite}
              onAccess={onAccess}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className={listClass}
      variants={container}
      initial="hidden"
      animate="show"
      role="list"
    >
      {systems.map((system) => (
        <motion.li key={system.id} variants={rowMotion} className="list-none">
          <SystemListRow
            system={system}
            isFavorite={favoriteIds.has(system.id)}
            onToggleFavorite={onToggleFavorite}
            onAccess={onAccess}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
