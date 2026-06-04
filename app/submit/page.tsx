import { AnalysisForm } from "@/components/AnalysisForm";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submit an Analysis - Frame of Thought",
  description:
    "Connect a film to philosophical concepts. Share your thoughts and contribute to the archive.",
};

interface Props {
  searchParams: Promise<{ movieId?: string }>;
}

export default async function SubmitPage({ searchParams }: Props) {
  const [resolvedSearchParams, movies, concepts] = await Promise.all([
    searchParams,
    prisma.movie.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, year: true },
    }),
    prisma.philosophyConcept.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const { movieId } = resolvedSearchParams;

  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Submit an Analysis
          </h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Connect a film to philosophical concepts. Share your thoughts and
            contribute to the archive.
          </p>
        </div>

        <div className="rounded-sm border border-card-border bg-card-bg p-8">
          <AnalysisForm
            movies={movies}
            concepts={concepts}
            preselectedMovieId={movieId}
          />
        </div>
      </div>
    </div>
  );
}
