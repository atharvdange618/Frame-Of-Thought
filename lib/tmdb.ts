const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const apiKey = process.env.TMDB_API_KEY;

if (!apiKey)
  throw new Error("TMDB_API_KEY is not set in environment variables");

export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  director?: string;
}

export interface TmdbSearchResult {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
}

export async function fetchTmdb<T>(endpoint: string): Promise<T> {
  const url = `${TMDB_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      accept: "application/json",
    },
  });

  if (!res.ok)
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);

  return res.json();
}

export async function searchMovies(query: string): Promise<TmdbSearchResult[]> {
  const data = await fetchTmdb<{ results: TmdbSearchResult[] }>(
    `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
  );
  return data.results.slice(0, 10);
}

export async function getMovie(tmdbId: number): Promise<TmdbMovie> {
  const data = await fetchTmdb<TmdbMovie>(`/movie/${tmdbId}?language=en-US`);

  const credits = await fetchTmdb<{
    crew: { job: string; name: string }[];
  }>(`/movie/${tmdbId}/credits?language=en-US`);

  const director = credits.crew.find((c) => c.job === "Director")?.name;

  return {
    ...data,
    director,
  };
}

export function getPosterUrl(
  posterPath: string | null,
  size: "w500" | "w342" | "w185" = "w500",
): string | null {
  if (!posterPath) return null;
  return `${IMAGE_BASE.replace("w500", size)}${posterPath}`;
}

export function getYear(releaseDate: string): number {
  return new Date(releaseDate).getFullYear();
}
