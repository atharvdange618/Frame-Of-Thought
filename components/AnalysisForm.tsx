"use client";

import { useActionState, useState } from "react";
import {
  submitAnalysis,
  SubmitAnalysisState,
} from "@/app/actions/submitAnalysis";

interface Movie {
  id: string;
  title: string;
  year: number;
}

interface Concept {
  id: string;
  name: string;
}

interface Props {
  movies: Movie[];
  concepts: Concept[];
  preselectedMovieId?: string;
}

const initialState: SubmitAnalysisState = {
  success: false,
};

export function AnalysisForm({ movies, concepts, preselectedMovieId }: Props) {
  const [state, formAction] = useActionState(submitAnalysis, initialState);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);

  const toggleConcept = (conceptId: string) => {
    setSelectedConcepts((prev) =>
      prev.includes(conceptId)
        ? prev.filter((id) => id !== conceptId)
        : [...prev, conceptId],
    );
  };

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.error && (
        <div className="rounded-sm border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="movieId"
          className="text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400"
        >
          Film
        </label>
        <select
          id="movieId"
          name="movieId"
          defaultValue={preselectedMovieId || ""}
          required
          className="rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-200 transition-colors focus:border-amber-600/60 dark:focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-600/60 dark:focus:ring-amber-700/60"
        >
          <option value="">Select a film</option>
          {movies.map((movie) => (
            <option
              key={movie.id}
              value={movie.id}
              className="bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200"
            >
              {movie.title} ({movie.year})
            </option>
          ))}
        </select>
        {state.fieldErrors?.movieId && (
          <p className="text-xs text-red-400">{state.fieldErrors.movieId[0]}</p>
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
          type="text"
          id="authorName"
          name="authorName"
          placeholder="Marcus Aurelius"
          required
          className="rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors focus:border-amber-600/60 dark:focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-600/60 dark:focus:ring-amber-700/60"
        />
        {state.fieldErrors?.authorName && (
          <p className="text-xs text-red-400">
            {state.fieldErrors.authorName[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400"
        >
          Analysis Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="The Stoic Philosophy in Blade Runner 2049"
          required
          className="rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors focus:border-amber-600/60 dark:focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-600/60 dark:focus:ring-amber-700/60"
        />
        {state.fieldErrors?.title && (
          <p className="text-xs text-red-400">{state.fieldErrors.title[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="body"
          className="text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400"
        >
          Analysis
        </label>
        <textarea
          id="body"
          name="body"
          rows={8}
          placeholder="Write your philosophical analysis..."
          required
          className="rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-2.5 text-sm leading-relaxed text-stone-900 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors focus:border-amber-600/60 dark:focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-600/60 dark:focus:ring-amber-700/60"
        />
        {state.fieldErrors?.body && (
          <p className="text-xs text-red-400">{state.fieldErrors.body[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
          Philosophical Concepts (select at least one)
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {concepts.map((concept) => (
            <label
              key={concept.id}
              className="flex cursor-pointer items-center gap-3 rounded-sm border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 px-4 py-3 text-sm text-stone-700 dark:text-stone-300 transition-colors hover:border-amber-600/40 dark:hover:border-amber-700/40 hover:bg-stone-100/30 dark:hover:bg-stone-900/70"
            >
              <input
                type="checkbox"
                name="conceptIds"
                value={concept.id}
                checked={selectedConcepts.includes(concept.id)}
                onChange={() => toggleConcept(concept.id)}
                className="h-4 w-4 rounded border-stone-300 dark:border-stone-600 bg-stone-100 dark:bg-stone-850 text-amber-600 focus:ring-amber-600/60 dark:focus:ring-amber-700/60 focus:ring-offset-0"
              />
              {concept.name}
            </label>
          ))}
        </div>
        {state.fieldErrors?.conceptIds && (
          <p className="text-xs text-red-400">
            {state.fieldErrors.conceptIds[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded border border-amber-600/40 dark:border-amber-700/60 bg-amber-600/10 dark:bg-amber-900/20 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400 transition-all hover:bg-amber-600/20 dark:hover:bg-amber-900/40 hover:text-amber-850 dark:hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600/60 dark:focus:ring-amber-700/60 focus:ring-offset-2 focus:ring-offset-background sm:w-auto"
      >
        Submit Analysis
      </button>
    </form>
  );
}
