import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>404 - Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-mono bg-background text-foreground flex items-center justify-center h-screen">
        <h1 className="text-6xl">404</h1>
      </body>
    </html>
  );
}
