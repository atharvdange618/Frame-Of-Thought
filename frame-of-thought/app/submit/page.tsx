import { AnalysisForm } from "@/components/AnalysisForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ movieId?: string }>;
}

export default async function SubmitPage({ searchParams }: Props) {
  const { movieId } = await searchParams;

  const [movies, concepts] = await Promise.all([
    prisma.movie.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, year: true },
    }),
    prisma.philosophyConcept.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#1a1612] text-stone-200">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-100">
            Submit an Analysis
          </h1>
          <p className="mt-3 text-stone-500">
            Connect a film to philosophical concepts. Share your thoughts and
            contribute to the archive.
          </p>
        </div>

        <div className="rounded-sm border border-stone-800 bg-stone-900/30 p-8">
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
