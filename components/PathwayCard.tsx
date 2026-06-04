import Link from "next/link";

export interface PathwayCardData {
  id: string;
  title: string;
  description: string;
  authorName: string;
  itemCount: number;
}

interface Props {
  pathway: PathwayCardData;
}

export function PathwayCard({ pathway }: Props) {
  return (
    <Link
      href={`/pathways/${pathway.id}`}
      className="group rounded-sm border border-stone-800 bg-stone-900/40 p-6 transition-all duration-200 hover:border-amber-700/40 hover:bg-stone-900/70"
    >
      <h2 className="mb-2 font-semibold text-stone-200 transition-colors group-hover:text-amber-400">
        {pathway.title}
      </h2>
      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-stone-600">
        {pathway.description}
      </p>
      <p className="text-xs text-stone-700">
        by {pathway.authorName} · {pathway.itemCount}{" "}
        {pathway.itemCount === 1 ? "film" : "films"}
      </p>
    </Link>
  );
}
