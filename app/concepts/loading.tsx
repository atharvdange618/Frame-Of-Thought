export default function ConceptsLoading() {
  return (
    <div className="min-h-screen bg-[#1a1612] animate-pulse">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <div className="h-9 w-40 rounded bg-stone-800" />
          <div className="mt-3 h-4 w-80 rounded bg-stone-800/60" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm border border-stone-800 bg-stone-900/40 p-6"
            >
              <div className="mb-2 h-5 w-1/2 rounded bg-stone-800" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-full rounded bg-stone-800/40" />
                <div className="h-3.5 w-3/4 rounded bg-stone-800/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
