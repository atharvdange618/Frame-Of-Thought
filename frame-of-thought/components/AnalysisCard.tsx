import Link from "next/link";
import { VoteButtons } from "@/components/VoteButtons";

export interface AnalysisConceptTag {
  concept: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface AnalysisCardData {
  id: string;
  title: string;
  authorName: string;
  body: string;
  upvotes: number;
  concepts: AnalysisConceptTag[];
}

interface Props {
  analysis: AnalysisCardData;
}

export function AnalysisCard({ analysis }: Props) {
  return (
    <article className="rounded-sm border border-stone-800 bg-stone-900/40 p-6 transition-colors hover:border-stone-700">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-stone-100">{analysis.title}</h3>
          <p className="mt-0.5 text-xs text-stone-600">by {analysis.authorName}</p>
        </div>
        <VoteButtons
          analysisId={analysis.id}
          initialUpvotes={analysis.upvotes}
        />
      </div>

      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-stone-500">
        {analysis.body}
      </p>

      <div className="flex flex-wrap gap-2">
        {analysis.concepts.map(({ concept }) => (
          <Link
            key={concept.id}
            href={`/concepts/${concept.slug}`}
            className="rounded-full border border-stone-700 bg-stone-900 px-3 py-1 text-xs text-stone-400 transition-colors hover:border-amber-700/50 hover:text-amber-400"
          >
            {concept.name}
          </Link>
        ))}
      </div>
    </article>
  );
}
