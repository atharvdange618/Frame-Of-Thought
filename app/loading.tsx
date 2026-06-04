export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#1a1612] animate-pulse">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 h-8 w-48 rounded bg-stone-800" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-sm bg-stone-900" />
          ))}
        </div>
      </div>
    </div>
  );
}
