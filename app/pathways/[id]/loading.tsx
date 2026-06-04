export default function PathwayDetailLoading() {
  return (
    <div className="min-h-screen animate-pulse transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 h-4 w-20 rounded bg-stone-200 dark:bg-stone-800" />

        <div className="mb-8">
          <div className="h-8 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="mt-3 h-4 w-1/2 rounded bg-stone-200/60 dark:bg-stone-800/60" />
          <div className="mt-2 h-3.5 w-24 rounded bg-stone-200/40 dark:bg-stone-800/40" />
        </div>

        <div className="my-10 border-t border-stone-200 dark:border-stone-800/60" />

        <div className="space-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-6 py-6 border-b border-stone-200 dark:border-stone-800/40 last:border-0"
            >
              <div className="flex flex-col items-center gap-1 pt-1 w-8 shrink-0">
                <div className="h-4 w-4 rounded-full bg-stone-200 dark:bg-stone-800" />
                {i < 4 && (
                  <div className="w-px flex-1 bg-stone-200 dark:bg-stone-800/40" />
                )}
              </div>
              <div className="flex gap-4 flex-1">
                <div className="w-12 shrink-0">
                  <div className="aspect-2/3 rounded-sm bg-stone-100 dark:bg-stone-900" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-3.5 w-1/3 rounded bg-stone-200/60 dark:bg-stone-800/60" />
                  <div className="h-3.5 w-full rounded bg-stone-200/30 dark:bg-stone-800/30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
