"use client";

import { useMemo } from "react";
import type { System } from "@/data/systems";

export function useSystemsFilter(
  systems: System[],
  query: string,
  category: string,
) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    return systems.filter((s) => {
      const haystack = [
        s.name,
        s.description,
        ...(s.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      const matchQuery = !q || haystack.includes(q);
      const matchCat = category === "Todas" || s.category === category;
      return matchQuery && matchCat;
    });
  }, [systems, query, category]);
}
