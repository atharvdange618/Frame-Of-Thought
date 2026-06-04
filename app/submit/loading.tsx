export default function SubmitLoading() {
  return (
    <div className="min-h-screen bg-[#1a1612] animate-pulse">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-10">
          <div className="h-9 w-56 rounded bg-stone-800" />
          <div className="mt-3 h-4 w-80 rounded bg-stone-800/60" />
        </div>

        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 rounded bg-stone-800" />
              <div className="h-10 w-full rounded-sm bg-stone-900" />
            </div>
          ))}
          <div className="h-10 w-full rounded bg-stone-800" />
        </div>
      </div>
    </div>
  );
}
