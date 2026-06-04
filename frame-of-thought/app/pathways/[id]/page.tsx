import { PathwayTimeline } from "@/components/PathwayTimeline";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PathwayDetailPage({ params }: Props) {
  const { id } = await params;

  const pathway = await prisma.pathway.findUnique({
    where: { id },
    include: {
      items: {
        include: { movie: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!pathway) notFound();

  return (
    <div className="min-h-screen bg-[#1a1612] text-stone-200">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/pathways"
          className="mb-8 inline-block text-xs uppercase tracking-widest text-stone-600 transition-colors hover:text-stone-400"
        >
          ← Pathways
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-100">
            {pathway.title}
          </h1>
          <p className="mt-2 text-xs text-stone-600">by {pathway.authorName}</p>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-stone-500">
            {pathway.description}
          </p>
        </header>

        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wider text-stone-400">
          The Journey
        </h2>

        <PathwayTimeline items={pathway.items} />
      </div>
    </div>
  );
}
