import { NextRequest, NextResponse } from "next/server";

import { dashboardSectionSchemas } from "@/lib/content/validation";
import { saveSection } from "@/lib/content/repository";
import type { DashboardSectionKey } from "@/lib/content/types";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;

  if (!(key in dashboardSectionSchemas)) {
    return NextResponse.json({ error: "Unknown section key" }, { status: 404 });
  }

  const payload = await request.json();
  const sectionKey = key as DashboardSectionKey;
  const schema = dashboardSectionSchemas[sectionKey];
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const saved = await saveSection(sectionKey, parsed.data);
  return NextResponse.json(saved);
}

