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
      className="group rounded-sm border border-card-border bg-card-bg p-6 transition-all duration-200 hover:border-amber-600/40 dark:hover:border-amber-700/40 hover:bg-stone-100/30 dark:hover:bg-stone-900/60"
    >
      <h2 className="mb-2 font-semibold text-stone-800 dark:text-stone-200 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
        {pathway.title}
      </h2>
      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
        {pathway.description}
      </p>
      <p className="text-xs text-stone-500 dark:text-stone-500">
        by {pathway.authorName} · {pathway.itemCount}{" "}
        {pathway.itemCount === 1 ? "film" : "films"}
      </p>
    </Link>
  );
}
