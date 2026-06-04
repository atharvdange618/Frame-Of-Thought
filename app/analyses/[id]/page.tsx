import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { VoteButtons } from "@/components/VoteButtons";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AnalysisDetailPage({ params }: Props) {
  const { id } = await params;

  const analysis = await prisma.analysis.findUnique({
    where: { id },
    include: {
      movie: true,
      concepts: {
        include: {
          concept: true,
        },
      },
    },
  });

  if (!analysis) notFound();

  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500">
          <Link
            href="/movies"
            className="hover:text-stone-800 dark:hover:text-stone-300 transition-colors"
          >
            Films
          </Link>
          <span>·</span>
          <Link
            href={`/movies/${analysis.movie.id}`}
            className="hover:text-stone-800 dark:hover:text-stone-300 transition-colors"
          >
            {analysis.movie.title}
          </Link>
          <span>·</span>
          <span className="text-stone-400 dark:text-stone-600">Analysis</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
                  {analysis.title}
                </h1>
                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  Written by{" "}
                  <span className="font-semibold">{analysis.authorName}</span>
                </p>
              </div>

              <div className="shrink-0">
                <VoteButtons
                  analysisId={analysis.id}
                  initialUpvotes={analysis.upvotes}
                />
              </div>
            </div>

            <div className="prose prose-stone dark:prose-invert max-w-none">
              {analysis.body.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 text-base leading-relaxed text-stone-700 dark:text-stone-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 border-t border-stone-200 dark:border-stone-800/60 pt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-500">
                Philosophical Concepts Explored
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.concepts.map(({ concept }) => (
                  <Link
                    key={concept.id}
                    href={`/concepts/${concept.slug}`}
                    className="rounded-full border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 px-4 py-1.5 text-xs text-stone-600 dark:text-stone-400 transition-colors hover:border-amber-600/50 dark:hover:border-amber-700/50 hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    {concept.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-sm border border-card-border bg-card-bg p-6 transition-all duration-200 hover:border-stone-300 dark:hover:border-stone-800">
              <div className="mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-500">
                  Exploring Film
                </h2>
              </div>

              {analysis.movie.posterUrl && (
                <div className="relative mb-4 aspect-2/3 w-full overflow-hidden rounded-sm bg-stone-200 dark:bg-stone-900 ring-1 ring-stone-300 dark:ring-stone-800">
                  <Image
                    src={analysis.movie.posterUrl}
                    alt={`${analysis.movie.title} poster`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 200px"
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                {analysis.movie.title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {analysis.movie.year} · Dir. {analysis.movie.director}
              </p>

              {analysis.movie.description && (
                <p className="mt-3 line-clamp-4 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  {analysis.movie.description}
                </p>
              )}

              <Link
                href={`/movies/${analysis.movie.id}`}
                className="mt-4 block w-full rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 py-2 text-center text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 transition-colors hover:border-stone-400 dark:hover:border-stone-600 hover:text-stone-800 dark:hover:text-stone-200"
              >
                View Movie Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
