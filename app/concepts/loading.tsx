export default function ConceptsLoading() {
  return (
    <div className="min-h-screen animate-pulse transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <div className="h-9 w-40 rounded bg-stone-200 dark:bg-stone-700" />
          <div className="mt-3 h-4 w-80 rounded bg-stone-200/60 dark:bg-stone-800" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm border border-stone-200 dark:border-stone-800/60 bg-stone-100 dark:bg-stone-800/20 p-6"
            >
              <div className="mb-2 h-5 w-1/2 rounded bg-stone-200 dark:bg-stone-700" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-full rounded bg-stone-200/40 dark:bg-stone-800/80" />
                <div className="h-3.5 w-3/4 rounded bg-stone-200/40 dark:bg-stone-800/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
