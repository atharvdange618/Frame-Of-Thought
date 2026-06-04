"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  analysisId: z.string().min(1),
  voterName: z.string().min(1, "Name is required").max(100),
  value: z.coerce.number().refine((v) => v === 1 || v === -1, {
    message: "Vote must be +1 or -1",
  }),
});

export type CastVoteState = {
  success: boolean;
  newUpvoteCount?: number;
  error?: string;
};

export async function castVote(
  _prevState: CastVoteState,
  formData: FormData,
): Promise<CastVoteState> {
  const raw = {
    analysisId: formData.get("analysisId") as string,
    voterName: formData.get("voterName") as string,
    value: formData.get("value"),
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.flatten().fieldErrors.voterName?.[0] ?? "Invalid input",
    };
  }

  const { analysisId, voterName, value } = parsed.data;

  await prisma.vote.upsert({
    where: { analysisId_voterName: { analysisId, voterName } },
    create: { analysisId, voterName, value },
    update: { value },
  });

  const upvotes = await prisma.vote.aggregate({
    where: { analysisId },
    _sum: { value: true },
  });

  const newUpvoteCount = upvotes._sum.value ?? 0;

  await prisma.analysis.update({
    where: { id: analysisId },
    data: { upvotes: newUpvoteCount },
  });

  const analysis = await prisma.analysis.findUnique({
    where: { id: analysisId },
    select: { movieId: true },
  });

  if (analysis) {
    revalidatePath(`/movies/${analysis.movieId}`);
  }

  return { success: true, newUpvoteCount };
}
