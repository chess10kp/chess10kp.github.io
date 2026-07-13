"use client";
import { PathnameProvider } from "./pathname-provider";
import Header from "./header";

export function SiteHeader({ currentPath }: { currentPath: string }) {
  return (
    <PathnameProvider path={currentPath}>
      <Header />
    </PathnameProvider>
  );
}
