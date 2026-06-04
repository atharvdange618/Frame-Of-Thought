import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About - Frame of Thought",
  description:
    "Learn about Frame of Thought, a philosophical cinema archive where film lovers map movies to philosophical concepts.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          About Frame of Thought
        </h1>
        <p className="mt-6 text-base leading-relaxed text-stone-600 dark:text-stone-400">
          Frame of Thought is a philosophical cinema archive. Film lovers and
          developers map movies to philosophical concepts, submit analyses, vote
          on ideas, and curate pathways-ordered journeys through films that
          explore a single idea from different angles.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-lg font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-400">
            How it works
          </h2>
          <ul className="list-inside list-disc space-y-2 text-sm text-stone-600 dark:text-stone-400">
            <li>Browse films and philosophical concepts in the archive.</li>
            <li>Submit an analysis linking a film to one or more concepts.</li>
            <li>
              Vote on analyses to surface the community&apos;s best writing.
            </li>
            <li>Build pathways-curated sequences of films with notes.</li>
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/submit"
            className="rounded border border-amber-600/40 dark:border-amber-700/60 bg-amber-600/10 dark:bg-amber-900/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 transition-colors hover:bg-amber-600/20 dark:hover:bg-amber-900/40 hover:text-amber-800 dark:hover:text-amber-300"
          >
            Submit an Analysis
          </Link>
          <Link
            href="/pathways/new"
            className="rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 transition-colors hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
          >
            Create a Pathway
          </Link>
        </div>
      </div>
    </div>
  );
}
