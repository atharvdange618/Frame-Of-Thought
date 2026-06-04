import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const pathway = await prisma.pathway.findUnique({
      where: { id },
      include: {
        items: {
          include: { movie: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!pathway) return apiError("Pathway not found", 404);

    return apiSuccess(pathway);
  } catch {
    return apiError("Failed to fetch pathway", 500);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) return apiError("Invalid input");

    const existing = await prisma.pathway.findUnique({ where: { id } });
    if (!existing) return apiError("Pathway not found", 404);

    const pathway = await prisma.pathway.update({
      where: { id },
      data: parsed.data,
      include: {
        items: {
          include: { movie: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return apiSuccess(pathway, "Pathway updated");
  } catch {
    return apiError("Failed to update pathway", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = await prisma.pathway.findUnique({ where: { id } });
    if (!existing) return apiError("Pathway not found", 404);

    await prisma.pathway.delete({ where: { id } });

    return apiSuccess({ id }, "Pathway deleted");
  } catch {
    return apiError("Failed to delete pathway", 500);
  }
}
