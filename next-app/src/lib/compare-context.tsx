"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "autovault-comparator";
const MAX_CARS = 3;

const serverSnapshot: string[] = [];

const state = {
  snapshot: [] as string[],
  seeded: false,
  listeners: new Set<() => void>(),
  cached: false,
};

export function subscribe(callback: () => void) {
  state.listeners.add(callback);
  return () => {
    state.listeners.delete(callback);
  };
}

function readPersisted(): string[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.slice(0, MAX_CARS);
  } catch {
    return null;
  }
}

function getSnapshot() {
  if (!state.cached) {
    state.cached = true;
    const persisted = readPersisted();
    if (persisted !== null) {
      state.snapshot = persisted;
    }
  }
  return state.snapshot;
}

function set(ids: string[]) {
  const next = ids.slice(0, MAX_CARS);
  state.snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable
  }
  state.listeners.forEach((listener) => listener());
}

export function seedCompareIds(ids: string[]) {
  if (typeof window === "undefined") return;
  state.seeded = true;

  // A persisted comparison (even an emptied one) overrides the ?cars= share
  // intent, so a refresh never resurrects cars the user removed.
  const persisted = readPersisted();
  if (persisted !== null) {
    if (state.snapshot.length === 0 && persisted.length > 0) {
      state.snapshot = persisted;
      state.cached = true;
    }
    state.listeners.forEach((listener) => listener());
    return;
  }

  if (ids.length === 0) {
    state.listeners.forEach((listener) => listener());
    return;
  }
  const next = ids.slice(0, MAX_CARS);
  state.snapshot = next;
  state.cached = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable
  }
  state.listeners.forEach((listener) => listener());
}

export function getSeededSnapshot() {
  return state.seeded;
}

type CompareContextValue = {
  carIds: string[];
  max: number;
  isPinned: (id: string) => boolean;
  togglePin: (id: string) => void;
  clear: () => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const carIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => serverSnapshot,
  );

  const togglePin = useCallback((id: string) => {
    if (state.snapshot.includes(id)) {
      set(state.snapshot.filter((x) => x !== id));
    } else if (state.snapshot.length < MAX_CARS) {
      set([...state.snapshot, id]);
    }
  }, []);

  const clear = useCallback(() => {
    set([]);
  }, []);

  const value = useMemo(
    () => ({
      carIds,
      max: MAX_CARS,
      isPinned: (id: string) => carIds.includes(id),
      togglePin,
      clear,
    }),
    [carIds, togglePin, clear],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}