export default function ConceptDetailLoading() {
  return (
    <div className="min-h-screen bg-[#1a1612] animate-pulse">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 h-4 w-24 rounded bg-stone-800" />

        <div className="mb-12">
          <div className="h-8 w-48 rounded bg-stone-800" />
          <div className="mt-4 space-y-2">
            <div className="h-3.5 w-full rounded bg-stone-800/40" />
            <div className="h-3.5 w-4/5 rounded bg-stone-800/40" />
          </div>
        </div>

        <div className="mb-6 h-5 w-32 rounded bg-stone-800" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm border border-stone-800 bg-stone-900/40 p-6"
            >
              <div className="mb-3 h-5 w-1/2 rounded bg-stone-800" />
              <div className="space-y-2">
                <div className="h-3.5 w-full rounded bg-stone-800/40" />
                <div className="h-3.5 w-full rounded bg-stone-800/40" />
                <div className="h-3.5 w-2/3 rounded bg-stone-800/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
