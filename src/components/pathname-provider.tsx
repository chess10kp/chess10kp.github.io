"use client";
import { createContext, useContext, type ReactNode } from "react";

// In Astro, we pass the current path via props since there's no Next.js router.
// This provider lets nested components access it.
const PathnameContext = createContext<string>("/");

export function PathnameProvider({ path, children }: { path: string; children: ReactNode }) {
  return <PathnameContext.Provider value={path}>{children}</PathnameContext.Provider>;
}

export function usePathname() {
  return useContext(PathnameContext);
}
