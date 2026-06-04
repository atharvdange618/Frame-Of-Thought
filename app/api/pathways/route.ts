import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const itemSchema = z.object({
  movieId: z.string().min(1),
  sortOrder: z.number().int().min(0),
  note: z.string().max(500).optional(),
});

const createSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  authorName: z.string().min(1).max(100),
  items: z.array(itemSchema).min(1),
});

export async function GET() {
  try {
    const pathways = await prisma.pathway.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { items: true } },
      },
    });

    return apiSuccess(pathways);
  } catch {
    return apiError("Failed to fetch pathways", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid input");
    }

    const { title, description, authorName, items } = parsed.data;

    const pathway = await prisma.$transaction(async (tx) => {
      return tx.pathway.create({
        data: {
          title,
          description,
          authorName,
          items: {
            create: items.map((item) => ({
              movieId: item.movieId,
              sortOrder: item.sortOrder,
              note: item.note ?? null,
            })),
          },
        },
        include: {
          items: {
            include: { movie: true },
            orderBy: { sortOrder: "asc" },
          },
        },
      });
    });

    return apiSuccess(pathway, "Pathway created", 201);
  } catch {
    return apiError("Failed to create pathway", 500);
  }
}
