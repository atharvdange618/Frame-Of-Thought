export default function AnalysisDetailLoading() {
  return (
    <div className="min-h-screen animate-pulse transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 flex gap-2">
          <div className="h-4 w-12 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 w-4 rounded bg-stone-200 dark:bg-stone-850" />
          <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 w-4 rounded bg-stone-200 dark:bg-stone-850" />
          <div className="h-4 w-16 rounded bg-stone-200 dark:bg-stone-800" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between gap-6">
              <div className="flex-1 space-y-3">
                <div className="h-8 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-4 w-1/3 rounded bg-stone-200 dark:bg-stone-850" />
              </div>
              <div className="h-10 w-24 rounded bg-stone-200 dark:bg-stone-800" />
            </div>

            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, pIdx) => (
                <div key={pIdx} className="space-y-2">
                  <div className="h-4 w-full rounded bg-stone-100 dark:bg-stone-900" />
                  <div className="h-4 w-full rounded bg-stone-100 dark:bg-stone-900" />
                  <div className="h-4 w-5/6 rounded bg-stone-100 dark:bg-stone-900" />
                  <div className="h-4 w-4/5 rounded bg-stone-100 dark:bg-stone-900" />
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-stone-200 dark:border-stone-800/60 pt-6">
              <div className="mb-3 h-3 w-40 rounded bg-stone-250 dark:bg-stone-800" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-7 w-20 rounded-full bg-stone-200 dark:bg-stone-850"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-sm border border-stone-200 dark:border-stone-850 bg-stone-50 dark:bg-stone-900/10 p-6">
              <div className="mb-4 h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="mb-4 aspect-2/3 w-full rounded bg-stone-200 dark:bg-stone-850" />
              <div className="h-5 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="mt-2 h-3 w-1/2 rounded bg-stone-200 dark:bg-stone-850" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-stone-100 dark:bg-stone-900" />
                <div className="h-3 w-full rounded bg-stone-100 dark:bg-stone-900" />
                <div className="h-3 w-5/6 rounded bg-stone-100 dark:bg-stone-900" />
              </div>
              <div className="mt-4 h-8 w-full rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
