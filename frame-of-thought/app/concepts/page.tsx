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
    <div>
      <h1>Philosophical Concepts</h1>
      <p>
        Every film on Frame of Thought is tagged with one or more philosophical
        ideas. Choose a concept to explore the films and analyses connected to
        it.
      </p>

      <div>
        {concepts.map((concept) => (
          <Link key={concept.id} href={`/concepts/${concept.slug}`}>
            <div>
              <h2>{concept.name}</h2>
              <p>{concept.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
