import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { SmoothScrollProvider } from "../components/smooth-scroll-provider";

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
      <body className="font-sans">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
