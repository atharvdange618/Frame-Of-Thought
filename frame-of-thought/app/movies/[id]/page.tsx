import { AnalysisList } from "@/components/AnalysisList";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;

  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      analyses: {
        orderBy: {
          upvotes: "desc",
        },
        include: {
          concepts: {
            include: {
              concept: true,
            },
          },
        },
      },
    },
  });

  if (!movie) notFound();

  return (
    <div className="min-h-screen bg-[#1a1612] text-stone-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8">
          <Link
            href="/movies"
            className="text-xs uppercase tracking-widest text-stone-600 transition-colors hover:text-stone-400"
          >
            ← Films
          </Link>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="w-full shrink-0 sm:w-48 md:w-56">
            <div className="aspect-[2/3] overflow-hidden rounded-sm bg-stone-900 ring-1 ring-stone-800">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-4xl text-stone-700">🎬</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-stone-100">
                {movie.title}
              </h1>
              <p className="mt-1 text-sm text-stone-500">
                {movie.year} · Directed by {movie.director}
              </p>
            </div>

            {movie.description && (
              <p className="max-w-prose text-sm leading-relaxed text-stone-500">
                {movie.description}
              </p>
            )}

            <Link
              href={`/submit?movieId=${movie.id}`}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded border border-amber-700/60 bg-amber-900/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400 transition-colors hover:bg-amber-900/40 hover:text-amber-300"
            >
              Write an Analysis
            </Link>
          </div>
        </div>

        <div className="my-12 border-t border-stone-800/60" />

        <div>
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wider text-stone-400">
            {movie.analyses.length}{" "}
            {movie.analyses.length === 1 ? "Analysis" : "Analyses"}
          </h2>

          <AnalysisList analyses={movie.analyses} movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}
