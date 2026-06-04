"use client";

import { useEffect } from "react";
import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MovieDetailError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center bg-[#1a1612] px-6 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-stone-700">
        Error
      </p>
      <h2 className="mb-3 text-2xl font-bold tracking-tight text-stone-100">
        Could not load this film
      </h2>
      <p className="mb-8 max-w-xs text-sm leading-relaxed text-stone-500">
        Something went wrong while loading the movie. Try again or browse all
        films.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded border border-stone-700 bg-stone-900/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-400 transition-colors hover:border-stone-500 hover:text-stone-200"
        >
          Try again
        </button>
        <Link
          href="/movies"
          className="rounded border border-amber-700/60 bg-amber-900/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-400 transition-colors hover:bg-amber-900/40 hover:text-amber-300"
        >
          Browse films
        </Link>
      </div>
    </div>
  );
}
