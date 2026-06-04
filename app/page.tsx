import { AnalysisCard } from "@/components/AnalysisCard";
import { PathwayCard } from "@/components/PathwayCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const [trendingAnalyses, featuredPathways] = await Promise.all([
    prisma.analysis.findMany({
      orderBy: { upvotes: "desc" },
      take: 3,
      include: {
        concepts: { include: { concept: true } },
      },
    }),
    prisma.pathway.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { _count: { select: { items: true } } },
    }),
  ]);

  return (
    <div className="transition-colors duration-200">
      <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 py-24 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-6">
          <div className="rounded-full border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-stone-600 dark:text-stone-400">
            Philosophical Cinema Archive
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-6xl">
            Cinema through the{" "}
            <span className="text-amber-600/80">lens of philosophy</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-stone-600 dark:text-stone-400">
            Explore films mapped to philosophical concepts. Submit analyses,
            vote on ideas, and build curated pathways through cinema.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/movies"
              className="rounded border border-amber-600/40 dark:border-amber-700/60 bg-amber-600/10 dark:bg-amber-900/20 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 transition-colors hover:bg-amber-600/20 dark:hover:bg-amber-900/40 hover:text-amber-800 dark:hover:text-amber-300"
            >
              Browse Films
            </Link>
            <Link
              href="/submit"
              className="rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900/40 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 transition-colors hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-850 dark:hover:text-stone-200"
            >
              Submit Analysis
            </Link>
          </div>
        </div>
      </section>

      {trendingAnalyses.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-lg font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-400">
              Trending Analyses
            </h2>
            <Link
              href="/movies"
              className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800 dark:text-stone-600 dark:hover:text-stone-400"
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {trendingAnalyses.map((analysis) => (
              <AnalysisCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        </section>
      )}

      {featuredPathways.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-lg font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-400">
              Featured Pathways
            </h2>
            <Link
              href="/pathways"
              className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800 dark:text-stone-600 dark:hover:text-stone-400"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {featuredPathways.map((pathway) => (
              <PathwayCard
                key={pathway.id}
                pathway={{
                  id: pathway.id,
                  title: pathway.title,
                  description: pathway.description,
                  authorName: pathway.authorName,
                  itemCount: pathway._count.items,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
