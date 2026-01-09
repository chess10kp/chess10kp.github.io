export default function BlogPostLoading() {
  return (
    <div className="flex justify-center min-h-screen px-4 lg:px-64 md:px-8">
      <div className="my-8 sm:my-12 md:my-16 w-full max-w-4xl bg-card p-8 rounded-none shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="h-6 w-32 bg-muted/30 animate-pulse rounded mb-2 sm:mb-0" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-muted/30 animate-pulse rounded" />
            <div className="h-6 w-20 bg-muted/30 animate-pulse rounded" />
            <div className="h-6 w-24 bg-muted/30 animate-pulse rounded" />
          </div>
        </div>

        <div className="h-12 w-3/4 bg-muted/30 animate-pulse rounded mb-8" />

        <div className="space-y-4">
          <div className="h-4 w-full bg-muted/20 animate-pulse rounded" />
          <div className="h-4 w-full bg-muted/20 animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted/20 animate-pulse rounded" />
          <div className="h-4 w-4/5 bg-muted/20 animate-pulse rounded" />

          <div className="h-32 w-full bg-muted/10 animate-pulse rounded border border-border/20 my-6" />

          <div className="h-4 w-full bg-muted/20 animate-pulse rounded" />
          <div className="h-4 w-full bg-muted/20 animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted/20 animate-pulse rounded" />

          <div className="h-24 w-full bg-muted/10 animate-pulse rounded border border-border/20 my-6" />

          <div className="h-4 w-full bg-muted/20 animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted/20 animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted/20 animate-pulse rounded" />
        </div>

        <div className="flex justify-between mt-12 pt-8 border-t border-border/20">
          <div className="w-32 h-12 bg-muted/30 animate-pulse rounded" />
          <div className="w-32 h-12 bg-muted/30 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
