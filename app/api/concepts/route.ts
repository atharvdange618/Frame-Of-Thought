import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const concepts = await prisma.philosophyConcept.findMany({
      orderBy: { name: "asc" },
    });
    return apiSuccess(concepts);
  } catch {
    return apiError("Failed to fetch concepts", 500);
  }
}
