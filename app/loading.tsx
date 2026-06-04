export default function RootLoading() {
  return (
    <div className="min-h-screen animate-pulse transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 h-8 w-48 rounded bg-stone-200 dark:bg-stone-700" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-sm bg-stone-100 dark:bg-stone-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
