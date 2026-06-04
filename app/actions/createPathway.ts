"use server";

import { validateSession } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const itemSchema = z.object({
  movieId: z.string().min(1),
  sortOrder: z.number().int().min(0),
  note: z.string().max(500).optional(),
});

const schema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  authorName: z.string().min(1, "Author name is required").max(100),
  items: z.array(itemSchema).min(1, "Add at least one film"),
});

export type CreatePathwayState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createPathway(
  _prevState: CreatePathwayState,
  formData: FormData,
): Promise<CreatePathwayState> {
  try {
    await validateSession();
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Rate limit exceeded. Please try again later.",
    };
  }

  let items: z.infer<typeof itemSchema>[] = [];


  try {
    const rawItems = formData.get("items") as string;
    items = JSON.parse(rawItems);
  } catch {
    return { success: false, error: "Invalid pathway items" };
  }

  const parsed = schema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    authorName: formData.get("authorName"),
    items,
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      error: parsed.error.flatten().fieldErrors.items?.[0],
    };
  }

  const { title, description, authorName, items: pathwayItems } = parsed.data;

  const pathway = await prisma.$transaction(async (tx) => {
    return tx.pathway.create({
      data: {
        title,
        description,
        authorName,
        items: {
          create: pathwayItems.map((item) => ({
            movieId: item.movieId,
            sortOrder: item.sortOrder,
            note: item.note ?? null,
          })),
        },
      },
    });
  });

  revalidatePath("/pathways");
  revalidatePath("/");
  redirect(`/pathways/${pathway.id}`);
}
