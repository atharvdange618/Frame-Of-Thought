import { PathwayForm } from "@/components/PathwayForm";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create a Pathway - Frame of Thought",
  description:
    "Curate an ordered sequence of films that explore a philosophical idea.",
};

export default async function NewPathwayPage() {
  const movies = await prisma.movie.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true, year: true },
  });

  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Create a Pathway
          </h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Curate an ordered sequence of films that explore a philosophical
            idea. Drag to reorder.
          </p>
        </div>

        <div className="rounded-sm border border-card-border bg-card-bg p-8">
          <PathwayForm movies={movies} />
        </div>
      </div>
    </div>
  );
}
