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
    <div>
      <h1>{concept.name}</h1>
      <p>{concept.description}</p>

      <h2>
        {analyses.length} {analyses.length === 1 ? "Analysis" : "Analyses"}
      </h2>

      {analyses.length === 0 ? (
        <div>
          <p>No analyses tagged with {concept.name} yet.</p>
          <Link href="/submit">Be the first to write one</Link>
        </div>
      ) : (
        <div>
          {analyses.map((analysis) => (
            <Link key={analysis.id} href={`/movies/${analysis.movie.id}`}>
              <div>
                <div>
                  <h3>{analysis.title}</h3>
                  <p>by {analysis.authorName}</p>
                  <p>
                    Film: {analysis.movie.title} ({analysis.movie.year})
                  </p>
                  <div>
                    <span>{analysis.upvotes} upvotes</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link href="/submit">Submit an Analysis</Link>
    </div>
  );
}
