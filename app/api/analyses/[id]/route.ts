import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  body: z.string().min(50).optional(),
  conceptIds: z.array(z.string()).min(1).optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const analysis = await prisma.analysis.findUnique({
      where: { id },
      include: {
        movie: true,
        concepts: { include: { concept: true } },
      },
    });

    if (!analysis) return apiError("Analysis not found", 404);

    return apiSuccess(analysis);
  } catch {
    return apiError("Failed to fetch analysis", 500);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) return apiError("Invalid input");

    const existing = await prisma.analysis.findUnique({ where: { id } });
    if (!existing) return apiError("Analysis not found", 404);

    const { title, body: analysisBody, conceptIds } = parsed.data;

    const analysis = await prisma.$transaction(async (tx) => {
      if (conceptIds) {
        await tx.analysisConcept.deleteMany({ where: { analysisId: id } });
        await tx.analysisConcept.createMany({
          data: conceptIds.map((conceptId) => ({ analysisId: id, conceptId })),
        });
      }

      return tx.analysis.update({
        where: { id },
        data: {
          ...(title !== undefined ? { title } : {}),
          ...(analysisBody !== undefined ? { body: analysisBody } : {}),
        },
        include: {
          concepts: { include: { concept: true } },
        },
      });
    });

    return apiSuccess(analysis, "Analysis updated");
  } catch {
    return apiError("Failed to update analysis", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = await prisma.analysis.findUnique({ where: { id } });
    if (!existing) return apiError("Analysis not found", 404);

    await prisma.analysis.delete({ where: { id } });

    return apiSuccess({ id }, "Analysis deleted");
  } catch {
    return apiError("Failed to delete analysis", 500);
  }
}
