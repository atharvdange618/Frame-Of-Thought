import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const createSchema = z.object({
  movieId: z.string().min(1),
  authorName: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  body: z.string().min(50),
  conceptIds: z.array(z.string()).min(1),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("movieId") ?? undefined;
    const conceptId = searchParams.get("conceptId") ?? undefined;
    const sort = searchParams.get("sort") ?? "recent";

    const analyses = await prisma.analysis.findMany({
      where: {
        ...(movieId ? { movieId } : {}),
        ...(conceptId
          ? { concepts: { some: { conceptId } } }
          : {}),
      },
      orderBy:
        sort === "top" ? { upvotes: "desc" } : { createdAt: "desc" },
      include: {
        movie: true,
        concepts: { include: { concept: true } },
      },
    });

    return apiSuccess(analyses);
  } catch {
    return apiError("Failed to fetch analyses", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid input");
    }

    const { movieId, authorName, title, body: analysisBody, conceptIds } =
      parsed.data;

    const analysis = await prisma.analysis.create({
      data: {
        movieId,
        authorName,
        title,
        body: analysisBody,
        concepts: {
          create: conceptIds.map((conceptId) => ({ conceptId })),
        },
      },
      include: {
        concepts: { include: { concept: true } },
      },
    });

    return apiSuccess(analysis, "Analysis created", 201);
  } catch {
    return apiError("Failed to create analysis", 500);
  }
}
