import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center bg-[#1a1612] px-6 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-stone-700">
        404
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-stone-100">
        Page not found
      </h1>
      <p className="mb-8 max-w-xs text-sm leading-relaxed text-stone-500">
        This frame doesn&apos;t exist in the archive. The page may have been
        moved, deleted, or never existed.
      </p>
      <Link
        href="/"
        className="rounded border border-amber-700/60 bg-amber-900/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-400 transition-colors hover:bg-amber-900/40 hover:text-amber-300"
      >
        Back to home
      </Link>
    </div>
  );
}
