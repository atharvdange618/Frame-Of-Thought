import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";

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
