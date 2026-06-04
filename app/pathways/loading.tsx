export default function PathwaysLoading() {
  return (
    <div className="min-h-screen animate-pulse transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="h-9 w-32 rounded bg-stone-200 dark:bg-stone-700" />
            <div className="mt-3 h-4 w-72 rounded bg-stone-200/60 dark:bg-stone-800" />
          </div>
          <div className="h-9 w-36 rounded bg-stone-200 dark:bg-stone-700" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm border border-stone-200 dark:border-stone-800/60 bg-stone-100 dark:bg-stone-800/20 p-6"
            >
              <div className="mb-2 h-5 w-3/4 rounded bg-stone-200 dark:bg-stone-700" />
              <div className="mb-4 space-y-1.5">
                <div className="h-3.5 w-full rounded bg-stone-200/40 dark:bg-stone-800" />
                <div className="h-3.5 w-4/5 rounded bg-stone-200/40 dark:bg-stone-800" />
              </div>
              <div className="h-3 w-1/3 rounded bg-stone-200/30 dark:bg-stone-800/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
