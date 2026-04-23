import { NextRequest, NextResponse } from "next/server";

import { saveProject } from "@/lib/content/repository";
import { dashboardProjectSchema } from "@/lib/content/validation";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = dashboardProjectSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const project = await saveProject(parsed.data);
  return NextResponse.json(project);
}

