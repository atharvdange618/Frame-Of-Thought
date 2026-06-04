import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  year: z.number().int(),
  director: z.string().min(1),
  tmdbId: z.number().int().optional(),
  posterUrl: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();

    const movies = await prisma.movie.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { director: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { title: "asc" },
      include: {
        _count: { select: { analyses: true } },
      },
    });

    return apiSuccess(movies);
  } catch {
    return apiError("Failed to fetch movies", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.flatten().fieldErrors.title?.[0] ?? "Invalid input");
    }

    const movie = await prisma.movie.create({ data: parsed.data });
    return apiSuccess(movie, "Movie created", 201);
  } catch {
    return apiError("Failed to create movie", 500);
  }
}
