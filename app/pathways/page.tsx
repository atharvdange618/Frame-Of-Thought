import { PathwayCard } from "@/components/PathwayCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Pathways - Frame of Thought",
  description:
    "Curated journeys through films that explore a philosophical idea.",
};

export default async function PathwaysPage() {
  const pathways = await prisma.pathway.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { items: true } },
    },
  });

  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Pathways
            </h1>
            <p className="mt-3 text-stone-600 dark:text-stone-400">
              Curated journeys through films that explore a philosophical idea.
            </p>
          </div>
          <Link
            href="/pathways/new"
            className="inline-flex w-fit items-center rounded border border-amber-600/40 dark:border-amber-700/60 bg-amber-600/10 dark:bg-amber-900/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 transition-colors hover:bg-amber-600/20 dark:hover:bg-amber-900/40 hover:text-amber-800 dark:hover:text-amber-300"
          >
            Create Pathway
          </Link>
        </div>

        {pathways.length === 0 ? (
          <div className="rounded-sm border border-dashed border-stone-300 dark:border-stone-800 px-8 py-12 text-center">
            <p className="text-sm italic text-stone-500 dark:text-stone-400">
              No pathways yet. Be the first to curate a journey.
            </p>
            <Link
              href="/pathways/new"
              className="mt-4 inline-flex items-center gap-2 rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 transition-colors hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              Create a Pathway
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pathways.map((pathway) => (
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
        )}
      </div>
    </div>
  );
}
