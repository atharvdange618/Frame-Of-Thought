import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";

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
