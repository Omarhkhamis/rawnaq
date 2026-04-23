import { NextRequest, NextResponse } from "next/server";

import { saveFeaturedProjectSlots } from "@/lib/content/repository";
import { featuredSlotsSchema } from "@/lib/content/validation";

export async function PUT(request: NextRequest) {
  const payload = await request.json();
  const parsed = featuredSlotsSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const projects = await saveFeaturedProjectSlots(parsed.data);
  return NextResponse.json(projects);
}

