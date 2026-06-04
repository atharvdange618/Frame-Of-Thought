"use client";

import { useEffect } from "react";
import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PathwayDetailError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 text-center transition-colors duration-200">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-700">
        Error
      </p>
      <h2 className="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Could not load this pathway
      </h2>
      <p className="mb-8 max-w-xs text-sm leading-relaxed text-stone-600 dark:text-stone-400">
        Something went wrong while loading the pathway. Try again or view all
        pathways.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 transition-colors hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
        >
          Try again
        </button>
        <Link
          href="/pathways"
          className="rounded border border-amber-600/40 dark:border-amber-700/60 bg-amber-600/10 dark:bg-amber-900/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 transition-colors hover:bg-amber-600/20 dark:hover:bg-amber-900/40 hover:text-amber-800 dark:hover:text-amber-300"
        >
          All pathways
        </Link>
      </div>
    </div>
  );
}
