import Link from "next/link";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="border-b border-stone-200 dark:border-stone-800/60 bg-stone-50/60 dark:bg-stone-950/40 backdrop-blur-sm transition-colors duration-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <nav className="flex items-center gap-3 text-sm text-stone-500">
            <Link
              href="/"
              className="transition-colors hover:text-stone-800 dark:hover:text-stone-200"
            >
              Home
            </Link>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            <span className="font-medium text-stone-800 dark:text-stone-200">
              Films
            </span>
          </nav>

          <Link
            href="/submit"
            className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 transition-colors hover:text-amber-700 dark:hover:text-amber-300"
          >
            + Submit Analysis
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
