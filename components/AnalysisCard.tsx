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
    <article className="rounded-sm border border-card-border bg-card-bg p-6 transition-all duration-200 hover:border-stone-400 dark:hover:border-stone-700">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            <Link href={`/analyses/${analysis.id}`}>{analysis.title}</Link>
          </h3>
          <p className="mt-0.5 text-xs text-stone-550 dark:text-stone-500">
            by {analysis.authorName}
          </p>
        </div>
        <VoteButtons
          analysisId={analysis.id}
          initialUpvotes={analysis.upvotes}
        />
      </div>

      <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
        {analysis.body}
      </p>

      <div className="mb-4">
        <Link
          href={`/analyses/${analysis.id}`}
          className="text-xs font-semibold uppercase tracking-wider text-amber-600/80 dark:text-amber-400/80 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        >
          Read Full Analysis &rarr;
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {analysis.concepts.map(({ concept }) => (
          <Link
            key={concept.id}
            href={`/concepts/${concept.slug}`}
            className="rounded-full border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 px-3 py-1 text-xs text-stone-600 dark:text-stone-400 transition-colors hover:border-amber-600/50 dark:hover:border-amber-700/50 hover:text-amber-600 dark:hover:text-amber-400"
          >
            {concept.name}
          </Link>
        ))}
      </div>
    </article>
  );
}
