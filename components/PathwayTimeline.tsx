import Link from "next/link";
import Image from "next/image";

export interface PathwayTimelineItem {
  sortOrder: number;
  note: string | null;
  movie: {
    id: string;
    title: string;
    year: number;
    director: string;
    posterUrl: string | null;
  };
}

interface Props {
  items: PathwayTimelineItem[];
}

export function PathwayTimeline({ items }: Props) {
  const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <ol className="relative flex flex-col gap-0">
      {sorted.map((item, index) => (
        <li key={item.movie.id} className="relative flex gap-6 pb-10 last:pb-0">
          {index < sorted.length - 1 && (
            <span
              className="absolute left-4.5 top-10 bottom-0 w-px bg-stone-300 dark:bg-stone-800"
              aria-hidden
            />
          )}

          <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-600/40 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/40 text-xs font-semibold text-amber-600 dark:text-amber-500">
            {index + 1}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <Link
              href={`/movies/${item.movie.id}`}
              className="group flex flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-sm bg-stone-200 dark:bg-stone-900 ring-1 ring-stone-300 dark:ring-stone-800">
                {item.movie.posterUrl ? (
                  <Image
                    src={item.movie.posterUrl}
                    alt={`${item.movie.title} poster`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-stone-700">
                    🎬
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 dark:text-stone-100 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  {item.movie.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {item.movie.year} · {item.movie.director}
                </p>
                {item.note && (
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {item.note}
                  </p>
                )}
              </div>
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}
