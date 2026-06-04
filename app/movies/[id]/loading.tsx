export default function MovieDetailLoading() {
  return (
    <div className="min-h-screen animate-pulse transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 h-4 w-16 rounded bg-stone-200 dark:bg-stone-800" />

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="w-full shrink-0 sm:w-48 md:w-56">
            <div className="aspect-[2/3] rounded-sm bg-stone-100 dark:bg-stone-900" />
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <div className="h-8 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-1/3 rounded bg-stone-200/60 dark:bg-stone-800/60" />
            <div className="space-y-2 mt-2">
              <div className="h-3.5 w-full rounded bg-stone-200/40 dark:bg-stone-800/40" />
              <div className="h-3.5 w-full rounded bg-stone-200/40 dark:bg-stone-800/40" />
              <div className="h-3.5 w-4/5 rounded bg-stone-200/40 dark:bg-stone-800/40" />
            </div>
            <div className="mt-2 h-8 w-36 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        <div className="my-12 border-t border-stone-200 dark:border-stone-800/60" />

        <div>
          <div className="mb-6 h-5 w-32 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-sm border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/40 p-6"
              >
                <div className="mb-3 h-5 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="space-y-2">
                  <div className="h-3.5 w-full rounded bg-stone-200/40 dark:bg-stone-800/40" />
                  <div className="h-3.5 w-full rounded bg-stone-200/40 dark:bg-stone-800/40" />
                  <div className="h-3.5 w-2/3 rounded bg-stone-200/40 dark:bg-stone-800/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
