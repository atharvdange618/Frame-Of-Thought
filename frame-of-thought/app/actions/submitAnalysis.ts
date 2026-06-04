"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  movieId: z.string().min(1, "Movie is required"),
  authorName: z.string().min(1, "Author name is required").max(100),
  title: z.string().min(1, "Title is required").max(200),
  body: z.string().min(50, "Analysis must be at least 50 characters"),
  conceptIds: z.array(z.string()).min(1, "Select at least one concept"),
});

export type SubmitAnalysisState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitAnalysis(
  _prevState: SubmitAnalysisState,
  formData: FormData,
): Promise<SubmitAnalysisState> {
  const raw = {
    movieId: formData.get("movieId") as string,
    authorName: formData.get("authorName") as string,
    title: formData.get("title") as string,
    body: formData.get("body") as string,
    conceptIds: formData.getAll("conceptIds") as string[],
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { movieId, authorName, title, body, conceptIds } = parsed.data;

  const analysis = await prisma.$transaction(async (tx) => {
    const created = await tx.analysis.create({
      data: {
        movieId,
        authorName,
        title,
        body,
        concepts: {
          create: conceptIds.map((conceptId) => ({ conceptId })),
        },
      },
    });
    return created;
  });

  const concepts = await prisma.analysisConcept.findMany({
    where: { analysisId: analysis.id },
    include: { concept: true },
  });

  revalidatePath(`/movies/${movieId}`);
  for (const { concept } of concepts) {
    revalidatePath(`/concepts/${concept.slug}`);
  }

  redirect(`/movies/${movieId}`);
}
