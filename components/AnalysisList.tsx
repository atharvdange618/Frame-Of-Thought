import Link from "next/link";
import { AnalysisCard, AnalysisCardData } from "@/components/AnalysisCard";

interface Props {
  analyses: AnalysisCardData[];
  movieId: string;
}

export function AnalysisList({ analyses, movieId }: Props) {
  if (analyses.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-stone-800 px-8 py-12 text-center">
        <p className="text-sm italic text-stone-600">
          No analyses yet. Be the first to write one.
        </p>
        <Link
          href={`/submit?movieId=${movieId}`}
          className="mt-4 inline-flex items-center gap-2 rounded border border-stone-700 bg-stone-900/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-stone-500 hover:text-stone-200"
        >
          Write an Analysis
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {analyses.map((analysis) => (
        <AnalysisCard key={analysis.id} analysis={analysis} />
      ))}
    </div>
  );
}
