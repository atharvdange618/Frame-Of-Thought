import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-static";

export default async function ConceptsPage() {
  const concepts = await prisma.philosophyConcept.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Philosophical Concepts
          </h1>
          <p className="mt-3 max-w-xl text-stone-600 dark:text-stone-400">
            Every film on Frame of Thought is tagged with one or more
            philosophical ideas. Choose a concept to explore the films and
            analyses connected to it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => (
            <Link
              key={concept.id}
              href={`/concepts/${concept.slug}`}
              className="group rounded-sm border border-card-border bg-card-bg p-6 transition-all duration-200 hover:border-amber-600/40 dark:hover:border-amber-700/40 hover:bg-stone-100/30 dark:hover:bg-stone-900/60"
            >
              <h2 className="mb-2 font-semibold text-stone-800 dark:text-stone-200 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
                {concept.name}
              </h2>
              <p className="line-clamp-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {concept.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
