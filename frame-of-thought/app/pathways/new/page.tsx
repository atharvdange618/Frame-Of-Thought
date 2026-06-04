import { PathwayForm } from "@/components/PathwayForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewPathwayPage() {
  const movies = await prisma.movie.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true, year: true },
  });

  return (
    <div className="min-h-screen bg-[#1a1612] text-stone-200">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-100">
            Create a Pathway
          </h1>
          <p className="mt-3 text-stone-500">
            Curate an ordered sequence of films that explore a philosophical
            idea. Drag to reorder.
          </p>
        </div>

        <div className="rounded-sm border border-stone-800 bg-stone-900/30 p-8">
          <PathwayForm movies={movies} />
        </div>
      </div>
    </div>
  );
}
