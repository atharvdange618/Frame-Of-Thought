import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  year: z.number().int().optional(),
  director: z.string().min(1).optional(),
  posterUrl: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        analyses: {
          orderBy: { upvotes: "desc" },
          include: {
            concepts: { include: { concept: true } },
          },
        },
      },
    });

    if (!movie) return apiError("Movie not found", 404);

    return apiSuccess(movie);
  } catch {
    return apiError("Failed to fetch movie", 500);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) return apiError("Invalid input");

    const existing = await prisma.movie.findUnique({ where: { id } });
    if (!existing) return apiError("Movie not found", 404);

    const movie = await prisma.movie.update({
      where: { id },
      data: parsed.data,
    });

    return apiSuccess(movie, "Movie updated");
  } catch {
    return apiError("Failed to update movie", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = await prisma.movie.findUnique({ where: { id } });
    if (!existing) return apiError("Movie not found", 404);

    await prisma.movie.delete({ where: { id } });

    return apiSuccess({ id }, "Movie deleted");
  } catch {
    return apiError("Failed to delete movie", 500);
  }
}
