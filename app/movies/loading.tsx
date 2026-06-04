export default function MoviesLoading() {
  return (
    <div className="min-h-screen animate-pulse transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <div className="h-9 w-24 rounded bg-stone-200 dark:bg-stone-700" />
          <div className="mt-3 h-4 w-64 rounded bg-stone-200/60 dark:bg-stone-800" />
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-2/3 rounded-sm bg-stone-100 dark:bg-stone-800" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-full rounded bg-stone-200 dark:bg-stone-700" />
                <div className="h-3 w-2/3 rounded bg-stone-200/60 dark:bg-stone-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
