import type { System } from "@/data/systems";

export const RECENTS_KEY = "lexnext-hub-recent";
export const FAVORITES_KEY = "lexnext-hub-favorites";

export type RecentEntry = { id: number; at: number };

export function recordRecent(id: number, prev: RecentEntry[]): RecentEntry[] {
  const filtered = prev.filter((e) => e.id !== id);
  return [{ id, at: Date.now() }, ...filtered].slice(0, 12);
}

export function resolveSystemsByIds(ids: number[], systems: System[]): System[] {
  const map = new Map(systems.map((s) => [s.id, s]));
  return ids.map((id) => map.get(id)).filter(Boolean) as System[];
}
