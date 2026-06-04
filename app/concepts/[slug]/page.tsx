import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 120;

export async function generateStaticParams() {
  const concepts = await prisma.philosophyConcept.findMany({
    select: {
      slug: true,
    },
  });
  return concepts.map((c) => ({
    slug: c.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ConceptDetailPage({ params }: Props) {
  const { slug } = await params;

  const concept = await prisma.philosophyConcept.findUnique({
    where: { slug },
  });

  if (!concept) notFound();

  const analyses = await prisma.analysis.findMany({
    where: {
      concepts: {
        some: {
          concept: { slug },
        },
      },
    },
    include: {
      movie: true,
      concepts: {
        include: {
          concept: true,
        },
      },
    },
    orderBy: {
      upvotes: "desc",
    },
  });

  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <Link
            href="/concepts"
            className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800 dark:text-stone-600 dark:hover:text-stone-400"
          >
            ← Concepts
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {concept.name}
          </h1>
          <p className="mt-3 max-w-prose text-stone-600 dark:text-stone-400">
            {concept.description}
          </p>
        </div>

        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-400">
          {analyses.length} {analyses.length === 1 ? "Analysis" : "Analyses"}
        </h2>

        {analyses.length === 0 ? (
          <div className="rounded-sm border border-dashed border-stone-300 dark:border-stone-800 px-8 py-12 text-center">
            <p className="text-sm italic text-stone-500 dark:text-stone-500">
              No analyses tagged with {concept.name} yet.
            </p>
            <Link
              href="/submit"
              className="mt-4 inline-flex items-center gap-2 rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 transition-colors hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              Be the first to write one
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {analyses.map((analysis) => (
              <Link
                key={analysis.id}
                href={`/movies/${analysis.movie.id}`}
                className="group rounded-sm border border-card-border bg-card-bg p-6 transition-all duration-200 hover:border-stone-400 dark:hover:border-stone-700"
              >
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
                      {analysis.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                      by {analysis.authorName}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-amber-600 dark:text-amber-500">
                    ↑ {analysis.upvotes}
                  </span>
                </div>

                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {analysis.movie.title}{" "}
                  <span className="text-stone-400 dark:text-stone-500">
                    ({analysis.movie.year})
                  </span>
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 border-t border-stone-200 dark:border-stone-800/60 pt-8">
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded border border-amber-600/40 dark:border-amber-700/60 bg-amber-600/10 dark:bg-amber-900/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 transition-colors hover:bg-amber-600/20 dark:hover:bg-amber-900/40 hover:text-amber-800 dark:hover:text-amber-300"
          >
            Submit an Analysis
          </Link>
        </div>
      </div>
    </div>
  );
}
