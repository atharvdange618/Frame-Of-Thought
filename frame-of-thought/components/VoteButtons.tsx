"use client";

import { useActionState, useEffect, useState } from "react";
import { castVote, CastVoteState } from "@/app/actions/castVote";

interface Props {
  analysisId: string;
  initialUpvotes: number;
}

const initialState: CastVoteState = { success: false };

export function VoteButtons({ analysisId, initialUpvotes }: Props) {
  const [state, formAction, pending] = useActionState(castVote, initialState);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [voterName, setVoterName] = useState("");

  useEffect(() => {
    if (state.success && state.newUpvoteCount !== undefined) {
      setUpvotes(state.newUpvoteCount);
    }
  }, [state]);

  return (
    <div className="flex shrink-0 flex-col items-end gap-2">
      <span className="text-sm font-medium text-amber-600">↑ {upvotes}</span>

      <div className="flex items-center gap-1">
        <input
          type="text"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          placeholder="Your name"
          aria-label="Voter name"
          className="w-24 rounded border border-stone-700 bg-stone-900/60 px-2 py-1 text-xs text-stone-300 placeholder:text-stone-600 focus:border-amber-700/60 focus:outline-none"
        />
        <form action={formAction}>
          <input type="hidden" name="analysisId" value={analysisId} />
          <input type="hidden" name="value" value="1" />
          <input type="hidden" name="voterName" value={voterName} />
          <button
            type="submit"
            disabled={pending || !voterName.trim()}
            className="rounded border border-stone-700 px-2 py-1 text-xs text-stone-400 transition-colors hover:border-amber-700/50 hover:text-amber-400 disabled:opacity-40"
            aria-label="Upvote"
          >
            +
          </button>
        </form>
        <form action={formAction}>
          <input type="hidden" name="analysisId" value={analysisId} />
          <input type="hidden" name="value" value="-1" />
          <input type="hidden" name="voterName" value={voterName} />
          <button
            type="submit"
            disabled={pending || !voterName.trim()}
            className="rounded border border-stone-700 px-2 py-1 text-xs text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-300 disabled:opacity-40"
            aria-label="Downvote"
          >
            −
          </button>
        </form>
      </div>

      {state.error && (
        <p className="max-w-[10rem] text-right text-xs text-red-400">{state.error}</p>
      )}
    </div>
  );
}
