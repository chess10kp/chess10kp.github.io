import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nitin's Page",
  description: "Nitin Madhu's Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <body className="font-mono relative bg-background text-foreground">
        <div
          className={cn(
            "absolute inset-0 z-[-1]",
            "[background-size:16px_16px]",
            "[background-image:linear-gradient(to_right,hsl(var(--border)_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)_/_0.05)_1px,transparent_1px)]",
          )}
        />

        {children}
      </body>
    </html>
  );
}
