"use client";

import { useActionState, useState } from "react";
import { createPathway, CreatePathwayState } from "@/app/actions/createPathway";
import { PathwayBuilder, PathwayItemDraft } from "@/components/PathwayBuilder";

interface Movie {
  id: string;
  title: string;
  year: number;
}

interface Props {
  movies: Movie[];
}

const initialState: CreatePathwayState = { success: false };

export function PathwayForm({ movies }: Props) {
  const [state, formAction] = useActionState(createPathway, initialState);
  const [items, setItems] = useState<PathwayItemDraft[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");

  const addMovie = () => {
    if (!selectedMovieId) return;
    const movie = movies.find((m) => m.id === selectedMovieId);
    if (!movie) return;
    if (items.some((i) => i.movieId === movie.id)) return;

    setItems((prev) => [
      ...prev,
      {
        clientId: crypto.randomUUID(),
        movieId: movie.id,
        title: movie.title,
        year: movie.year,
        note: "",
      },
    ]);
    setSelectedMovieId("");
  };

  const serializedItems = JSON.stringify(
    items.map((item, index) => ({
      movieId: item.movieId,
      sortOrder: index,
      note: item.note || undefined,
    })),
  );

  const availableMovies = movies.filter(
    (m) => !items.some((i) => i.movieId === m.id),
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.error && (
        <div className="rounded-sm border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400"
        >
          Pathway Title
        </label>
        <input
          id="title"
          name="title"
          required
          placeholder="Films on the nature of time"
          className="rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors focus:border-amber-600/60 dark:focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-600/60 dark:focus:ring-amber-700/60"
        />
        {state.fieldErrors?.title && (
          <p className="text-xs text-red-400">{state.fieldErrors.title[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          placeholder="What philosophical journey does this pathway trace?"
          className="rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-2.5 text-sm leading-relaxed text-stone-900 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors focus:border-amber-600/60 dark:focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-600/60 dark:focus:ring-amber-700/60"
        />
        {state.fieldErrors?.description && (
          <p className="text-xs text-red-400">
            {state.fieldErrors.description[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="authorName"
          className="text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400"
        >
          Your Name
        </label>
        <input
          id="authorName"
          name="authorName"
          required
          className="rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-200 transition-colors focus:border-amber-600/60 dark:focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-600/60 dark:focus:ring-amber-700/60"
        />
        {state.fieldErrors?.authorName && (
          <p className="text-xs text-red-400">
            {state.fieldErrors.authorName[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
          Films in order
        </span>
        <PathwayBuilder
          items={items}
          onReorder={setItems}
          onRemove={(clientId) =>
            setItems((prev) => prev.filter((i) => i.clientId !== clientId))
          }
          onNoteChange={(clientId, note) =>
            setItems((prev) =>
              prev.map((i) => (i.clientId === clientId ? { ...i, note } : i)),
            )
          }
        />
        {state.fieldErrors?.items && (
          <p className="text-xs text-red-400">{state.fieldErrors.items[0]}</p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <select
            value={selectedMovieId}
            onChange={(e) => setSelectedMovieId(e.target.value)}
            className="flex-1 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-200 focus:border-amber-600 dark:focus:border-amber-700/60 focus:outline-none"
          >
            <option
              value=""
              className="bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200"
            >
              Add a film…
            </option>
            {availableMovies.map((movie) => (
              <option
                key={movie.id}
                value={movie.id}
                className="bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200"
              >
                {movie.title} ({movie.year})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addMovie}
            disabled={!selectedMovieId}
            className="rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 transition-colors hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200 disabled:opacity-40"
          >
            Add Film
          </button>
        </div>
      </div>

      <input type="hidden" name="items" value={serializedItems} readOnly />

      <button
        type="submit"
        disabled={items.length === 0}
        className="w-full rounded border border-amber-600/40 dark:border-amber-700/60 bg-amber-600/10 dark:bg-amber-900/20 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400 transition-all hover:bg-amber-600/20 dark:hover:bg-amber-900/40 hover:text-amber-800 dark:hover:text-amber-300 disabled:opacity-40 sm:w-auto"
      >
        Create Pathway
      </button>
    </form>
  );
}
