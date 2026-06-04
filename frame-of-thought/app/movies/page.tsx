import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 300;

export default async function MoviesPage() {
  const movies = await prisma.movie.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      _count: {
        select: {
          analyses: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#1a1612] text-stone-200">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-100">
            Films
          </h1>
          <p className="mt-3 text-stone-500">
            {movies.length} films in the archive, each mapped to philosophical
            ideas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-stone-900 ring-1 ring-stone-800 transition-all duration-200 group-hover:ring-amber-700/50 group-hover:shadow-lg group-hover:shadow-black/40">
                {movie.posterUrl ? (
                  <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-3xl text-stone-700">🎬</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-semibold leading-snug text-stone-200 transition-colors group-hover:text-stone-100">
                  {movie.title}
                </h2>
                <p className="text-xs text-stone-600">
                  {movie.year} · {movie.director}
                </p>
                <p className="text-xs text-stone-700">
                  {movie._count.analyses}{" "}
                  {movie._count.analyses === 1 ? "analysis" : "analyses"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
